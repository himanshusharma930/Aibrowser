import type { NextApiRequest, NextApiResponse } from 'next';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

interface TTSRequest {
  text: string;
  voiceName?: string;
  rate?: string;
  provider?: 'microsoft' | 'native';
}

interface TTSResponse {
  success: boolean;
  audioData?: string; // Base64 encoded audio
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TTSResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { text, voiceName, rate, provider = 'microsoft' }: TTSRequest = req.body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid text parameter' 
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Text too long (max 5000 characters)' 
      });
    }

    // Only Microsoft TTS is supported server-side
    if (provider !== 'microsoft') {
      return res.status(400).json({ 
        success: false, 
        error: 'Only Microsoft TTS is supported server-side' 
      });
    }

    // Get credentials from environment (server-side only)
    const TTS_KEY = process.env.TTS_KEY;
    const TTS_REGION = process.env.TTS_REGION;

    if (!TTS_KEY || !TTS_REGION) {
      console.error('[TTS API] Missing TTS credentials in environment');
      return res.status(500).json({ 
        success: false, 
        error: 'TTS service not configured' 
      });
    }

    // Create speech config
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(TTS_KEY, TTS_REGION);
    speechConfig.speechSynthesisVoiceName = voiceName || 'zh-CN-XiaoxiaoNeural';

    // Use audio config to get audio data
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    // Create SSML
    const ssml = `
<speak version="1.0" xml:lang="zh-CN">
  <voice name="${voiceName || 'zh-CN-XiaoxiaoNeural'}">
    <prosody rate="${rate || '120%'}">${text}</prosody>
  </voice>
</speak>`.trim();

    // Synthesize speech
    const result = await new Promise<SpeechSDK.SpeechSynthesisResult>((resolve, reject) => {
      synthesizer.speakSsmlAsync(
        ssml,
        (result) => resolve(result),
        (error) => reject(error)
      );
    });

    // Check result
    if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
      // Convert audio data to base64
      const audioData = Buffer.from(result.audioData).toString('base64');
      
      synthesizer.close();
      
      return res.status(200).json({ 
        success: true, 
        audioData 
      });
    } else {
      console.error('[TTS API] Synthesis failed:', result.errorDetails);
      synthesizer.close();
      
      return res.status(500).json({ 
        success: false, 
        error: result.errorDetails || 'Speech synthesis failed' 
      });
    }
  } catch (error: any) {
    console.error('[TTS API] Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}
