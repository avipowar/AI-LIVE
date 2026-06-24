import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import { inngest } from "./inngest-client.js";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY background workflow me load nahi hui!");
} else {
  console.log("SUCCESS: GEMINI_API_KEY workflow me mil gayi hai!");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";

export const summarizeThenTranslate = inngest.createFunction(
  {
    id: "chai-summarize-then-translate",
    triggers: [{ event: "chai.summarize-then-translate" }],
  },
  async ({ event, step }) => {
    // 1. STEP: Summarize
    const summaryText = await step.run("summarize-text", async () => {
      const response = await ai.models.generateContent({
        model,
        contents: "Summarize the following text in 1 line: " + event.data.text,
      });
      return response.text;
    });

    // 2. STEP: Translate
    const translationText = await step.run("translate-text", async () => {
      const response = await ai.models.generateContent({
        model,
        contents: `Translate the following text to hindi: ${summaryText}`,
      });
      return response.text;
    });

    return translationText;
  },
);
