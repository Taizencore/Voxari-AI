import { GrowthEngine } from './growth-engine.js';
import { TelnyxMessagingAdapter } from '../adapters/telnyx-messaging.js';

export class GrowthOrchestrator {
  constructor(private growth: GrowthEngine, private messaging: TelnyxMessagingAdapter) {}
  async runCycle(query: string) {
    const leads = await this.growth.searchLeads(query);
    for (const lead of leads) {
      if (lead.phone) await this.messaging.sendMessage(lead.phone, 'Voxari', 'Hello!');
    }
  }
}
