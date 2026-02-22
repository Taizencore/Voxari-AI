import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { prisma } from '@voxari/db';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
    include: { tenant: { include: { settings: true } } }
  });

  if (!dbUser) {
    // Create default user if not exists?
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
  }

  return NextResponse.json({
    user: dbUser,
    role: dbUser.role,
    tenant: dbUser.tenant,
  });
}
