import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY || '';
export const openai = new OpenAI({ apiKey });

export const REALTIME_MODEL = process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview-2024-10-01';

// OpenAI Realtime usually uses WebSockets directly for audio
// This file will mostly hold configuration and helpers
