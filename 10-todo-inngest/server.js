import "dotenv/config";
import express from "express";
import { createTodo, updateTodo, deleteTodo, todos } from "./store.js";
import { serve } from "inngest/express";
import { onTodoCreated, onTodoDeleted } from "./inngest/function.js";
import { inngest } from "./inngest/client.js";

const app = express();
app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated, onTodoDeleted],
  }),
);

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });
  const todo = createTodo(title);
  // call event
  await inngest.send({
    name: "todo/created",
    data: { todo },
  });
  res.status(201).json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id: ", id);
  console.log("todos: ", todos);

  const todo = deleteTodo(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  await inngest.send({
    name: "todo/deleted",
    data: { todo },
  });

  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
