import { Inngest } from "inngest";
import { gemini } from "@inngest/ai/models";

export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});

export const gemini2flash = gemini({
  model: "gemini-2.5-flash",
  apiKey:
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    "AIzaSyA3uAL7xU7p5v58sY5hKlZ68PiP1dZ34fk",
});
