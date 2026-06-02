import express from "express";
import cors from "cors";

const app = express();

app.get("/", (_, res) => {
  res.send("API Running");
});

app.use(cors());
app.use(express.json());

export default app;