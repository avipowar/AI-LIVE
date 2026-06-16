import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export const apikeyChecker = () => {
  if (!API_KEY) {
    console.error(
      "Error: GEMINI_API_KEY is not set in the environment varaibles.",
    );
    process.exit(1);
  }
};

export const checkOpenApi = async () => {
  apikeyChecker();

  const { GoogleGenAI } = await import("@google/genai");
  const client = new GoogleGenAI({ apiKey: API_KEY });

  if (!client) {
    console.error("Error: Failed to initialized GoogleGenAi Client.");
    process.exit(1);
  }
  console.log("GoogleGenAi client intalized successfully");
  return client;
};
 