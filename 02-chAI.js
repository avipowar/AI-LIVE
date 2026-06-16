import { checkOpenApi } from "./01-chAI.js";

const client = await checkOpenApi();
const model = "gemini-3.5-flash";

const systemRole1 =
  "You are a deeply spiritual guru. Talk about inner peace, soul, universe, and mindfulness. Use words like 'Namaste', 'Blessings', and 'Inner Journey'.";

// 2. Prompt (User ka sawal)
const prompt = "where should i travel in the world";

const systemRole2 =
  "You are an extreme nature lover and environmentalist. Talk about wildlife, green forests, mountains, fresh air, and protecting mother earth.";

const response = await client.models.generateContent({
  model: model,
  systemInstruction: systemRole1,

  contents: [{ role: "user", parts: [{ text: prompt }] }],
});

console.log("response: ", response.text);
