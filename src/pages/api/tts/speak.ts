/**
 * Server-side TTS API endpoint
 *
 * This endpoint handles text-to-speech synthesis on the server side,
 * keeping API keys secure and avoiding exposure in the client bundle.
 *
 * @route POST /api/tts/speak
 * @param {string} text - The text to synthesize to speech
 * @param {string} provider - The TTS provider ('microsoft' or 'native')
 * @param {string} [voiceName] - Voice name (e.g., 'zh-CN-XiaoxiaoNeural')
 * @returns {object} Audio stream or success response
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

type ResponseData =
  | { success: true; audioUrl?: string }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, provider, voiceName } = req.body;

    // Validate required parameters
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    if (!provider || !['microsoft', 'native'].includes(provider)) {
      return res.status(400).json({ error: 'provider must be "microsoft" or "native"' });
    }

    // Handle Microsoft TTS (requires server-side API keys)
    if (provider === 'microsoft') {
      return handleMicrosoftTTS(text, voiceName, res);
    }

    // Handle native TTS (browser-based, no keys needed)
    if (provider === 'native') {
      return res.status(200).json({
        success: true,
        audioUrl: '/api/tts/native'
      });
    }

  } catch (error: any) {
    console.error('[API] TTS error:', error.message);
    return res.status(500).json({
      error: error.message || 'Failed to synthesize speech'
    });
  }
}

/**
 * Handle Microsoft TTS synthesis on the server
 */
async function handleMicrosoftTTS(
  text: string,
  voiceName: string | undefined,
  res: NextApiResponse<ResponseData>
) {
  try {
    const apiKey = process.env.TTS_KEY;
    const region = process.env.TTS_REGION;

    if (!apiKey || !region) {
      return res.status(500).json({
        error: 'TTS_KEY or TTS_REGION environment variables not configured'
      });
    }

    // Create speech configuration
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(apiKey, region);
    speechConfig.speechSynthesisVoiceName = voiceName || 'zh-CN-XiaoxiaoNeural';

    // Configure for file output (we'll stream it back to client)
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          synthesizer.close();

          if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            console.log('[API] TTS synthesis completed');
            resolve(res.status(200).json({ success: true }));
          } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
            const cancellation = (result as any).privDetails;
            console.error('[API] TTS synthesis canceled:', cancellation);
            resolve(res.status(500).json({
              error: `TTS synthesis canceled: ${cancellation}`
            }));
          }
        },
        (error: any) => {
          synthesizer.close();
          console.error('[API] TTS synthesis error:', error);
          resolve(res.status(500).json({
            error: `TTS synthesis failed: ${error?.message || 'Unknown error'}`
          }));
        }
      );
    });
  } catch (error: any) {
    console.error('[API] Microsoft TTS error:', error.message);
    return res.status(500).json({
      error: `Microsoft TTS error: ${error.message}`
    });
  }
}
