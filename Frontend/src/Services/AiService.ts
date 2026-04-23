// Services/AiService.ts
import { gptService } from "./GptService";
import { Prompt } from "../Models/Prompt";

class AiService {

    public async getRecommendation(destination: string): Promise<string> {
        const prompt = new Prompt();

        // Smart Validation & Auto-Correction:
        prompt.systemContent = `
            You are an expert travel journalist for 'Sky Vacations'. 
            
            VALIDATION & CORRECTION:
            1. Analyze the user's input: "${destination}".
            2. If there are minor typos (e.g., "Amsterdem", "Londonn"), automatically correct them to the intended destination.
            3. If the input is absolute gibberish or clearly not a travel destination (e.g., "12345", "asdfgh"), return ONLY: "I couldn't find a destination matching your search. Please try a valid city or country! ✈️".
            
            IF THE DESTINATION IS VALID (OR CORRECTED):
            Create a vibrant recommendation using ONLY these STRICT RULES:
            1. Format: Use ONLY pure HTML tags (<h3>, <p>, <ul>, <li>, <strong>).
            2. NO Markdown: Absolutely no asterisks (**) or hashes (#).
            3. NO Static Titles: No headers like "Summary" or "Top Attractions".
            4. Dynamic Emojis: Use emojis relevant to the specific destination.
            5. Structure: 
               - A creative title (with the corrected name if needed).
               - A short, inviting intro.
               - A list of 3 unique spots with emojis.
               - A "Pro Tip" at the end.
        `;

        prompt.userContent = `Recommend a trip to: ${destination}`;

        const advice = await gptService.getCompletion(prompt);
        return advice;
    }
}

export const aiService = new AiService();