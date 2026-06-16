import { checkOpenApi } from "./01-chAI.js";

const cleint = await checkOpenApi();
const model = "gemini-3.5-flash";

async function askQuestions(systemPromt, userPromt) {
  const response = await cleint.models.generateContent({
    model,
    systemPromt: systemPromt,

    contents: [{ role: "user", parts: [{ text: userPromt }] }],
  });

  return response.text;
}

const userPromt1 = "my name is avinash tell me a one line joke";
const systemPromt1 = "You always respond in 1 line";

const oneLineRes = await askQuestions(systemPromt1, userPromt1);

console.log("++++++++++++ one line response: ++++++++++++++++++");
console.log(oneLineRes);

const userPromt2 = "what is my name";

const nameRes = await askQuestions(systemPromt1, userPromt2);

console.log("++++++++++++ nameRes: ++++++++++++++++++");
console.log(nameRes);
