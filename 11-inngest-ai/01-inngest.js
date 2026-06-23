import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "chai-on-order-placed",
    retries: 2,
    triggers: [{ event: "chai.order.placed" }],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data;

    const greeting = await step.run("greet", async () => {
      return `Hello ${customer}! Thanks for your order ${orderId}`;
    });

    await step.run("log-greeting", async () => {
      console.log("greeting: ", greeting);
    });

    return { ok: true, greeting };
  },
);
