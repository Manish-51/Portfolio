import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-obsidian-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20",
  outline:
    "border border-ivory-100/20 text-ivory-100 hover:border-amber-400 hover:text-amber-400",
  ghost: "text-ivory-100/70 hover:text-amber-400",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
