// test/textAnalysis.test.ts
import { analyzeText } from '../services/textAnalysisService';

describe('Text Analysis Service', () => {
  test('should count words', () => {
    const result = analyzeText("hello world");
    expect(result.wordCount).toBe(2);
  });
});
