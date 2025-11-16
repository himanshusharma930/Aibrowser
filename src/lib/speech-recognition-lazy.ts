/**
 * Dynamic Import Strategy for Speech Recognition
 *
 * The speech recognition module is heavy (~200KB+) and not needed on initial page load.
 * This wrapper enables lazy loading of the appropriate provider on demand.
 */

/**
 * Lazy load speech recognition with provider selection
 * Only imports the specific provider needed, reducing bundle size
 */
export async function loadSpeechRecognitionProvider(provider: 'microsoft' | 'vosk' | 'xunfei') {
  try {
    switch (provider) {
      case 'microsoft':
        return await import('@/models/speech-recognition/speech-recognition-microsoft');
      case 'vosk':
        return await import('@/models/speech-recognition/speech-recognition-vosk');
      case 'xunfei':
        return await import('@/models/speech-recognition/speech-recognition-xunfei');
      default:
        throw new Error(`Unknown speech recognition provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Failed to load speech recognition provider: ${provider}`, error);
    throw error;
  }
}

/**
 * Initialize speech recognition on demand
 * Prevents loading the entire module on app startup
 */
export async function initializeSpeechRecognitionOnDemand(
  provider: 'microsoft' | 'vosk' | 'xunfei',
  config: any,
  onRecognized?: (text: string) => void
) {
  try {
    const loadedModule = await loadSpeechRecognitionProvider(provider);

    // Get the appropriate class based on provider
    let RecognitionClass: any;
    switch (provider) {
      case 'microsoft':
        RecognitionClass = (loadedModule as any).SpeechRecognitionMicrosoft;
        break;
      case 'vosk':
        RecognitionClass = (loadedModule as any).SpeechRecognitionVosk;
        break;
      case 'xunfei':
        RecognitionClass = (loadedModule as any).SpeechRecognitionXunfei;
        break;
    }

    return new RecognitionClass(config, onRecognized);
  } catch (error) {
    console.error('Failed to initialize speech recognition:', error);
    throw error;
  }
}
