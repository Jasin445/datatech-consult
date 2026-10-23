import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "primary-pill" | "secondary" | "on-dark" | "outline-on-dark" | "gold" | "gold-outline";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-3 font-semibold leading-tight no-underline transition-[color,background-color,border-color,background-position,box-shadow] duration-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-55 disabled:cursor-not-allowed disabled:opacity-55";

const variantClass: Record<ButtonVariant, string> = {
  primary: "rounded-sm border-2 border-transparent bg-primary bg-(image:--btn-trace) bg-size-[auto_60%,auto_60%,100%_100%] bg-[position:left_0.55rem_bottom,right_0.55rem_bottom,center] bg-no-repeat text-white hover:bg-[position:left_0.85rem_bottom,right_0.85rem_bottom,center] hover:bg-primary-hover hover:text-white",
  "primary-pill": "rounded-full border-2 border-transparent bg-primary bg-(image:--btn-trace) bg-size-[auto_60%,auto_60%,100%_100%] bg-[position:left_0.55rem_bottom,right_0.55rem_bottom,center] bg-no-repeat text-white hover:bg-[position:left_0.85rem_bottom,right_0.85rem_bottom,center] hover:bg-primary-hover hover:text-white",
  secondary: "rounded-sm border-2 border-primary bg-transparent text-primary hover:bg-surface hover:text-primary-hover",
  "on-dark": "rounded-sm border-2 border-transparent bg-white text-charcoal hover:bg-surface hover:text-charcoal",
  "outline-on-dark": "rounded-sm border-2 border-white bg-transparent text-white hover:bg-white/12 hover:text-white",
  // Editorial card buttons (V2). White on gold is 5.0:1.
  gold: "border border-gold bg-gold text-white tracking-[0.14em] uppercase text-sm hover:bg-charcoal hover:border-charcoal hover:text-white",
  "gold-outline": "border border-gold bg-transparent text-gold tracking-[0.14em] uppercase text-sm hover:bg-gold hover:text-white",
};

type ButtonSize = "md" | "nav" | "lg";
const sizeClass: Record<ButtonSize, string> = { md: "min-h-11 px-6", nav: "min-h-12 px-7", lg: "min-h-14 px-8 text-[1.05rem]" };

type CommonProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [base, sizeClass[size], variantClass[variant], className].filter(Boolean).join(" ");
}

/** Link styled as a button. Internal hrefs use next/link; external hrefs open normally. */
export function ButtonLink({ variant = "primary", size = "md", className, href, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
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

export function Button({ variant = "primary", size = "md", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} type={type} {...rest}>
      {children}
    </button>
  );
}

/** Layout helper for groups of buttons. */
export const buttonRowClass = "flex flex-wrap gap-3";
