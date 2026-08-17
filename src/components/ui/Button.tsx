import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-amber-500 to-amber-400 text-obsidian-950 font-semibold hover:brightness-110 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-amber-400/40 bg-amber-400/5 text-ivory-100 hover:border-amber-400 hover:text-amber-400 hover:bg-amber-400/10 hover:shadow-[0_0_20px_rgba(232,184,114,0.2)] hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-ivory-100/70 hover:text-amber-400 hover:bg-white/5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        data-cursor="CLICK"
        className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 transform-gpu ${variantClasses[variant]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
