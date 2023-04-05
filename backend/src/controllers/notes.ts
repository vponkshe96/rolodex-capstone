import { RequestHandler } from "express";
import notesModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//app.get is ROUTE handler, the callback is middleware
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await notesModel.find();
    res.status(200).json(notes);
  } catch (error) {
    //goes to error handling middleware defined in app.ts
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    //check if id is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await notesModel.findById(noteId);
    //to handle case of valid id format but wrong id value which gives note = null
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//to let ts know what title and text type would be in 37
interface CreateNoteBody {
  title?: string;
  text?: string;
}

//unknown safer than any
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      //gets caughts in catch block, if not server will crash
      throw createHttpError(400, "Note MUST have a title!");
    }
    //object short hand notation
    const newNote = await notesModel.create({ title, text });
    res.status(201).json(newNote);
  } catch (error) {
    //client error
    next(error);
  }
};

//to define input types of the function
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNote {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNote,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Updated note MUST have a title!");
    }
    const note = await notesModel.findById(noteId);
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    //all error checks done proceed to update
    note.title = newTitle;
    note.text = newText;
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    //if id doesn't exist then it returns null
    const note = await notesModel.findByIdAndDelete(noteId);
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
