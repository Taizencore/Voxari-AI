import WebSocket from 'ws';

export class OpenAIRealtimeAdapter {
  private ws: WebSocket | null = null;
  constructor(private apiKey: string) {}

  async connect() {
    this.ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview', {
      headers: { Authorization: `Bearer ${this.apiKey}`, 'OpenAI-Beta': 'realtime=v1' }
    });
    return new Promise((resolve) => this.ws?.on('open', resolve));
  }
}
