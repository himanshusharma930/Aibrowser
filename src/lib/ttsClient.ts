/**
 * Client-side TTS API wrapper
 * Calls server-side TTS endpoint to keep API keys secure
 */

export interface TTSClientConfig {
  voiceName?: string;
  rate?: string;
}

export interface TTSSynthesizeOptions {
  text: string;
  voiceName?: string;
  rate?: string;
}

export class TTSClient {
  private config: TTSClientConfig;
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor(config: TTSClientConfig = {}) {
    this.config = config;
    
    // Initialize AudioContext on first use
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Synthesize and play text
   */
  async speak(text: string, options: Partial<TTSSynthesizeOptions> = {}): Promise<void> {
    try {
      // Call server-side API
      const response = await fetch('/api/tts/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceName: options.voiceName || this.config.voiceName,
          rate: options.rate || this.config.rate,
          provider: 'microsoft',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'TTS request failed');
      }

      const data = await response.json();

      if (!data.success || !data.audioData) {
        throw new Error('Invalid TTS response');
      }

      // Decode base64 audio data
      const audioData = this.base64ToArrayBuffer(data.audioData);

      // Play audio
      await this.playAudio(audioData);
    } catch (error) {
      console.error('[TTS Client] Error:', error);
      throw error;
    }
  }

  /**
   * Stop current playback
   */
  stop(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (error) {
        // Ignore errors if already stopped
      }
      this.currentSource = null;
    }
  }

  /**
   * Play audio buffer
   */
  private async playAudio(audioData: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      throw new Error('AudioContext not initialized');
    }

    // Stop any current playback
    this.stop();

    // Decode audio data
    const audioBuffer = await this.audioContext.decodeAudioData(audioData);

    // Create source
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);

    // Track current source
    this.currentSource = source;

    // Play
    return new Promise((resolve, reject) => {
      source.onended = () => {
        this.currentSource = null;
        resolve();
      };

      try {
        source.start(0);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Convert base64 to ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Singleton instance
let ttsClientInstance: TTSClient | null = null;

/**
 * Get TTS client instance
 */
export function getTTSClient(config?: TTSClientConfig): TTSClient {
  if (!ttsClientInstance) {
    ttsClientInstance = new TTSClient(config);
  }
  return ttsClientInstance;
}

/**
 * Speak text using TTS
 */
export async function speak(text: string, options?: Partial<TTSSynthesizeOptions>): Promise<void> {
  const client = getTTSClient();
  return client.speak(text, options);
}

/**
 * Stop TTS playback
 */
export function stopSpeaking(): void {
  if (ttsClientInstance) {
    ttsClientInstance.stop();
  }
}
