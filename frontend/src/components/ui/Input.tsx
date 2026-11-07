import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && <label className="text-xs uppercase tracking-widest text-parchment/60 font-sans font-medium hover:text-gold transition-colors">{label}</label>}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-sm border border-muted/40 bg-noir/50 px-4 py-2 text-sm text-parchment ring-offset-noir file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gold/30",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
