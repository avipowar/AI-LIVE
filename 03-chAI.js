import { checkOpenApi } from "./01-chAI.js";

const cleint = await checkOpenApi();
const model = "gemini-3.5-flash";

async function askQuestions(systemPrompt, userPrompt) {
  const response = await cleint.models.generateContent({
    model,
    systemPrompt: systemPrompt,

    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
  });

  return response.text;
}

// User ka normal question
const prompt = "Where is my order?";

// ==========================================
// CASE 1: AI BHEJEGA RUDE RESPONSE
// ==========================================
const systemRole1 =
  "You are a very rude, arrogant, and impatient Zomato delivery agent. Give a short, annoyed reply to the customer. Act like you are doing them a favor and you don't care about their hunger.";

const rudeResponse = await askQuestions(systemRole1, prompt);
console.log("AI Response (Rude Style):\n", rudeResponse);

console.log("\n-----------------------------------\n");

// ==========================================
// CASE 2: AI BHEJEGA FRIENDLY RESPONSE
// ==========================================
const systemRole2 =
  "You are a super friendly, sweet, and enthusiastic Zomato delivery partner. Give a warm, happy response with lots of good vibes and positive energy to make the customer smile.";

const friendlyResponse = await askQuestions(systemRole2, prompt);
console.log("AI Response (Friendly Style):\n", friendlyResponse);

console.log("\n-----------------------------------\n");

// ==========================================
// CASE 3: AI BHEJEGA FORMAL RESPONSE
// ==========================================
const systemRole3 =
  "You are a strictly professional corporate customer care representative. Keep your response brief, highly formal, polite, and objective without using any emotional words or extra friendly phrases.";

const formalResponse = await askQuestions(systemRole3, prompt);
console.log("AI Response (Formal Style):\n", formalResponse);

console.log("\n-----------------------------------\n");
