import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "on-dark" | "outline-on-dark" | "gold" | "gold-outline";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 px-6 font-semibold leading-tight no-underline transition-colors duration-150 aria-disabled:cursor-not-allowed aria-disabled:opacity-55 disabled:cursor-not-allowed disabled:opacity-55";

const variantClass: Record<ButtonVariant, string> = {
  primary: "rounded-sm border-2 border-transparent bg-primary text-white hover:bg-primary-hover hover:text-white",
  secondary: "rounded-sm border-2 border-primary bg-transparent text-primary hover:bg-surface hover:text-primary-hover",
  "on-dark": "rounded-sm border-2 border-transparent bg-white text-charcoal hover:bg-surface hover:text-charcoal",
  "outline-on-dark": "rounded-sm border-2 border-white bg-transparent text-white hover:bg-white/12 hover:text-white",
  // Editorial card buttons (V2). White on gold is 5.0:1.
  gold: "border border-gold bg-gold text-white tracking-[0.14em] uppercase text-sm hover:bg-charcoal hover:border-charcoal hover:text-white",
  "gold-outline": "border border-gold bg-transparent text-gold tracking-[0.14em] uppercase text-sm hover:bg-gold hover:text-white",
};

type CommonProps = { variant?: ButtonVariant; className?: string; children: ReactNode };

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

function buttonClasses(variant: ButtonVariant, className?: string) {
  return [base, variantClass[variant], className].filter(Boolean).join(" ");
}

/** Link styled as a button. Internal hrefs use next/link; external hrefs open normally. */
export function ButtonLink({ variant = "primary", className, href, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  if (/^https?:\/\//.test(href)) {
    return (
      <a className={classes} href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} type={type} {...rest}>
      {children}
    </button>
  );
}

/** Layout helper for groups of buttons. */
export const buttonRowClass = "flex flex-wrap gap-3";
