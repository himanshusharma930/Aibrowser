import { SpeechRecognitionBase, SpeechRecognitionConfig } from "./speech-recognition-base";

/**
 * Microsoft Speech Recognition Provider
 * 
 * OPTIONAL DEPENDENCY: This provider requires the Microsoft Cognitive Services Speech SDK.
 * Install with: pnpm add microsoft-cognitiveservices-speech-sdk
 * 
 * The SDK will be loaded dynamically at runtime, so the build won't fail if not installed.
 * However, attempting to use this provider without the SDK will throw an error.
 */

// SDK will be loaded dynamically
let SpeechSDK: any = null;

// Try to load the SDK - it's an optional dependency
async function loadSpeechSDK(): Promise<any> {
    if (SpeechSDK) return SpeechSDK;
    try {
        // Dynamic import - won't fail at build time
        SpeechSDK = await import("microsoft-cognitiveservices-speech-sdk" as string);
        return SpeechSDK;
    } catch (error) {
        console.error("[Microsoft] Speech SDK not installed. Install with: pnpm add microsoft-cognitiveservices-speech-sdk");
        throw new Error("Microsoft Speech SDK not installed. Install with: pnpm add microsoft-cognitiveservices-speech-sdk");
    }
}

export class SpeechRecognitionMicrosoft implements SpeechRecognitionBase {
    config: SpeechRecognitionConfig;
    private recognizer: any = null;
    isRecognizing: boolean = false;
    private initialized: boolean = false;
    private onRecognizedCallback?: (text: string) => void;
    private sdk: any = null;

    constructor(config: SpeechRecognitionConfig, onRecognizedCallback?: (text: string) => void) {
        this.config = config;
        this.onRecognizedCallback = onRecognizedCallback;
        // Initialization is deferred to first use (async)
    }

    private async ensureInitialized(): Promise<void> {
        if (this.initialized) return;

        this.sdk = await loadSpeechSDK();
        const speechConfig = this.sdk.SpeechConfig.fromSubscription(this.config.apiKey!, this.config.region!);
        speechConfig.speechRecognitionLanguage = "zh-CN";

        const audioConfig = this.sdk.AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = new this.sdk.SpeechRecognizer(speechConfig, audioConfig);

        // Set event handlers
        this.recognizer.recognizing = (_s: any, e: any) => {
            console.log(`[Microsoft] Speech recognizing: ${e.result.text}`);
        };

        this.recognizer.recognized = (_s: any, e: any) => {
            if (e.result.reason === this.sdk.ResultReason.RecognizedSpeech) {
                console.log(`[Microsoft] Speech recognition result: ${e.result.text}`);
                if (this.onRecognizedCallback && e.result.text.trim()) {
                    this.onRecognizedCallback(e.result.text);
                }
            } else if (e.result.reason === this.sdk.ResultReason.NoMatch) {
                console.log("[Microsoft] No speech content recognized");
            }
        };

        this.recognizer.canceled = (_s: any, e: any) => {
            console.log(`[Microsoft] Speech recognition canceled: ${e.reason}`);
            if (e.reason === this.sdk.CancellationReason.Error) {
                console.error(`[Microsoft] Speech recognition error: ${e.errorDetails}`);
            }
            this.isRecognizing = false;
        };

        this.recognizer.sessionStopped = (_s: any, _e: any) => {
            console.log("[Microsoft] Speech recognition session stopped");
            this.isRecognizing = false;
        };

        this.initialized = true;
    }

    async start(): Promise<void> {
        await this.ensureInitialized();
        return new Promise((resolve, reject) => {
            if (!this.recognizer) {
                console.error("[Microsoft] Speech recognizer not initialized");
                this.isRecognizing = false;
                reject(new Error("[Microsoft] Speech recognizer not initialized"));
                return;
            }

            this.recognizer.startContinuousRecognitionAsync(
                () => {
                    console.log("[Microsoft] Speech recognition started");
                    this.isRecognizing = true;
                    resolve();
                },
                (error: any) => {
                    console.error("[Microsoft] Failed to start speech recognition:", error);
                    this.isRecognizing = false;
                    reject(error);
                }
            );
        });
    }

    async stop(): Promise<void> {
        if (!this.initialized || !this.recognizer) {
            console.log("[Microsoft] Speech recognizer not initialized, nothing to stop");
            return;
        }
        
        return new Promise((resolve, reject) => {
            this.recognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log("[Microsoft] Speech recognition stopped");
                    this.isRecognizing = false;
                    resolve();
                },
                (error: any) => {
                    console.error("[Microsoft] Failed to stop speech recognition:", error);
                    this.isRecognizing = false;
                    reject(error);
                }
            );
        });
    }

    async cleanup(): Promise<void> {
        if (this.isRecognizing) {
            await this.stop();
        }
        if (this.recognizer) {
            this.recognizer.close();
        }
    }
}
