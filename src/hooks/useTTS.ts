import { useCallback } from 'react';

export interface UseTTSOptions {
  provider?: 'microsoft' | 'native';
  voiceName?: string;
}

export function useTTS(options: UseTTSOptions = {}) {
  const { provider = 'microsoft', voiceName } = options;

  const speak = useCallback(
    async (text: string) => {
      try {
        const response = await fetch('/api/tts/speak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            provider,
            voiceName,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'TTS request failed');
        }

        return await response.json();
      } catch (error) {
        console.error('[useTTS] Error:', error);
        throw error;
      }
    },
    [provider, voiceName]
  );

  return { speak };
}
