import express from "express";
//preventing line from getting cluttered with too many controller functions
import * as notesController from "../controllers/notes";

const router = express.Router();

router.get("/", notesController.getNotes).post("/", notesController.createNote);
router.get("/:noteId", notesController.getNote);
export default router;
