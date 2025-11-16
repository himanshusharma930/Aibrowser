/**
 * Dynamic Import Strategy for TTS Player
 *
 * The TTS player module is feature-specific and only needed when users
 * enable text-to-speech functionality. This wrapper enables lazy loading.
 */

import dynamic from 'next/dynamic';

/**
 * Lazy load TTS player module on demand
 * Prevents loading the entire TTS infrastructure on app startup
 */
export async function loadTTSPlayerModule() {
  try {
    return await import('@/lib/ttsPlayer');
  } catch (error) {
    console.error('Failed to load TTS player module:', error);
    throw error;
  }
}

/**
 * Initialize TTS player on demand
 * Only loads when user actually needs to use TTS functionality
 */
export async function initializeTTSPlayerOnDemand(config: {
  provider?: 'azure' | 'local';
  language?: string;
  voice?: string;
} = {}) {
  try {
    const loadedModule = await loadTTSPlayerModule();
    // Return the initialized module for use
    return loadedModule;
  } catch (error) {
    console.error('Failed to initialize TTS player:', error);
    throw error;
  }
}

/**
 * Helper to check if TTS is available
 * Lightweight check that doesn't load the full module
 */
export function isTTSAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  // Check if browser supports Web Speech API or Azure Speech Services
  return !!(window.speechSynthesis || (window as any).api?.tts);
}
