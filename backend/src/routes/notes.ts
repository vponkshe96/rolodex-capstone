import express from "express";
//preventing line from getting cluttered with too many controller functions
import * as notesController from "../controllers/notes";

const router = express.Router();

//can chain requests to same endpoints together but not readable as below
router.get("/", notesController.getNotes);

router.get("/:noteId", notesController.getNote);

router.post("/", notesController.createNote);

router.patch("/:noteId", notesController.updateNote);

router.delete("/:noteId", notesController.deleteNote);

export default router;
