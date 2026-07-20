import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";

import { Button, buttonVariants, meta as buttonMeta } from "./button";

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

// Custom story args = the real Button props plus an `error` toggle (mapped to
// aria-invalid by the shared render below).
type ButtonStoryArgs = ComponentProps<typeof Button> & { error?: boolean };

// Options come from the component's ComponentMeta so controls stay in sync.
const variantOptions = buttonMeta.variants.axes.variant as readonly ButtonVariant[];
const sizeOptions = buttonMeta.variants.axes.size as readonly ButtonSize[];

/*
 * The default export is the single source of default config. Every variant
 * story below inherits these argTypes, args, and the shared render — each one
 * only overrides `variant`, so they all behave like the default variation with
 * a different look.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `**${buttonMeta.component.name}** — ${buttonMeta.component.description}\n\n\`${buttonMeta.component.path}\` · category: \`${buttonMeta.component.category}\` · type: \`${buttonMeta.component.type}\``,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: buttonMeta.props.variant.description,
      table: { defaultValue: { summary: String(buttonMeta.props.variant.default) } },
    },
    size: {
      control: "select",
      options: sizeOptions,
      description: buttonMeta.props.size.description,
      table: { defaultValue: { summary: String(buttonMeta.props.size.default) } },
    },
    disabled: {
      control: "boolean",
      description: buttonMeta.props.disabled.description,
    },
    error: {
      control: "boolean",
      description: "Error state — sets aria-invalid (destructive border + ring).",
      table: { defaultValue: { summary: "false" } },
    },
    children: { control: "text", description: "Button label / content." },
    // Fires into the Actions panel on click (a function, not a controls field).
    onClick: { action: "click", table: { disable: true } },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    error: false,
    children: "Button",
    onClick: fn(),
  },
  // Shared render for all inheriting stories: pulls `error` out of args and
  // applies it as aria-invalid, spreading the remaining real props onto Button.
  render: ({ error, ...args }: ButtonStoryArgs) => (
    <Button aria-invalid={error || undefined} {...args} />
  ),
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

/* ---- One configurable story per variant (all inherit the defaults above) ---- */

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Link: Story = { args: { variant: "link" } };

/**
 * The signature Galvanite CTA. On hover (laptop + non-touch only) the label
 * slides left and the yellow arrow scales in via ::before. Try the Controls
 * and hover it in the canvas.
 */
export const Brand: Story = { args: { variant: "brand", children: "Book a call" } };

/* ---- Reference overviews (not individually configurable) ---- */

/** Every `variant` axis value from the schema, with its documented purpose. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          title={buttonMeta.variants.purpose[`variant.${variant}`]}
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/** Every non-icon `size` axis value from the schema. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "default", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};
