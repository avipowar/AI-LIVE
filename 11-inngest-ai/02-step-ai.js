import "dotenv/config";
import { inngest } from "./inngest-client.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});
const model = "gemini-2.5-flash";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "chai-summarize-then-translate",
    triggers: [{ event: "chai.summarize-then-translate" }],
  },

  async ({ event, step }) => {
    // step 1
    const summary = await step.run("summarize-text", async () => {
      const response = await ai.models.generateContent({
        model,
        contents: "Summarize the following text in 1 line: " + event.data.text,
      });
      return response.text;
    });

    // step 2
    const translation = await step.run("translate-text", async () => {
      const response = await ai.models.generateContent({
        model,
        contents: `Translate the following text to hindi: ${summary}`,
      });
      return response.text;
    });

    return translation;
  },
);
