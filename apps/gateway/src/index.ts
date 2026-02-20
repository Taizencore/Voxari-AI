import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import dotenv from 'dotenv';
import {
  DeepgramSTTAdapter,
  DeepgramTTSAdapter,
  AIWorkerEngine,
  AIWorker,
  Department
} from '@voxari/core';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/media' });

const aiEngine = new AIWorkerEngine(process.env.OPENAI_API_KEY || '');

// Mock worker and department for demonstration
const mockWorker: AIWorker = {
  id: 'w1',
  name: 'Emma',
  departmentId: 'd1',
  role: 'Receptionist',
  backstory: 'Friendly and efficient medical spa receptionist.',
  kpis: ['booking_rate'],
  voiceProfileId: 'v1'
};

const mockDept: Department = {
  id: 'd1',
  name: 'Front Desk',
  description: 'Main greeting and scheduling',
  workspaceId: 'ws1'
};

wss.on('connection', (ws: WebSocket) => {
  console.log('New call connected to media stream');

  const stt = new DeepgramSTTAdapter(process.env.DEEPGRAM_API_KEY || '');
  const tts = new DeepgramTTSAdapter(process.env.DEEPGRAM_API_KEY || '');

  let streamSid: string | null = null;
  let isAiTalking = false;
  let conversationHistory: any[] = [];

  stt.onTranscript(async (transcript) => {
    if (isAiTalking) {
      console.log('User interrupted AI (Barge-in)');
      // In a real implementation, we would send a 'clear' command to Telnyx
      isAiTalking = false;
    }

    if (transcript.isFinal) {
      console.log('User:', transcript.text);

      const response = await aiEngine.generateResponse(
        mockWorker,
        mockDept,
        [mockDept],
        conversationHistory,
        transcript.text
      );

      if (response.type === 'text' && response.content) {
        console.log('AI:', response.content);
        conversationHistory.push({ role: 'user', content: transcript.text });
        conversationHistory.push({ role: 'assistant', content: response.content });

        isAiTalking = true;
        const audioStream = await tts.synthesize(response.content);

        for await (const chunk of audioStream) {
          if (!isAiTalking) break; // Stop if interrupted during synthesis
          ws.send(JSON.stringify({
            event: 'media',
            media: {
              payload: chunk.toString('base64')
            }
          }));
        }
        isAiTalking = false;
      }
    }
  });

  stt.start();

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.event === 'start') {
        streamSid = data.streamSid;
        console.log('Stream started:', streamSid);
      } else if (data.event === 'media') {
        const payload = Buffer.from(data.media.payload, 'base64');
        stt.sendAudio(payload);
      }
    } catch (e) {
      // Ignore non-json or malformed
    }
  });

  ws.on('close', () => {
    console.log('Call ended');
    stt.stop();
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Voxari Voice Gateway listening on port ${PORT}`);
});
