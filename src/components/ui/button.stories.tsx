import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { VariantProps } from "class-variance-authority";
import { ArrowRight, Rocket } from "lucide-react";
import { fn } from "storybook/test";

import { Button, buttonVariants, meta as buttonMeta } from "./button";

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

// Story config is driven by the component's ComponentMeta schema so the
// controls, variant matrix, and docs stay in sync with the source of truth.
const variantOptions = buttonMeta.variants.axes.variant as readonly ButtonVariant[];
const sizeOptions = buttonMeta.variants.axes.size as readonly ButtonSize[];

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
    children: { control: "text", description: "Button label / content." },
    onClick: { table: { disable: true } },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    children: "Book a call",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground — drive every prop from the Controls panel. */
export const Playground: Story = {};

/**
 * The signature Galvanite CTA. On hover (laptop + non-touch only) the label
 * slides left and the yellow arrow scales in via ::before — so no manual icon
 * is needed here. Hover it in the canvas to see it.
 */
export const Brand: Story = {
  args: { variant: "brand", size: "xl" },
};

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

/** Icon + label composition. (Default variant, so it doesn't trigger the brand ::before arrow.) */
export const WithIcon: Story = {
  args: { variant: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <Rocket />
        {args.children}
      </Button>
      <Button {...args}>
        {args.children}
        <ArrowRight />
      </Button>
    </div>
  ),
};

/** Disabled state. */
export const Disabled: Story = {
  args: { disabled: true },
};
