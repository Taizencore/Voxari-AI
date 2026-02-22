import { getEffectiveVoiceProvider, VoiceProvider } from '@voxari/shared';

export { VoiceProvider };

export async function selectVoiceProvider({
  tenantId,
  ownerSettings,
  tenantSettings,
}: {
  tenantId: string;
  ownerSettings: any;
  tenantSettings: any;
}) {
  const result = getEffectiveVoiceProvider({
    ownerSettings,
    tenantSettings,
    tenantId,
  });

  return result;
}
