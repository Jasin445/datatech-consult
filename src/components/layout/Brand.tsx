import Link from "next/link";

/**
 * TEMPORARY LOGO PLACEHOLDER.
 * The official Datatechhub logo has not been supplied. This is a plain text wordmark,
 * not a logo. Replace with the supplied asset (unchanged) in public/logos/ before launch.
 */
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Datatechhub Consulting home">
      <span className="brand__name">Datatechhub</span>
      <span className="brand__descriptor">Consulting</span>
    </Link>
  );
}
