import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@voxari/db';

export async function POST(req: NextRequest) {
  const { dealId } = await req.json();

  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
    include: { prospect: true }
  });

  if (!deal) return NextResponse.json({ error: 'Deal not found' }, { status: 404 });

  // For semi-autonomous: check if approved
  // In a real app, we'd have a field for this.
  // Let's assume we update the stage to CONTACTED if it's the first step.

  await prisma.deal.update({
    where: { id: dealId },
    data: { stage: 'CONTACTED' }
  });

  // Trigger email/SMS via Resend/Telnyx (placeholder)
  console.log(\`Launching outreach for \${deal.prospect.email}\`);

  return NextResponse.json({ success: true });
}
