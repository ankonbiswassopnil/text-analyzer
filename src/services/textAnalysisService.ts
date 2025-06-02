export function analyzeText(content: string) {
  // Return default stats if the content is empty or only whitespace
  if (!content.trim()) {
    return {
      wordCount: 0,
      charCount: 0,
      charCountWithoutSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      longestWords: [],
      avgWordsPerSentence: 0,
      avgCharsPerWord: 0,
      readabilityScore: 0,
      mostCommonWord: ''
    };
  }

  const words = content.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  const charCount = content.length;
  const charCountWithoutSpaces = content.replace(/\s/g, '').length;

  const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
  const paragraphCount = content.split(/\n+/).filter(p => p.trim().length > 0).length || 1;

  const maxLength = Math.max(...words.map(w => w.length));
  const longestWords = [...new Set(
    words.filter(w => w.length === maxLength).map(w => w.toLowerCase())
  )];

  const avgWordsPerSentence = +(wordCount / sentenceCount).toFixed(2);
  const avgCharsPerWord = +(charCountWithoutSpaces / wordCount).toFixed(2);

  const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);
  const readabilityScore = +(206.835 - 1.015 * avgWordsPerSentence - 84.6 * (syllableCount / wordCount)).toFixed(2);

  const wordFrequency: Record<string, number> = {};
  words.forEach(word => {
    const lower = word.toLowerCase();
    wordFrequency[lower] = (wordFrequency[lower] || 0) + 1;
  });
  const mostCommonWord = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  return {
    wordCount,
    charCount,
    charCountWithoutSpaces,
    sentenceCount,
    paragraphCount,
    longestWords,
    avgWordsPerSentence,
    avgCharsPerWord,
    readabilityScore,
    mostCommonWord
  };
}

// Utility function to estimate syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
