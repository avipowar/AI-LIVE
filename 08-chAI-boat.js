import { checkOpenApi } from "./01-chAI.js";
import readline from "readline";

const client = await checkOpenApi();
const model = "gemini-2.5-flash";

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
    contents: [{ role: "user", parts: [{ text: userQuestion }] }],
  });

  process.stdout.write("Chat Bot: ");

  for await (const message of stream) {
    const delta = message.text;

    if (delta) {
      process.stdout.write(delta);
      //   console.log(delta);
    }
  }
  console.log("\n");
}

rl.close();
