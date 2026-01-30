import { GoogleGenAI } from "@google/genai";
import { Lead } from "../types";

// Initialize Gemini Client
// Note: In a real production app, API keys should be handled via a secure backend proxy.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateOutreachMessage = async (lead: Lead, tone: 'professional' | 'friendly' | 'direct' = 'professional') => {
  try {
    const prompt = `
      You are a world-class B2B sales copywriter. Write a highly personalized cold email.
      
      CONTEXT:
      - Recipient: ${lead.full_name}, ${lead.job_title} at ${lead.company_name}
      - Industry: ${lead.industry || 'Unknown'}
      - Trigger Event: ${lead.trigger_type} (Detected on ${lead.trigger_date})
      - Potential Pain Points: ${lead.pain_points ? lead.pain_points.join(', ') : 'General growth challenges'}
      
      RULES:
      1. Maximum 120 words.
      2. Start with a SPECIFIC observation about the trigger event.
      3. Connect their likely pain point to a solution (Smart Outreach AI System).
      4. Include ONE clear CTA (call to action).
      5. Tone: ${tone}.
      6. Return the response in JSON format with "subject", "body", and a short "analysis" of why you wrote it this way.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // We use a lower thinking budget for speed in this demo, or 0 if we want instant results
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};

export const analyzeLead = async (companyName: string, jobTitle: string) => {
  try {
    const prompt = `
      Analyze the following B2B target persona and return 3 likely pain points they face.
      Company: ${companyName}
      Role: ${jobTitle}
      
      Return valid JSON: { "pain_points": ["point 1", "point 2", "point 3"] }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error analyzing lead:", error);
    return { pain_points: ["Manual data entry", "Low response rates", "Inefficient scaling"] };
  }
};
