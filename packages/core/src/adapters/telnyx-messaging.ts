import telnyx from 'telnyx';
import { MessagingAdapter } from './interfaces.js';

export class TelnyxMessagingAdapter implements MessagingAdapter {
  private client: any;

  constructor(apiKey: string) {
    this.client = new (telnyx as any)(apiKey);
  }

  async sendMessage(to: string, from: string, text: string): Promise<void> {
    await this.client.messages.create({ to, from, text });
  }
}
