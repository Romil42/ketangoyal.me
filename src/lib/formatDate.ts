const articleDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatArticleDate(value: string): string {
  return articleDateFormatter.format(new Date(value));
}

export function isMeaningfullyUpdated(publishedAt: string, updatedAt: string): boolean {
  const difference = new Date(updatedAt).getTime() - new Date(publishedAt).getTime();
  return difference > 24 * 60 * 60 * 1000;
}
