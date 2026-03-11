import { createClient } from '@deepgram/sdk';
import { TTSAdapter } from './interfaces.js';

export class DeepgramTTSAdapter implements TTSAdapter {
  private client: any;

  constructor(apiKey: string) {
    this.client = createClient(apiKey);
  }

  async synthesize(text: string, options: any = {}): Promise<AsyncIterable<Buffer>> {
    const response = await this.client.speak.request(
      { text },
      {
        model: 'aura-asteria-en',
        encoding: 'linear16',
        container: 'none',
        sample_rate: 8000,
        ...options,
      }
    );

    const stream = await response.getStream();
    if (!stream) {
      throw new Error('Failed to get TTS stream');
    }

    return stream;
  }

  stop(): void {}
}
