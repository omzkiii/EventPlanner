import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
