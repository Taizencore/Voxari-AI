import telnyx from 'telnyx';

const apiKey = process.env.TELNYX_API_KEY || '';
export const telnyxClient = telnyx(apiKey);

export default telnyxClient;
