/**
 * Strips the model-number prefix from a product name.
 * e.g. "AGR-10B — 60\" Gas Range with Ten Open Burners" → "60\" Gas Range with Ten Open Burners"
 */
export function displayName(name: string): string {
  const sep = name.indexOf(" — "); // em-dash with spaces
  return sep !== -1 ? name.slice(sep + 3) : name;
}
