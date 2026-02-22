import { prisma } from '@voxari/db';

export const toolHandlers: Record<string, (args: any, context: any) => Promise<any>> = {
  book_appointment: async (args, context) => {
    const { tenantId } = context;
    const { serviceId, clientName, clientPhone, clientEmail, startAt } = args;

    const appointment = await prisma.appointment.create({
      data: {
        tenantId,
        serviceId,
        clientName,
        clientPhone,
        clientEmail,
        startAt: new Date(startAt),
        endAt: new Date(new Date(startAt).getTime() + 30 * 60000), // Default 30 mins
      },
    });

    return { success: true, appointmentId: appointment.id };
  },

  check_availability: async (args, context) => {
    // Mock availability check
    return { available: true, slots: ['2024-05-01T10:00:00Z', '2024-05-01T11:00:00Z'] };
  },

  transfer_to_human: async (args, context) => {
    return { success: true, message: 'Transferring call...' };
  },
};
