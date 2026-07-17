/*
 * Galvanite — LinkedIn Hook Preview
 * -----------------------------------
 * Injects a "Preview Hook" button into the LinkedIn post composer.
 * Clicking it opens a modal that renders the post the way it appears in the
 * feed — using the logged-in member's name, tagline and avatar — with the
 * body truncated at LinkedIn's feed "…more" cut-off point.
 */
(function () {
  "use strict";

  // LinkedIn's desktop feed shows roughly this many characters before the
  // "…more" fold appears. Tuned to match the visible truncation point.
  const PREVIEW_CHAR_LIMIT = 210;
  // ...and it also collapses after a handful of lines. Whichever comes first.
  const PREVIEW_LINE_LIMIT = 3;

  const BTN_ID = "galvanite-preview-btn";
  const MODAL_ID = "galvanite-preview-modal";

  /* ---------------------------------------------------------------------- */
  /* Composer discovery                                                     */
  /* ---------------------------------------------------------------------- */

  function findEditor() {
    // The Quill editor LinkedIn uses for the share box.
    const candidates = document.querySelectorAll(
      'div.ql-editor[contenteditable="true"], ' +
        'div[role="textbox"][contenteditable="true"], ' +
        '[aria-label*="Text editor"][contenteditable="true"], ' +
        '[data-placeholder][contenteditable="true"]'
    );
    for (const el of candidates) {
      if (el.offsetParent !== null) return el; // visible one wins
    }
    return null;
  }

  function findComposer(editor) {
    return (
      editor.closest('[role="dialog"]') ||
      editor.closest(".share-box") ||
      editor.closest(".share-creation-state") ||
      editor.parentElement
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Reading the post text (emoji-aware)                                    */
  /* ---------------------------------------------------------------------- */

  function extractText(editor) {
    // Walk the editor so we preserve line breaks and turn emoji <img> back
    // into their unicode characters (LinkedIn swaps typed emoji for images).
    const lines = [];

    function walkBlock(block) {
      let out = "";
      block.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          out += node.textContent;
        } else if (node.nodeName === "IMG") {
          out += node.getAttribute("alt") || "";
        } else if (node.nodeName === "BR") {
          out += "\n";
        } else {
          out += node.textContent;
        }
      });
      return out;
    }

    const blocks = editor.querySelectorAll(":scope > p, :scope > div");
    if (blocks.length) {
      blocks.forEach((b) => lines.push(walkBlock(b)));
    } else {
      lines.push(walkBlock(editor));
    }

    return lines.join("\n").replace(/ /g, " ").replace(/\n{3,}/g, "\n\n").trim();
  }

  /* ---------------------------------------------------------------------- */
  /* Logged-in member info (name, tagline, avatar)                          */
  /* ---------------------------------------------------------------------- */

  function firstText(selectors, root) {
    const scope = root || document;
    for (const sel of selectors) {
      const el = scope.querySelector(sel);
      if (el && el.textContent.trim()) return el.textContent.trim();
    }
    return "";
  }

  function getMemberInfo(composer) {
    const info = { name: "", tagline: "", avatar: "" };

    // --- Avatar + name from the top-nav "Me" photo (present whenever logged in)
    const mePhoto = document.querySelector("img.global-nav__me-photo");
    if (mePhoto) {
      if (mePhoto.src) info.avatar = mePhoto.src;
      const alt = (mePhoto.getAttribute("alt") || "").trim();
      if (alt && !/^photo of/i.test(alt)) info.name = alt;
    }

    // --- Name / avatar from the composer header itself (most accurate).
    // Covers the redesigned share box (share-box-v2 / phoenix), whose header
    // is an artdeco entity lockup inside the settings-entry button.
    if (composer) {
      const composerName = firstText(
        [
          ".share-unified-settings-entry-button .artdeco-entity-lockup__title .truncate",
          ".share-unified-settings-entry-button .artdeco-entity-lockup__title .text-body-large-bold",
          ".share-unified-settings-entry-button .artdeco-entity-lockup__title",
          ".share-box-feed-entry__name",
          ".share-box-feed-entry__actor-name",
          "[data-testid='share-box-actor-name']",
        ],
        composer
      );
      if (composerName) info.name = composerName;

      const composerAvatar = composer.querySelector(
        ".share-unified-settings-entry-button .artdeco-entity-lockup__image img, " +
          ".share-box-feed-entry__avatar img, " +
          "img.share-box-feed-entry__avatar-image, " +
          ".presence-entity__image"
      );
      if (composerAvatar && composerAvatar.src) info.avatar = composerAvatar.src;

      // The header avatar's alt is the member's name — a reliable name source.
      if (!info.name && composerAvatar && composerAvatar.alt) {
        const alt = composerAvatar.alt.trim();
        if (alt && !/^photo of/i.test(alt)) info.name = alt;
      }
    }

    // --- Tagline / headline from the feed left-rail identity module.
    // Scoped so we never pick up the composer's "Post to Anyone" subtitle.
    const tagline = firstText([
      ".feed-identity-module__headline",
      ".feed-identity-module .feed-identity-module__headline",
      ".feed-identity-module .artdeco-entity-lockup__subtitle",
      ".feed-identity-module .t-12.t-black--light",
      ".profile-card-member-details p",
      ".pv-text-details__left-panel .text-body-medium",
    ]);
    if (tagline) info.tagline = tagline;

    // Sensible fallbacks so the preview never looks broken.
    if (!info.name) info.name = "Your Name";
    if (!info.tagline) info.tagline = "Your headline / tagline";
    if (!info.avatar) {
      info.avatar =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='48' height='48' rx='24' fill='%232E5073'/><circle cx='24' cy='19' r='8' fill='%23fff'/><path d='M8 44c0-9 8-14 16-14s16 5 16 14z' fill='%23fff'/></svg>"
        );
    }

    return info;
  }

  /* ---------------------------------------------------------------------- */
  /* Truncation at the feed fold                                            */
  /* ---------------------------------------------------------------------- */

  function truncateForPreview(text) {
    let truncated = false;
    let result = text;

    // Line-based fold.
    const byLine = text.split("\n");
    if (byLine.length > PREVIEW_LINE_LIMIT) {
      result = byLine.slice(0, PREVIEW_LINE_LIMIT).join("\n");
      truncated = true;
    }

    // Character-based fold (cut on a word boundary when possible).
    if (result.length > PREVIEW_CHAR_LIMIT) {
      let cut = result.slice(0, PREVIEW_CHAR_LIMIT);
      const lastSpace = cut.lastIndexOf(" ");
      if (lastSpace > PREVIEW_CHAR_LIMIT * 0.6) cut = cut.slice(0, lastSpace);
      result = cut.replace(/\s+$/, "");
      truncated = true;
    }

    return { text: result, truncated };
  }

  /* ---------------------------------------------------------------------- */
  /* HTML rendering (with escaping + hashtag / mention highlighting)         */
  /* ---------------------------------------------------------------------- */

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderBody(text) {
    let html = escapeHtml(text);
    // Highlight #hashtags and @mentions like LinkedIn does.
    html = html.replace(
      /(^|\s)([#@][\p{L}0-9_]+)/gu,
      '$1<span class="galvanite-mention">$2</span>'
    );
    html = html.replace(/\n/g, "<br>");
    return html;
  }

  /* ---------------------------------------------------------------------- */
  /* Modal                                                                  */
  /* ---------------------------------------------------------------------- */

  let currentEditor = null;

  function buildPreviewCardHtml(info, bodyText) {
    const { text, truncated } = truncateForPreview(bodyText);
    const empty = !bodyText.trim();
    const bodyHtml = empty
      ? '<span class="galvanite-placeholder">Start writing and your post will appear here…</span>'
      : renderBody(text);

    const moreLink = truncated
      ? '<div class="galvanite-more-row"><span class="galvanite-more">…more</span></div>'
      : "";

    const globe =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#666" stroke-width="1.6"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="#666" stroke-width="1.4"/></svg>';

    return `
      <div class="galvanite-post-card">
        <div class="galvanite-post-header">
          <img class="galvanite-avatar" src="${escapeHtml(info.avatar)}" alt="" />
          <div class="galvanite-meta">
            <div class="galvanite-name">${escapeHtml(info.name)}</div>
            <div class="galvanite-tagline">${escapeHtml(info.tagline)}</div>
            <div class="galvanite-sub">now · Edited <span class="galvanite-dot">·</span> ${globe}</div>
          </div>
        </div>
        <div class="galvanite-body ${empty ? "is-empty" : ""}">${bodyHtml}</div>
        ${moreLink}
        <div class="galvanite-divider"></div>
        <div class="galvanite-social">
          <span class="galvanite-reactions">👍 ❤️ <span class="galvanite-count">57</span></span>
          <span class="galvanite-stats">24 comments · 6 reposts</span>
        </div>
        <div class="galvanite-actions-bar">
          <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>➤ Send</span>
        </div>
      </div>`;
  }

  function updateModalContent() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal || !currentEditor) return;
    const composer = findComposer(currentEditor);
    const info = getMemberInfo(composer);
    const bodyText = extractText(currentEditor);
    modal.querySelector(".galvanite-modal-body").innerHTML = buildPreviewCardHtml(
      info,
      bodyText
    );

    const usedLen = truncateForPreview(bodyText).text.length;
    const counter = modal.querySelector(".galvanite-counter");
    if (counter) {
      const total = bodyText.length;
      counter.textContent = truncateForPreview(bodyText).truncated
        ? `Hook shows ${usedLen} of ${total} characters — the rest is hidden behind “…more”.`
        : `${total} characters — your whole post fits above the fold. 🎉`;
    }
  }

  function openModal() {
    closeModal();
    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.className = "galvanite-overlay";
    modal.innerHTML = `
      <div class="galvanite-modal" role="dialog" aria-label="Hook preview">
        <div class="galvanite-modal-head">
          <div class="galvanite-modal-title">
            <span class="galvanite-badge"></span>
            Hook preview
          </div>
          <button class="galvanite-close" aria-label="Close preview">×</button>
        </div>
        <div class="galvanite-modal-body"></div>
        <div class="galvanite-counter"></div>
      </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    modal.querySelector(".galvanite-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", onEsc);

    updateModalContent();
  }

  function onEsc(e) {
    if (e.key === "Escape") closeModal();
  }

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (modal) modal.remove();
    document.removeEventListener("keydown", onEsc);
  }

  /* ---------------------------------------------------------------------- */
  /* Button injection                                                       */
  /* ---------------------------------------------------------------------- */

  function buildButton(editor) {
    const btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.type = "button";
    btn.className = "galvanite-preview-btn galvanite-anchored";
    btn.textContent = "Preview Hook";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentEditor = findEditor() || editor;
      openModal();
    });
    return btn;
  }

  // Prefer the named footer bar (holds the Post button); the left side of it
  // is empty, which is exactly where the mockup puts our button.
  function findAnchor(composer) {
    return (
      composer.querySelector(".share-creation-state__footer") ||
      composer.querySelector(".share-creation-state__bottom") ||
      composer.querySelector(".share-creation-state") ||
      composer
    );
  }

  function injectButton() {
    const editor = findEditor();
    if (!editor) return;
    const composer = findComposer(editor);
    if (!composer) return;

    currentEditor = editor;

    // Already injected for this composer?
    if (composer.querySelector("#" + BTN_ID)) return;

    const btn = buildButton(editor);
    const anchor = findAnchor(composer);
    if (getComputedStyle(anchor).position === "static") {
      anchor.style.position = "relative";
    }
    anchor.appendChild(btn);

    // Keep an open preview in sync as the user types.
    editor.addEventListener("input", () => {
      if (document.getElementById(MODAL_ID)) updateModalContent();
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Observe the page for composer open/close                               */
  /* ---------------------------------------------------------------------- */

  const observer = new MutationObserver(() => {
    if (findEditor()) injectButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial attempt in case the composer is already open.
  injectButton();
})();
