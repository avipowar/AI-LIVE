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

export const onTodoDeleted = inngest.createFunction(
  {
    id: "on-todo-deleted",
    retries: 2,
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, attempt }) => {
    const id = event.data.todo.id;

    await step.run("cleanup", async () => {
      if (attempt === 0) {
        throw new Error(`Failed to clean up after deleting todo ${id}`);
      }
      return "cleaned up successfully";
    });

    await step.run("audit", async () => {
      auditLog.push({ action: "deleted", todoId: id });
    });
    console.log("audit: ", auditLog);
    return { ok: true };
  },
);
