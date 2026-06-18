import { checkOpenApi } from "./01-chAI.js";
import readline from "readline";

const client = await checkOpenApi();
const model = "gemini-2.5-flash";

const conversations = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemPrompt = "You are a helpful assistant that responds in 5 line.";

function askQuestion(userPrompt) {
  return new Promise((resolve) => {
    rl.question(userPrompt, (answer) => {
      resolve(answer);
    });
  });
}

while (true) {
  const userQuestion = await askQuestion("Ask a question: ");

  console.log("answering....");
  if (userQuestion.toLowerCase() === "exit") {
    console.log("Exiting....");
    break;
  }

  const stream = await client.models.generateContentStream({
    model,
    stream: true,
    systemInstruction: systemPrompt,
    contents: [
      ...conversations,
      { role: "user", parts: [{ text: userQuestion }] },
    ],
  });

  process.stdout.write("Chat Bot: ");

  let last_chunk = "";
  for await (const message of stream) {
    const delta = message.text;

    if (delta) {
      process.stdout.write(delta);
      last_chunk += delta;
    }
  }

  // Save conversation history for memory so the model can remember previous context (user + model messages)
  conversations.push({ role: "user", parts: [{ text: userQuestion }] });
  if (last_chunk.trim()) {
    conversations.push({
      role: "model",
      parts: [{ text: last_chunk }],
    });
  }

  console.log("\n");
}

rl.close();
