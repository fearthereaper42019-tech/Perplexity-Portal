
import { GoogleGenAI } from "@google/genai";

/**
 * Fixed history type definition to allow array of parts instead of rigid tuple.
 * Always use process.env.API_KEY directly inside the function for reliability.
 */
export async function sendMessageToAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  // Create GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: {
      systemInstruction: "You are the Perplexity AI Assistant, integrated into a high-end web proxy and gaming portal. You are helpful, tech-savvy, and have a slightly futuristic, cyberpunk-friendly persona. Keep responses concise but comprehensive.",
    }
  });

  // Extracting text output from GenerateContentResponse
  return response.text;
}
