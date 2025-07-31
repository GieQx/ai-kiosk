
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });


/**
 * Generates a chatbot response using the Gemini API, based on a user question and a provided knowledge base.
 * This simulates a RAG (Retrieval-Augmented Generation) system.
 *
 * @param question The user's question.
 * @param knowledgeBase The context document (e.g., CSV data) for the AI to reference.
 * @returns A promise that resolves to the AI's generated response as a string.
 */
export const getChatbotResponse = async (question: string, knowledgeBase: string): Promise<string> => {
  try {
    const systemInstruction = `You are a friendly and helpful assistant for a futuristic tech store. 
Your primary goal is to answer customer questions based *only* on the provided product data below.
The product data is in CSV format.
If the answer cannot be found in the provided data, you must clearly state that you don't have information on that topic.
Do not make up information. Be concise and clear in your answers.

Here is the product data:
---
${knowledgeBase}
---
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
            topP: 0.8,
            topK: 10,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};
