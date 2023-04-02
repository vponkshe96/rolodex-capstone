import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notes";

const app = express();

//To parse/process JSON data sent by client during POST/PUT request
app.use(express.json());
app.use("/api/notes", notesRoutes);

export default app;
