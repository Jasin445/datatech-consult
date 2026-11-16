import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";

/**
 * Large serif statement on a clean solid ink background. No photograph and no gradient wash:
 * the words carry the band, with only the faint readout-mark watermark behind them.
 */
export function StatementBand({ text, accent }: { text: string; accent: string }) {
  return (
    <section aria-label="Our view" className="relative isolate overflow-hidden bg-ink py-24 lg:min-h-[32rem] lg:py-28">
      <Mark aria-hidden="true" className="absolute -right-6 -bottom-10 -z-10 size-56 text-white/5" />
      <Container>
        <Mark className="mb-8 size-12 text-gold-soft" />
        <p className="mb-0 max-w-[20ch] font-display text-display text-white">
          {text} <em className="text-gold-soft">{accent}</em>
        </p>
      </Container>
    </section>
  );
}
