export enum VoiceProvider {
  OPENAI_REALTIME = 'OPENAI_REALTIME',
  ELEVENLABS = 'ELEVENLABS',
}

interface OwnerSettings {
  elevenlabsEnabledGlobally: boolean;
  elevenlabsVisibleToTenants: boolean;
  elevenlabsAutoApplyAllTenants: boolean;
  elevenlabsAllowTenantOverride: boolean;
  elevenlabsExclusionTenantIds: string[];
}

interface TenantSettings {
  elevenlabsEnabled: boolean;
}

export function getEffectiveVoiceProvider({
  ownerSettings,
  tenantSettings,
  tenantId,
}: {
  ownerSettings: OwnerSettings;
  tenantSettings: TenantSettings;
  tenantId: string;
}): { provider: VoiceProvider; reason: string } {
  // 1. If ownerSettings.elevenlabsEnabledGlobally is false → provider = OPENAI
  if (!ownerSettings.elevenlabsEnabledGlobally) {
    return { provider: VoiceProvider.OPENAI_REALTIME, reason: 'ElevenLabs disabled globally by owner' };
  }

  // 2. If tenant is in ownerSettings.elevenlabsExclusionTenantIds → provider = OPENAI
  if (ownerSettings.elevenlabsExclusionTenantIds.includes(tenantId)) {
    return { provider: VoiceProvider.OPENAI_REALTIME, reason: 'Tenant explicitly excluded from ElevenLabs' };
  }

  // 3. If ownerSettings.elevenlabsAutoApplyAllTenants is true → provider = ELEVENLABS
  if (ownerSettings.elevenlabsAutoApplyAllTenants) {
    return { provider: VoiceProvider.ELEVENLABS, reason: 'ElevenLabs auto-applied globally by owner' };
  }

  // 4. Else if ownerSettings.elevenlabsVisibleToTenants is true AND tenantSettings.elevenlabsEnabled is true → provider = ELEVENLABS
  if (ownerSettings.elevenlabsVisibleToTenants && tenantSettings.elevenlabsEnabled) {
    return { provider: VoiceProvider.ELEVENLABS, reason: 'ElevenLabs enabled by tenant' };
  }

  // 5. Else provider = OPENAI
  return { provider: VoiceProvider.OPENAI_REALTIME, reason: 'Defaulting to OpenAI Realtime' };
}
