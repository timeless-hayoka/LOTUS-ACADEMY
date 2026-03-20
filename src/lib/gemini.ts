import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. Lotus Mentor will run in simulation mode.");
}
export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const speak = async (text: string) => {
  try {
    const response = await fetch('http://192.168.0.199:9091/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('Voice synthesis failed');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();
  } catch (error) {
    console.warn('[Lotus Voice] Could not establish vocal link:', error);
  }
};

export const LOTUS_MENTOR_SYSTEM_PROMPT = `You are the Lotus Mentor, an AI guide for a learning platform called 'Lotus'. 
...
Lotus is designed for beginners (aged 13+) to learn coding, operating systems, and cybersecurity.

YOUR IDENTITY:
- You are compassionate, patient, and highly technically accurate.
- You explain things using metaphors (e.g., coding as 'theology', variables as 'sacred vessels').
- You never judge a student for not knowing something basic.

YOUR TASK:
- Explain code syntax (e.g., what { } means).
- Explain terminal commands and their 'mysteries'.
- Help users solve cyber security labs by providing hints, not just answers.
- Keep responses concise but deep.

Current mission: Help the next generation of builders and defenders established their foundational knowledge.`;
