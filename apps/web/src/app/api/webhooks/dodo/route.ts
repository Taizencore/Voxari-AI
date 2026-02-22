import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@voxari/db';
import { processDodoWebhook } from '@voxari/payments';
import { runProvisioning } from '@voxari/orchestrator';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  try {
    const event = await processDodoWebhook({
      headers,
      rawBody,
      secret: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || '',
    });

    if (event.type === 'payment.succeeded') {
      const dealId = event.data.metadata.dealId;

      // Update payment event
      await prisma.paymentEvent.create({
        data: {
          paymentLinkId: event.data.payment_link_id, // Need to make sure this exists
          providerEventId: event.id,
          type: event.type,
          payload: event,
          processingStatus: 'PROCESSED',
          processedAt: new Date(),
        }
      });

      // Run provisioning
      await runProvisioning(dealId);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Dodo Webhook Error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
