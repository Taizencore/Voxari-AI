import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@voxari/db';

export async function POST(req: NextRequest) {
  const { csvData } = await req.json(); // Simple JSON for now, can be actual CSV parser

  // Header: business_name, contact_name, phone_e164, email, website, city, country, vertical_hint, source
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');

  const prospects = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < headers.length) continue;

    const data: any = {};
    headers.forEach((h: string, index: number) => {
      data[h.trim()] = values[index].trim();
    });

    if (!data.phone_e164 && !data.email && !data.website) continue;

    const prospect = await prisma.prospect.create({
      data: {
        name: data.contact_name,
        business: data.business_name,
        phoneE164: data.phone_e164,
        email: data.email,
        website: data.website,
        location: \`\${data.city}, \${data.country}\`,
        verticalHint: data.vertical_hint,
        score: Math.random() * 100, // Random score for MVP
      }
    });
    prospects.push(prospect);
  }

  return NextResponse.json({ imported: prospects.length });
}
