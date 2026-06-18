import { checkOpenApi } from "./01-chAI.js";

const client = await checkOpenApi();
const model = "gemini-2.5-flash";

const conversations = [];

async function askQuestions(systemPrompt, userPrompt, history = []) {
  const response = await client.models.generateContent({
    model,
    systemPrompt: systemPrompt,
    contents: [...history, { role: "user", parts: [{ text: userPrompt }] }],
  });

  history.push({ role: "user", parts: [{ text: userPrompt }] });
  history.push({ role: "model", parts: [{ text: response.text }] });

  return response.text;
}

const userQuestion =
  "My name is Avinash and I love coding, tell me a 1 line joke";

const response1 = await askQuestions(
  "You always respond in 1 line",
  userQuestion,
  conversations,
);

console.log("++++++++++ Response 1: ++++++++++");
console.log(response1);

console.log("\n-----------------------------------\n");

const userQuestion2 = "Tell me my Name";

const response2 = await askQuestions(
  "You always respond in 1 line",
  userQuestion2,
  conversations,
);

console.log("++++++++++ Response 2: ++++++++++");
console.log(response2);
