import Stripe from 'stripe';

export class PaymentService {
  private stripe: Stripe;
  constructor(apiKey: string) { this.stripe = new Stripe(apiKey, { apiVersion: '2023-10-16' as any }); }

  async createSubscription(customerId: string, priceId: string) {
    return await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });
  }

  async processRefund(chargeId: string, amount?: number) {
    return await this.stripe.refunds.create({ charge: chargeId, amount });
  }
}
