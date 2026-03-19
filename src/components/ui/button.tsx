import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap !rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-red-300/70 dark:focus-visible:ring-red-500/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "!border !border-red-700 !bg-gradient-to-b !from-red-500 !to-red-700 !text-white hover:!from-red-600 hover:!to-red-800",
        destructive:
          "!border !border-red-800 !bg-gradient-to-b !from-red-600 !to-red-800 !text-white hover:!from-red-700 hover:!to-red-900",
        outline:
          "!border !border-red-700 !bg-gradient-to-b !from-red-500 !to-red-700 !text-white hover:!from-red-600 hover:!to-red-800",
        secondary:
          "!border !border-red-700 !bg-gradient-to-b !from-red-500 !to-red-700 !text-white hover:!from-red-600 hover:!to-red-800",
        ghost:
          "!border !border-red-700 !bg-gradient-to-b !from-red-500 !to-red-700 !text-white hover:!from-red-600 hover:!to-red-800",
        link: "!border !border-red-700 !bg-gradient-to-b !from-red-500 !to-red-700 !text-white no-underline hover:!from-red-600 hover:!to-red-800",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-11 px-7 has-[>svg]:px-5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
