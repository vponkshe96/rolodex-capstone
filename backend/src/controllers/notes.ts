import { RequestHandler } from "express";
import notesModel from "../models/note";

//app.get is ROUTE handler, the callback is middleware
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await notesModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await notesModel.findById(noteId);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    //object short hand notation
    const newNote = await notesModel.create({ title, text });
    res.status(201).json(newNote);
  } catch (error) {
    //client error
    next(error);
  }
};
