import { telnyxClient } from './telnyxClient';

export async function answerCall(callControlId: string) {
  return telnyxClient.calls.answer(callControlId);
}

export async function startStreaming(callControlId: string, streamUrl: string) {
  return telnyxClient.calls.streamStart(callControlId, {
    stream_url: streamUrl,
    stream_track: 'both_tracks',
  });
}

export async function transferCall(callControlId: string, destination: string) {
  return telnyxClient.calls.transfer(callControlId, {
    to: destination,
  });
}

export async function gatherInput(callControlId: string, payload: any) {
  return telnyxClient.calls.gatherUsingSpeak(callControlId, payload);
}
