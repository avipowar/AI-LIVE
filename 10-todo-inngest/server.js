import "dotenv/config";
import express from "express";
import { createTodo, updateTodo, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { onTodoCreated } from "./inngest/function.js";
import { inngest } from "./inngest/client.js";

const app = express();
app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated],
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

  const todo = deleteTodo(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
