import type { Preview, Decorator } from "@storybook/nextjs-vite";
import React from "react";

import { fontVariables } from "../src/lib/fonts";
import "../src/app/globals.css";

/** Wrap every story in the Galvanite theme (dark-first) + brand fonts. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";
  return (
    <div
      className={`${theme} ${fontVariables} bg-background text-foreground`}
      style={{ minHeight: "auto", padding: "2rem" }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Galvanite theme (dark = the live site, light = section-white)",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark (site)" },
          { value: "light", title: "Light (section-white)" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
