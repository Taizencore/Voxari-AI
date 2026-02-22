export interface CallSession {
  callId: string;
  tenantId: string;
  callControlId: string;
  status: 'active' | 'ended';
  startedAt: Date;
}

const sessions = new Map<string, CallSession>();

export function createSession(session: CallSession) {
  sessions.set(session.callControlId, session);
  return session;
}

export function getSession(callControlId: string) {
  return sessions.get(callControlId);
}

export function endSession(callControlId: string) {
  const session = sessions.get(callControlId);
  if (session) {
    session.status = 'ended';
  }
}
