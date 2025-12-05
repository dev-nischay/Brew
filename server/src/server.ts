import express from "express";
const app = express();
import type { Request, Response, NextFunction } from "express";

app.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {}
});

app.listen(3000, () => {
  console.log("App running at 3000");
});
