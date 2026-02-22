import { createDodoCheckoutSession } from './dodo';

export async function createCheckoutSession(params: {
  dealId: string;
  items: any[];
  successUrl: string;
  cancelUrl: string;
  metadata: any;
}) {
  // Calculate total amount from items
  const amountUsd = params.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return createDodoCheckoutSession({
    dealId: params.dealId,
    amountUsd,
    metadata: params.metadata,
    successUrl: params.successUrl,
    cancelUrl: params.cancelUrl,
  });
}
