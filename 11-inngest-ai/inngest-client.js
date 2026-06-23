import { Inngest } from "inngest";
import { gemini } from "@inngest/ai/models";

export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});

const model = "gemini-2.5-flash";

export const gemini2flash = gemini({
  model,
  apiKey: process.env.GEMINI_API_KEY,
});
