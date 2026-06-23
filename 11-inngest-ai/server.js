import "dotenv/config";

import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest-client";

const app = express();
app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [],
  }),
);

const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
