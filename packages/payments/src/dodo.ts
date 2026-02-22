const DODO_API_URL = process.env.DODO_PAYMENTS_ENV === 'live'
  ? 'https://api.dodopayments.com'
  : 'https://testapi.dodopayments.com';

const apiKey = process.env.DODO_PAYMENTS_API_KEY;

export async function createDodoCheckoutSession({
  dealId,
  amountUsd,
  metadata,
  successUrl,
  cancelUrl,
}: {
  dealId: string;
  amountUsd: number;
  metadata: any;
  successUrl: string;
  cancelUrl: string;
}) {
  const response = await fetch(`${DODO_API_URL}/v1/checkout-sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amountUsd * 100), // convert to cents if Dodo uses cents
      currency: 'USD',
      metadata: { ...metadata, dealId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Dodo Payments Error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export function verifyDodoSignature(payload: string, signature: string, secret: string): boolean {
  // TODO: Implement Dodo signature verification
  return true;
}
