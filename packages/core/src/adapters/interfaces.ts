export interface STTAdapter {
  start(options: any): Promise<void>;
  stop(): Promise<void>;
  onTranscript(callback: (transcript: { text: string; isFinal: boolean; confidence: number }) => void): void;
  sendAudio(chunk: Buffer): void;
}

export interface TTSAdapter {
  synthesize(text: string, options: any): Promise<AsyncIterable<Buffer>>;
  stop(): void;
}

export interface MessagingAdapter {
  sendMessage(to: string, from: string, text: string): Promise<void>;
}
