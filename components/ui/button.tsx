import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Theme: blue gradient, bold, rounded-xl, shadow, modern focus/hover
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:border-cyan-600 focus-visible:bg-blue-50 focus-visible:text-sky-900 focus-visible:shadow-lg aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-md",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-sky-700 to-cyan-600 text-white hover:from-cyan-600 hover:to-sky-700",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300 dark:focus-visible:ring-red-700 dark:bg-red-700/80",
        outline: "border-2 border-blue-400 bg-white text-sky-900 shadow-md hover:bg-blue-50 hover:border-cyan-600",
        secondary: "bg-cyan-100 text-sky-900 hover:bg-cyan-200",
        ghost: "hover:bg-cyan-100 text-sky-900",
        link: "text-cyan-700 underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
