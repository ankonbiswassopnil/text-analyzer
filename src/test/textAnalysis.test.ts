import { analyzeText } from '../services/textAnalysisService';

describe('Text Analysis Service', () => {
  const sampleText = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";
  
  test('should count words correctly', () => {
    const result = analyzeText(sampleText);
    expect(result.wordCount).toBe(16);
  });

  test('should count characters correctly (without spaces)', () => {
    const result = analyzeText(sampleText);
    expect(result.charCount).toBe(60);
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

  test('should handle empty string', () => {
    const result = analyzeText('');
    expect(result.wordCount).toBe(0);
    expect(result.charCount).toBe(0);
  });
});