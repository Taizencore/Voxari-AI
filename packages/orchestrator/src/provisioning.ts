import { prisma } from '@voxari/db';
import { PACK_DEFAULTS, VerticalPack } from '@voxari/shared';

export async function runProvisioning(dealId: string) {
  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
    include: { prospect: true },
  });

  if (!deal) throw new Error('Deal not found');

  // 1. Create tenant if not exists
  let tenant = await prisma.tenant.findFirst({
    where: { name: deal.prospect.business || '' },
  });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: deal.prospect.business || 'New Tenant',
        verticalPack: deal.verticalPack,
        settings: {
          create: {
            hoursJson: {},
            routingRulesJson: {},
            knowledgeBaseJson: {},
            // Use pack defaults if needed, though they are usually in code
          }
        }
      }
    });
  }

  // 2. Provision Telnyx number (placeholder)
  // await provisionNumber(...)

  // 3. Update Deal stage
  await prisma.deal.update({
    where: { id: dealId },
    data: { stage: 'LIVE' },
  });

  return tenant;
}
