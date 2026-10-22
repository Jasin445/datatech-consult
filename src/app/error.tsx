"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Never renders error.message: internal details must not reach visitors. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="state-page section">
      <div className="reading" role="alert">
        <h1>Something went wrong</h1>
        <p className="lead">This page didn’t load. Try again, or return to the homepage.</p>
        <div className="btn-row">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink variant="secondary" href="/">
            Go to the homepage
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
