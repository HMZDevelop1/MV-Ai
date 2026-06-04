export type VoiceLanguage = "en" | "fr" | "ar";

export interface VoiceConfig {
  inputLanguage: VoiceLanguage;
  outputLanguage: VoiceLanguage;
  autoSpeak: boolean;
}

const voiceLanguages: Record<VoiceLanguage, string> = {
  en: "en-US",
  fr: "fr-FR",
  ar: "ar-SA",
};

// Declare types for Speech Recognition API if not available globally
declare global {
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }
  
  interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
    onerror: (this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any;
    start(): void;
    stop(): void;
  }
  
  interface SpeechSynthesisUtterance {
    lang: string;
    rate: number;
    pitch: number;
  }
  
  interface SpeechSynthesis {
    cancel(): void;
    speak(utterance: SpeechSynthesisUtterance): void;
  }
}

export class VoiceAI {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis | null = null;
  private config: VoiceConfig = {
    inputLanguage: "en",
    outputLanguage: "en",
    autoSpeak: true,
  };

  isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && 
           "speechSynthesis" in window;
  }

  setConfig(config: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): VoiceConfig {
    return { ...this.config };
  }

  startListening(
    onResult: (text: string) => void,
    onError?: (error: string) => void
  ): void {
    if (!this.isSupported()) {
      onError?.("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError?.("Speech recognition not supported in this browser.");
      return;
    }
    
    this.recognition = new SpeechRecognition();
    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = voiceLanguages[this.config.inputLanguage];

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };

      this.recognition.onerror = (event) => {
        onError?.(event.error);
      };

      this.recognition.start();
    }
  }

  stopListening(): void {
    this.recognition?.stop();
  }

  speak(text: string): void {
    if (!this.config.autoSpeak) return;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceLanguages[this.config.outputLanguage];
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }

  cancelSpeech(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceAI = new VoiceAI();
