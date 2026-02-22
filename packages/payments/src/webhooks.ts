import { verifyDodoSignature } from './dodo';

export async function processDodoWebhook({
  headers,
  rawBody,
  secret,
}: {
  headers: any;
  rawBody: string;
  secret: string;
}) {
  const signature = headers['x-dodo-signature'];
  if (!verifyDodoSignature(rawBody, signature, secret)) {
    throw new Error('Invalid signature');
  }

  const event = JSON.parse(rawBody);
  return event;
}
