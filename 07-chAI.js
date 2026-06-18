import { checkOpenApi } from "./01-chAI.js";

const client = await checkOpenApi();
const model = "gemini-2.5-flash";

const stream = await client.models.generateContentStream({
  model,
  systemInstruction:
    "You are a helpful assistant that responds in exactly 5 lines.",
  contents: [
    {
      role: "user",
      parts: [
        {
          text: "What is latest in AI? Give me ONLY a 5-line summary. Do not write more than 5 lines strictly.",
        },
      ],
    },
  ],
});

let last_chunk = "";

for await (const message of stream) {
  const delta = message.text;

  if (delta) {
    process.stdout.write(delta);
    last_chunk += delta;
  }
}

console.log("\n\n=========================================");
console.log("🟢 TOTAL COLLECTED LAST_CHUNK:\n");
console.log(last_chunk);
console.log("=========================================");
