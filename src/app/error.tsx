"use client";

import { Button, ButtonLink, buttonRowClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { leadClass } from "@/components/ui/styles";
import { Accent } from "@/components/ui/Accent";

/** Never renders error.message: internal details must not reach visitors. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="grid min-h-[55vh] content-center py-(--section-space)">
      <div className="max-w-(--reading-max)" role="alert">
        <Eyebrow>Error</Eyebrow>
        <h1>
          Something went wrong <Accent>on our side.</Accent>
        </h1>
        <p className={leadClass}>This page didn’t load. Try again, or return to the homepage.</p>
        <div className={buttonRowClass}>
          <Button onClick={reset}>Try again</Button>
          <ButtonLink variant="secondary" href="/">
            Go to the homepage
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
