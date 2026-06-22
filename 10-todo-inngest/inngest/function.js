import { inngest } from "./client.js";
import { auditLog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-created",
    triggers: [{ event: "todo/created" }],
  },
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditLog.push({
        action: "created",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
      });
    });
    console.log("audit: ", auditLog);
    return { ok: true };
  },
);
