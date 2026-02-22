import { telnyxClient } from './telnyxClient';

export async function searchNumbers(areaCode?: string) {
  return telnyxClient.availablePhoneNumbers.list({
    filter: {
      phone_number: {
        starts_with: areaCode,
      },
      features: ['sms', 'voice'],
    },
  });
}

export async function provisionNumber(phoneNumber: string, connectionId: string) {
  return telnyxClient.numberOrders.create({
    phone_numbers: [{ phone_number: phoneNumber }],
    connection_id: connectionId,
  });
}
