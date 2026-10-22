import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "on-dark" | "outline-on-dark";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  "on-dark": "btn--on-dark",
  "outline-on-dark": "btn--outline-on-dark",
};

type CommonProps = { variant?: ButtonVariant; className?: string; children: ReactNode };

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Link styled as a button. Internal hrefs use next/link; external hrefs open normally. */
export function ButtonLink({ variant = "primary", className, href, children, ...rest }: ButtonLinkProps) {
  const classes = ["btn", variantClass[variant], className].filter(Boolean).join(" ");
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
  const classes = ["btn", variantClass[variant], className].filter(Boolean).join(" ");
  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}
