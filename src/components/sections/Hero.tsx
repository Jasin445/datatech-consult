import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Cta = { label: string; href: string };

/** Decorative graphic: scattered points resolving into ordered bars. Contains no real or implied data. */
function HeroGraphic() {
  return (
    <svg className="hero__graphic" viewBox="0 0 480 360" role="presentation" aria-hidden="true" focusable="false">
      <g fill="#15a8ea" opacity="0.55">
        {[
          [30, 60, 5], [70, 130, 4], [45, 200, 6], [95, 260, 4], [20, 310, 5], [110, 90, 3], [120, 190, 5], [75, 330, 3],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g stroke="#15a8ea" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M115 90 C 190 90, 200 180, 255 180" />
        <path d="M125 190 C 190 190, 200 190, 255 190" />
        <path d="M100 260 C 190 260, 200 200, 255 200" />
      </g>
      <rect x="250" y="40" width="210" height="280" rx="10" fill="#f3f7fa" />
      <g fill="#1e64ab">
        <rect x="280" y="240" width="32" height="50" rx="4" />
        <rect x="328" y="200" width="32" height="90" rx="4" />
        <rect x="376" y="150" width="32" height="140" rx="4" />
        <rect x="424" y="100" width="20" height="190" rx="4" opacity="0.35" />
      </g>
      <path d="M270 296 H 450" stroke="#172b3a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Hero({
  headline,
  body,
  primary,
  secondary,
}: {
  headline: string;
  body: string;
  primary: Cta;
  secondary: Cta;
}) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container className="hero__inner">
        <div className="hero__text">
          <h1 id="hero-heading">{headline}</h1>
          <p className="lead">{body}</p>
          <div className="btn-row">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink variant="secondary" href={secondary.href}>
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
        <HeroGraphic />
      </Container>
    </section>
  );
}
