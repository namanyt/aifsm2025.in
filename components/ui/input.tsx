import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Theme: blue border, blue focus, white bg, bold font, rounded, shadow
        "h-10 w-full min-w-0 rounded-xl border-2 border-blue-400 bg-white px-4 py-2 text-base font-semibold text-sky-900 shadow-md transition-all outline-none placeholder:text-sky-400 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:border-cyan-600 focus-visible:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
