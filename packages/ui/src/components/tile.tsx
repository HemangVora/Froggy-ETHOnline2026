import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const tileVariants = cva(
  "hum-tile focus-visible:ring-ring relative flex min-w-0 overflow-hidden text-left outline-none focus-visible:ring-3",
  {
    defaultVariants: { tone: "pear" },
    variants: {
      tone: {
        cyan: "hum-tile--cyan",
        lavender: "hum-tile--lavender",
        mint: "hum-tile--mint",
        pear: "hum-tile--pear",
      },
    },
  }
);

function Tile({
  className,
  tone = "pear",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof tileVariants>) {
  return (
    <ButtonPrimitive
      className={cn(tileVariants({ tone }), className)}
      data-slot="tile"
      {...props}
    />
  );
}

export { Tile, tileVariants };
