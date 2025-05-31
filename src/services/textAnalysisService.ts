export function analyzeText(content: string) {
  // Return default stats if the content is empty or only whitespace
  if (!content.trim()) {
    return {
      wordCount: 0,
      charCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      longestWords: []
    };
  }

  // Split content into words using whitespace, filter out empty strings
  const words = content.split(/\s+/).filter(w => w.length > 0);

  // Count characters by joining all words (ignoring spaces)
  const charCount = words.join('').length;

  // Count sentences by splitting on punctuation marks (., !, ?) and filtering out empty results
  const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  // Split content into paragraphs (separated by blank lines)
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  // Find the maximum word length
  const maxLength = Math.max(...words.map(w => w.length));

  // Collect all unique words (case-insensitive) with the maximum length
  const longestWords = [...new Set(
    words
      .filter(w => w.length === maxLength)
      .map(w => w.toLowerCase())
  )];

  // Return the analysis result
  return {
    wordCount: words.length,
    charCount,
    sentenceCount,
    paragraphCount: paragraphs.length,
    longestWords
  };
}