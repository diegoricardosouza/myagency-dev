import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, readOnly, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            readOnly && "bg-gray-200 cursor-not-allowed text-gray-500 focus-visible:outline-none",
            error && 'border-red-600',
            className
          )}
          ref={ref}
          readOnly={readOnly}
          {...props}
        />

        {error && (
          <div className="flex gap-2 items-center text-red-700">
            <span className="text-xs">{error}</span>
          </div>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input };

