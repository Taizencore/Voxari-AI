export type VoiceProvider = 'deepgram' | 'openai' | 'google' | 'azure' | 'elevenlabs';

export interface VoiceProfile {
  id: string;
  name: string;
  provider: VoiceProvider;
  voiceId: string;
  model?: string;
  gender?: string;
  accent?: string;
  tonePreset?: 'luxury' | 'clinical' | 'warm' | 'efficient';
  rate?: number;
  stability?: number;
}

export interface AIWorker {
  id: string;
  name: string;
  departmentId: string;
  role: string;
  backstory: string;
  kpis: string[];
  voiceProfileId: string;
  avatarUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  vertical: 'healthcare_medspa' | 'healthcare_family' | 'generic';
  settings: Record<string, any>;
}
