import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",

        // Variants
        {
          "bg-brand-orange/90 text-white hover:bg-brand-orange":
            variant === "primary",

          "bg-brand-night/90 text-brand-sand hover:bg-brand-night":
            variant === "secondary",

          "border border-brand-night/15 bg-transparent text-brand-night hover:bg-brand-night hover:text-brand-sand":
            variant === "ghost",
        },

        // Sizes
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-2 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
