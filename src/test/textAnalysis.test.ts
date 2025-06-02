import { analyzeText } from '../services/textAnalysisService';

describe('Text Analysis Service', () => {
  const sampleText = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

  test('should count words correctly', () => {
    const result = analyzeText(sampleText);
    expect(result.wordCount).toBe(16);
  });

  test('should count characters correctly (with and without spaces)', () => {
    const result = analyzeText(sampleText);
    expect(result.charCount).toBe(sampleText.length); // Total characters
    expect(result.charCountWithoutSpaces).toBe(sampleText.replace(/\s/g, '').length); // Without spaces
  });

  test('should count sentences correctly', () => {
    const result = analyzeText(sampleText);
    expect(result.sentenceCount).toBe(2);
  });

  test('should count paragraphs correctly', () => {
    const multiParaText = "First paragraph.\n\nSecond paragraph.";
    const result = analyzeText(multiParaText);
    expect(result.paragraphCount).toBe(2);
  });

  test('should identify longest words', () => {
    const result = analyzeText(sampleText);
    expect(result.longestWords).toEqual(expect.arrayContaining(['quick', 'brown', 'jumps', 'slept']));
  });

  test('should calculate average words per sentence', () => {
    const result = analyzeText(sampleText);
    expect(result.avgWordsPerSentence).toBeCloseTo(8.0, 1); // 16 / 2 = 8
  });

  test('should calculate average characters per word', () => {
    const result = analyzeText(sampleText);
    const expected = +(result.charCountWithoutSpaces / result.wordCount).toFixed(2);
    expect(result.avgCharsPerWord).toBeCloseTo(expected, 2);
  });

  test('should calculate readability score', () => {
    const result = analyzeText(sampleText);
    expect(typeof result.readabilityScore).toBe('number');
    expect(result.readabilityScore).toBeGreaterThan(0);
    expect(result.readabilityScore).toBeLessThanOrEqual(206.835); // Max possible score
  });

  test('should detect most common word', () => {
    const result = analyzeText(sampleText);
    expect(result.mostCommonWord).toBe('the');
  });

  test('should handle empty string', () => {
    const result = analyzeText('');
    expect(result.wordCount).toBe(0);
    expect(result.charCount).toBe(0);
    expect(result.charCountWithoutSpaces).toBe(0);
    expect(result.sentenceCount).toBe(0);
    expect(result.paragraphCount).toBe(0);
    expect(result.longestWords).toEqual([]);
    expect(result.avgWordsPerSentence).toBe(0);
    expect(result.avgCharsPerWord).toBe(0);
    expect(result.readabilityScore).toBe(0);
    expect(result.mostCommonWord).toBe('');
  });
});
