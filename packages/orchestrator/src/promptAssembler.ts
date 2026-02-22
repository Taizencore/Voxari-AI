import { PACK_DEFAULTS, VerticalPack } from '@voxari/shared';

export function assembleSystemPrompt({
  tenantName,
  verticalPack,
  tenantSettings,
}: {
  tenantName: string;
  verticalPack: VerticalPack;
  tenantSettings: any;
}) {
  const defaults = PACK_DEFAULTS[verticalPack];

  let prompt = `You are an AI receptionist for ${tenantName}.
Your tone should be ${defaults.toneInstructions}.
Greeting: ${defaults.greeting}

Intake Process:
${defaults.intakeQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Rules:
${defaults.doNotDo.map((rule) => `- ${rule}`).join('\n')}

Knowledge Base:
${JSON.stringify(tenantSettings.knowledgeBaseJson || {})}

Routing Rules:
${JSON.stringify(tenantSettings.routingRulesJson || {})}

Current Date and Time: ${new Date().toISOString()}
`;

  if (defaults.disclaimers) {
    prompt += `\nDisclaimers:\n${defaults.disclaimers.join('\n')}`;
  }

  return prompt;
}
