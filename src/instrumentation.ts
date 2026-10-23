/** Runs once when the server starts. Logs launch warnings so an operator sees missing contact paths. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NODE_ENV !== "production") return;
  const { getConversionPaths } = await import("@/lib/conversion-server");
  const { conversionWarnings } = await import("@/lib/conversion");
  for (const w of conversionWarnings(getConversionPaths())) console.warn(`[launch] ${w}`);
}
