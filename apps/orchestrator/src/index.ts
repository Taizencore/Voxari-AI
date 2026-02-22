import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import { REALTIME_MODEL } from '@voxari/voice';
import { prisma } from '@voxari/db';
import { assembleSystemPrompt, tools } from '@voxari/orchestrator';

dotenv.config();

const fastify = Fastify({ logger: true });
fastify.register(fastifyWebsocket);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

fastify.register(async (fastify) => {
  fastify.get('/media-stream', { websocket: true }, (connection, req) => {
    fastify.log.info('Telnyx Media Stream connection received');

    let streamSid: string | null = null;
    let callControlId: string | null = null;
    let openAiWs: WebSocket | null = null;

    const initializeOpenAI = async (tenantId: string, verticalPack: any, tenantSettings: any, tenantName: string) => {
      openAiWs = new WebSocket(\`wss://api.openai.com/v1/realtime?model=\${REALTIME_MODEL}\`, {
        headers: {
          'Authorization': \`Bearer \${OPENAI_API_KEY}\`,
          'OpenAI-Beta': 'realtime=v1',
        },
      });

      openAiWs.on('open', () => {
        fastify.log.info('Connected to OpenAI Realtime');

        const systemPrompt = assembleSystemPrompt({
          tenantName,
          verticalPack,
          tenantSettings,
        });

        const sessionUpdate = {
          type: 'session.update',
          session: {
            modalities: ['audio', 'text'],
            input_audio_format: 'g711_ulaw',
            output_audio_format: 'g711_ulaw',
            instructions: systemPrompt,
            tools: tools,
            tool_choice: 'auto',
          },
        };

        openAiWs?.send(JSON.stringify(sessionUpdate));
      });

      openAiWs.on('message', (data) => {
        const response = JSON.parse(data.toString());

        if (response.type === 'response.audio.delta') {
          connection.socket.send(JSON.stringify({
            event: 'media',
            media: { payload: response.delta },
            stream_sid: streamSid,
          }));
        }

        if (response.type === 'response.function_call_arguments.done') {
           // Handle tool calls here or via a handler
           fastify.log.info(\`Function call: \${response.name} with \${response.arguments}\`);
        }
      });
    };

    connection.socket.on('message', async (message) => {
      const data = JSON.parse(message.toString());

      switch (data.event) {
        case 'start':
          streamSid = data.start.stream_sid;
          callControlId = data.start.call_control_id;

          // Fetch call and tenant info
          const call = await prisma.call.findUnique({
            where: { callControlId: callControlId || '' },
            include: { tenant: { include: { settings: true } } }
          });

          if (call) {
            await initializeOpenAI(
              call.tenantId,
              call.tenant.verticalPack,
              call.tenant.settings,
              call.tenant.name
            );
          }
          break;

        case 'media':
          if (openAiWs?.readyState === WebSocket.OPEN) {
            openAiWs.send(JSON.stringify({
              type: 'input_audio_buffer.append',
              audio: data.media.payload,
            }));
          }
          break;

        case 'stop':
          openAiWs?.close();
          break;
      }
    });

    connection.socket.on('close', () => {
      openAiWs?.close();
    });
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 4001, host: '0.0.0.0' });
    console.log('Orchestrator listening on port 4001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
