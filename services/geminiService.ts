import { GoogleGenAI, GenerativeModel } from "@google/genai";

const getAiClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing from environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCulinaryAdvice = async (
  query: string, 
  context?: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
      You are "Miss Can's Culinary Concierge", an expert in Portuguese "conservas" (canned fish) and gastronomy.
      Your tone is warm, elegant, welcoming, and slightly nostalgic, embodying the "From Portugal, With Love" spirit.
      
      Your goal is to help customers:
      1. Create delicious recipes using tinned fish (sardines, mackerel, tuna, cod).
      2. Pair these dishes with Portuguese wines (Vinho Verde, Douro, Alentejo).
      3. Explain the history and sustainability of traditional Portuguese canning.

      Keep answers concise (under 150 words unless asked for a full recipe) and format them beautifully using Markdown.
      If the user asks about something unrelated to food, Portugal, or the sea, gently steer them back to the delights of Miss Can.
    `;

    let prompt = query;
    if (context) {
      prompt = `Context: The user is looking at the product "${context}".\nUser Query: ${query}`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I'm having trouble connecting to the kitchen right now.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Our chef is currently stepping out for fresh ingredients. Please try again in a moment.";
  }
};
