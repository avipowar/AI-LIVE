import { checkOpenApi } from "./01-chAI.js";
import { calculator, calculateTool } from "./tools/calculator.js";

const client = await checkOpenApi();
const model = "gemini-3.5-flash";

const geminiSchema = {
  name: "calculator",
  description: calculateTool.function.description,
  parameters: {
    type: "OBJECT",
    properties: {
      op: {
        type: "STRING",
        enum: calculateTool.function.parameters.properties.op.enum,
        description: "The arithmetic operation to perform",
      },

      a: { type: "NUMBER" },
      b: { type: "NUMBER" },
    },
    required: calculateTool.function.parameters.required,
  },
};

const messages = [
  {
    role: "user",
    parts: [{ text: "what is result of adding 23 and 54" }],
  },
];

// first call for the identify correct tool
const firstResponse = await client.models.generateContent({
  model,
  contents: messages,
  config: {
    tools: [{ functionDeclarations: [geminiSchema] }],
    toolConfig: {
      functionCallingConfig: {
        mode: "ANY",
        allowedFunctionNames: ["calculator"],
      },
    },
  },
});

console.log("++++++++++ First Response: ++++++++++");
const assistantMessage = firstResponse.candidates[0].content;
console.log(JSON.stringify(assistantMessage, null, 2));

const functionCallPart = assistantMessage.parts.find(
  (part) => part.functionCall,
);
console.log("🟢 Tool Calls Found:", functionCallPart?.functionCall);

messages.push(assistantMessage);

if (functionCallPart && functionCallPart.functionCall) {
  const toolCall = functionCallPart.functionCall;

  const toolResult = await calculator(toolCall.args);

  console.log("++++++++++ Tool Response: ++++++++++");
  console.log("Result from your function:", toolResult);

  messages.push({
    role: "tool",
    parts: [
      {
        functionResponse: {
          name: toolCall.name,
          response: { result: toolResult },
        },
      },
    ],
  });

  // Second Call for Final Answer
  const secondResponse = await client.models.generateContent({
    model,
    contents: messages,
    config: {
      tools: [{ functionDeclarations: [calculateTool] }],
    },
  });

  console.log("++++++++++ Final Response: ++++++++++");
  console.log(secondResponse.text);
}
