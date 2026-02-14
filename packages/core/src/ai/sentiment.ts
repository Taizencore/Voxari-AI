export type Sentiment = 'positive' | 'neutral' | 'negative' | 'frustrated';

export class SentimentAnalyzer {
  private negativeKeywords = ['angry', 'bad', 'terrible', 'horrible', 'hate', 'stupid', 'wrong'];
  private frustratedKeywords = ['wait', 'too long', 'human', 'representative', 'operator'];

  analyze(text: string): Sentiment {
    const lower = text.toLowerCase();
    if (this.frustratedKeywords.some(k => lower.includes(k))) return 'frustrated';
    if (this.negativeKeywords.some(k => lower.includes(k))) return 'negative';
    return 'neutral';
  }
}
