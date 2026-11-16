import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DashboardMock, OptionsMock, PipelineDiagram, SpreadsheetMock, WorkflowDiagram } from "@/components/visuals";

const mocks = { DashboardMock, SpreadsheetMock, PipelineDiagram, WorkflowDiagram, OptionsMock };

describe.each(Object.entries(mocks))("%s", (_name, Mock) => {
  const html = renderToStaticMarkup(<Mock />);

  it("is one described image for assistive technology, with internals hidden", () => {
    expect(html).toMatch(/role="img" aria-label="[^"]{40,}"/);
    expect(html).toContain('aria-hidden="true"');
  });

  it("names no real organisation or client", () => {
    expect(html.toLowerCase()).not.toMatch(/datatechhub|client:|our client|ltd|plc/);
  });
});
