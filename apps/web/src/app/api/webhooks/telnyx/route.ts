import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@voxari/db';
import { answerCall, startStreaming } from '@voxari/telephony';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const event = payload.data;

  const eventType = event.event_type;
  const callControlId = event.payload.call_control_id;

  switch (eventType) {
    case 'call.initiated':
      const fromE164 = event.payload.from;
      const toE164 = event.payload.to;

      // Find tenant by number
      const telnyxNumber = await prisma.telnyxNumber.findUnique({
        where: { phoneE164: toE164 },
        include: { tenant: true }
      });

      if (!telnyxNumber) {
        console.error(\`No tenant found for number \${toE164}\`);
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
      }

      // Create call record
      await prisma.call.create({
        data: {
          tenantId: telnyxNumber.tenantId,
          direction: 'inbound',
          fromE164,
          toE164,
          telnyxCallId: event.payload.call_leg_id,
          callControlId,
          status: 'INIT',
        }
      });

      // Answer call
      await answerCall(callControlId);
      break;

    case 'call.answered':
      // Start streaming to orchestrator
      const orchestratorUrl = \`wss://\${process.env.APP_PUBLIC_URL?.replace('https://', '')}/orchestrator/media-stream\`;
      // In Replit, it might be different. For MVP, we'll assume a reachable URL.
      const streamUrl = process.env.ORCHESTRATOR_URL || 'ws://localhost:4001/media-stream';

      await startStreaming(callControlId, streamUrl);

      await prisma.call.update({
        where: { callControlId },
        data: { status: 'ANSWERED', startedAt: new Date() }
      });
      break;

    case 'call.hangup':
      await prisma.call.update({
        where: { callControlId },
        data: { status: 'COMPLETED', endedAt: new Date() }
      });
      break;
  }

  return NextResponse.json({ success: true });
}
