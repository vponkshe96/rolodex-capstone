import { RequestHandler } from "express";
import notesModel from "../models/note";

export const getNotes: RequestHandler = async (req, res) => {
  try {
    //append .exec to return a promise
    const notes = await notesModel.find();
    //sending notes in json format
    //successful request
    res.status(200).json(notes);
  } catch (err) {
    //err is an object with message property
    //adding as Error for ts
    //server error
    res.status(500).json((err as Error).message);
  }
};

export const createNote: RequestHandler = async (req, res) => {
  try {
    const { title, text } = req.body;
    //object short hand notation
    const newNote = await notesModel.create({ title, text });
    console.log(title, text);
    //new resources created
    res.status(201).json(newNote);
  } catch (err) {
    //client error
    res.status(400).json((err as Error).message);
  }
};
