import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="grid min-h-[55vh] content-center py-(--section-space)">
      <p role="status">Loading…</p>
    </Container>
  );
}
