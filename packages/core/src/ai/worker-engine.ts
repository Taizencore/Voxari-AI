import OpenAI from 'openai';
import { AIWorker, Department } from '../types/index.js';

export class AIWorkerEngine {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateResponse(
    worker: AIWorker,
    department: Department,
    availableDepartments: Department[],
    history: { role: 'user' | 'assistant' | 'system'; content: string }[],
    userInput: string
  ) {
    const systemPrompt = `
      You are ${worker.name}, a virtual employee.
      Your Department: ${department.name} (${department.description})
      Your Role: ${worker.role}
      Your Backstory: ${worker.backstory}
      Your KPIs: ${worker.kpis.join(', ')}

      Guidelines:
      1. Stay in character at all times.
      2. If the caller needs help outside your expertise, use the 'transfer_to_department' tool.
      3. Keep responses concise and conversational for voice.
      4. Sentiment Awareness: If the caller sounds frustrated, be extra empathetic and offer immediate escalation if needed.
      5. Multilingual: If the caller speaks a language other than English, respond in that language if you are capable, or offer to find someone who can.
    `;

    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
      {
        type: 'function',
        function: {
          name: 'transfer_to_department',
          description: 'Transfer the call to another department',
          parameters: {
            type: 'object',
            properties: {
              targetDepartmentId: {
                type: 'string',
                enum: availableDepartments.map(d => d.id),
                description: 'The ID of the department to transfer to',
              },
              reason: {
                type: 'string',
                description: 'Reason for the transfer',
              },
            },
            required: ['targetDepartmentId', 'reason'],
          },
        },
      },
    ];

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userInput },
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
      tools,
      tool_choice: 'auto',
    });

    const message = response.choices[0].message;

    if (message.tool_calls) {
      return {
        type: 'tool_call',
        toolCalls: message.tool_calls,
      };
    }

    return {
      type: 'text',
      content: message.content,
    };
  }
}
