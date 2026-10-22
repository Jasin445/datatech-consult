import Image from "next/image";
import Link from "next/link";

/** Official Datatechhub logo (supplied, unchanged) with the "Consulting" descriptor beside it. */
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Datatechhub Consulting home">
      <Image
        src="/logos/datatechhub-logo.png"
        alt=""
        width={849}
        height={294}
        priority
        className="brand__logo"
      />
      <span className="brand__descriptor">Consulting</span>
    </Link>
  );
}
