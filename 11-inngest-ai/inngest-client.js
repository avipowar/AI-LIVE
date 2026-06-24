import "dotenv/config";
import { Inngest } from "inngest";
import { gemini } from "@inngest/ai/models";

export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});
