import { cn } from "cn";
import type { ComponentProps } from "react";

function StarBurst({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("star-burst", className)}
      data-slot="star-burst"
      {...props}
    />
  );
}

export { StarBurst };
