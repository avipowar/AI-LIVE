import { checkOpenApi } from "./01-chAI.js";

const client = await checkOpenApi();
const model = "gemini-3.5-flash";

const response = await client.models.generateContent({
  model: model,
  systemInstruction:
    "You are a helpful assistant that provides information about the Gemini API and travel.",

  contents: [
    { role: "user", parts: [{ text: "where should i travel in the world" }] },
  ],
});

console.log("response: ", response.text);
