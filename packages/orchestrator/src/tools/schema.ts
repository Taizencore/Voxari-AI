export const tools = [
  {
    type: 'function',
    function: {
      name: 'book_appointment',
      description: 'Books an appointment for a client.',
      parameters: {
        type: 'object',
        properties: {
          serviceId: { type: 'string' },
          clientName: { type: 'string' },
          clientPhone: { type: 'string' },
          clientEmail: { type: 'string' },
          startAt: { type: 'string', format: 'date-time' },
        },
        required: ['clientName', 'clientPhone', 'startAt'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: 'Checks for available appointment slots.',
      parameters: {
        type: 'object',
        properties: {
          serviceId: { type: 'string' },
          from: { type: 'string', format: 'date-time' },
          to: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'transfer_to_human',
      description: 'Transfers the call to a human agent.',
      parameters: {
        type: 'object',
        properties: {
          reason: { type: 'string' },
        },
      },
    },
  },
];
