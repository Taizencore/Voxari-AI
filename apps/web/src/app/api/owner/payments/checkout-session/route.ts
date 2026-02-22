import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@voxari/db';
import { createCheckoutSession } from '@voxari/payments';

export async function POST(req: NextRequest) {
  const { dealId, items } = await req.json();

  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
    include: { prospect: true }
  });

  if (!deal) return NextResponse.json({ error: 'Deal not found' }, { status: 404 });

  try {
    const session = await createCheckoutSession({
      dealId,
      items,
      successUrl: \`\${process.env.APP_PUBLIC_URL}/billing/success?dealId=\${dealId}\`,
      cancelUrl: \`\${process.env.APP_PUBLIC_URL}/billing/cancel?dealId=\${dealId}\`,
      metadata: { dealId, prospectId: deal.prospectId }
    });

    // Create PaymentLink record
    await prisma.paymentLink.create({
      data: {
        dealId,
        amountUsd: items.reduce((sum: number, item: any) => sum + item.price, 0),
        checkoutUrl: session.checkout_url,
        providerRef: session.id,
      }
    });

    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
