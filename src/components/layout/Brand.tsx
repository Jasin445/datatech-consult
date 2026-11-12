import Image from "next/image";
import Link from "next/link";

/** Official Datatechhub logo (supplied, unchanged) with the "Consulting" descriptor beside it. */
export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-2 no-underline min-[480px]:gap-3"
      aria-label="Datatechhub Consulting home"
    >
      <Image
        src="/logos/datatechhub-logo.png"
        alt=""
        width={849}
        height={294}
        preload
        sizes="(min-width: 768px) 162px, 128px"
        className="h-9 w-auto min-[480px]:h-11 md:h-14"
      />
      <span className="border-l-2 border-secondary pl-2 text-sm leading-[1.1] font-semibold text-charcoal min-[480px]:pl-3 min-[480px]:text-base">
        Consulting
      </span>
    </Link>
  );
}
