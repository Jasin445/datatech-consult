import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DashboardMock, ILLUSTRATIVE_CAPTION, OptionsMock, PipelineDiagram, SpreadsheetMock, WorkflowDiagram } from "@/components/visuals";

const mocks = { DashboardMock, SpreadsheetMock, PipelineDiagram, WorkflowDiagram, OptionsMock };

describe.each(Object.entries(mocks))("%s", (_name, Mock) => {
  const html = renderToStaticMarkup(<Mock />);

  it("shows the illustrative caption", () => {
    expect(html).toContain(ILLUSTRATIVE_CAPTION);
  });

  it("is one described image for assistive technology, with internals hidden", () => {
    expect(html).toMatch(/role="img" aria-label="Illustrative [^"]{40,}"/);
    expect(html).toContain('aria-hidden="true"');
  });

  it("names no real organisation or client", () => {
    expect(html.toLowerCase()).not.toMatch(/datatechhub|client:|our client|ltd|plc/);
  });
});
