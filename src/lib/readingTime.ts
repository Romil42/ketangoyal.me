export type ReadingTime = {
  minutes: number;
  words: number;
  label: string;
};

type ReadingSpan = {text?: string | null};

export type ReadingBlock = {
  _type: string;
  children?: Array<ReadingSpan> | null;
  title?: string | null;
  caption?: string | null;
  code?: string | null;
  supportingText?: string | null;
  description?: string | null;
  body?: Array<{children?: Array<ReadingSpan> | null}> | null;
  steps?: Array<{title?: string | null; body?: string | null}> | null;
  columnHeaders?: Array<string> | null;
  rows?: Array<{cells?: Array<string> | null}> | null;
};

const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu;

function countWords(value: string | null | undefined): number {
  return value?.match(WORD_PATTERN)?.length ?? 0;
}

function countSpanWords(
  children: Array<{text?: string | null}> | null | undefined,
): number {
  return children?.reduce((total, child) => total + countWords(child.text), 0) ?? 0;
}

export function calculateReadingTime(body: ReadonlyArray<ReadingBlock>): ReadingTime {
  let proseWords = 0;
  let codeWords = 0;

  for (const block of body) {
    switch (block._type) {
      case "block":
        proseWords += countSpanWords(block.children);
        break;
      case "callout":
        proseWords += countWords(block.title);
        proseWords += (block.body ?? []).reduce(
          (total, paragraph) => total + countSpanWords(paragraph.children),
          0,
        );
        break;
      case "codeBlock":
        codeWords += countWords(block.code);
        proseWords += countWords(block.caption);
        break;
      case "numberedProcess":
        proseWords += countWords(block.title);
        proseWords += (block.steps ?? []).reduce(
          (total, step) => total + countWords(step.title) + countWords(step.body),
          0,
        );
        break;
      case "comparisonTable":
        proseWords += countWords(block.title);
        proseWords += (block.columnHeaders ?? []).reduce(
          (total, cell) => total + countWords(cell),
          0,
        );
        proseWords += (block.rows ?? []).reduce(
          (total, row) =>
            total +
            (row.cells ?? []).reduce((rowTotal, cell) => rowTotal + countWords(cell), 0),
          0,
        );
        break;
      case "krafttCta":
        proseWords += countWords(block.title) + countWords(block.supportingText);
        break;
      case "relatedResource":
        proseWords += countWords(block.title) + countWords(block.description);
        break;
      case "inlineImage":
        break;
    }
  }

  const words = proseWords + codeWords;
  const minutes = Math.max(1, Math.ceil(proseWords / 220 + codeWords / 100));

  return {minutes, words, label: `${minutes} min read`};
}
