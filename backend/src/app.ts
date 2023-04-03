import "dotenv/config";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";

const app = express();

//good to log request info in production
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/notes", notesRoutes);

//accessing unknown endpoints
app.use((req, res, next) => next(new Error("Endpoint not found!")));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //good to log errors in production
  console.error(error);
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
