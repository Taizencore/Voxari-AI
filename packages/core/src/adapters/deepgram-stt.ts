import { createClient, LiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { STTAdapter } from './interfaces.js';

export class DeepgramSTTAdapter implements STTAdapter {
  private client: any;
  private connection: LiveClient | null = null;
  private transcriptCallback: ((t: any) => void) | null = null;

  constructor(apiKey: string) {
    this.client = createClient(apiKey);
  }

  async start(options: any = {}): Promise<void> {
    this.connection = this.client.listen.live({
      model: 'nova-2',
      language: 'en-US',
      smart_format: true,
      interim_results: true,
      encoding: 'linear16',
      sample_rate: 8000,
      ...options,
    });

    this.connection?.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      const result = data.channel.alternatives[0];
      if (result && result.transcript && this.transcriptCallback) {
        this.transcriptCallback({
          text: result.transcript,
          isFinal: data.is_final,
          confidence: result.confidence,
        });
      }
    });
  }

  async stop(): Promise<void> {
    if (this.connection) {
      this.connection.finish();
      this.connection = null;
    }
  }

  onTranscript(callback: (transcript: any) => void): void {
    this.transcriptCallback = callback;
  }

  sendAudio(chunk: Buffer): void {
    if (this.connection && this.connection.getReadyState() === 1) {
      this.connection.send(chunk as any);
    }
  }
}
