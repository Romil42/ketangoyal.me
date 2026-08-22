const contentTypeLabels = {
  buildLog: "Build Log",
  guide: "Guide",
  essay: "Essay",
  caseStudy: "Case Study",
  note: "Note",
} as const;

export type WritingContentType = keyof typeof contentTypeLabels;

export function formatContentType(value: string | null | undefined): string | null {
  if (!value || !(value in contentTypeLabels)) return null;
  return contentTypeLabels[value as WritingContentType];
}
