import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-sans transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gold text-noir hover:bg-[#B38F2D]",
    secondary: "bg-muted text-parchment hover:bg-[#3A3A3A]",
    outline: "border border-gold text-gold hover:bg-gold/10",
    ghost: "text-parchment hover:bg-muted/50",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
