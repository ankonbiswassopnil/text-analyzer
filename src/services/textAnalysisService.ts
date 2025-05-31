// src/services/textAnalysisService.ts
export function analyzeText(content: string) {
  return {
    wordCount: 0,
    charCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    longestWords: []
  };
}