# Galvanite — LinkedIn Hook Preview

A Chrome extension that lets you preview how your LinkedIn post's **hook**
(the opening snippet shown in the feed) will look before you publish — cut off
at LinkedIn's "…more" fold, exactly like your audience sees it while scrolling.

## What it does

- Adds a blue **Preview Hook** button to the bottom-left of the LinkedIn post
  composer.
- Clicking it opens a modal that renders your post as a feed card, using the
  **logged-in member's name, tagline and avatar** read from the page.
- The body is truncated at the feed preview limit (~210 characters / 3 lines)
  and shows a **…more** link, so you can see where the fold lands.
- The preview updates live as you keep typing (while the modal is open).

## Install (unpacked)

1. Open `chrome://extensions` in Chrome.
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this `extension/` folder.
4. Go to [linkedin.com](https://www.linkedin.com), open the post composer
   ("Start a post"), and click **Preview Hook**.

## Notes

- No special permissions are requested — the extension only reads the page DOM
  on `linkedin.com`; nothing is sent anywhere.
- LinkedIn's markup changes over time. Member name/avatar are read from several
  fallback locations (top-nav photo, composer header) and the tagline from the
  feed left-rail identity module. If a value can't be found, a sensible
  placeholder is shown so the preview never looks broken.
- The fold threshold is set in `content.js`:
  `PREVIEW_CHAR_LIMIT` (characters) and `PREVIEW_LINE_LIMIT` (lines).

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | MV3 manifest, injects the content script on linkedin.com |
| `content.js` | Injects the button, reads the composer + member info, renders the preview modal |
| `styles.css` | Button + modal + feed-card styling (Galvanite brand) |
| `icons/` | Extension icons |
