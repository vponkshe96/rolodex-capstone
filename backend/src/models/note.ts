import { InferSchemaType, model, Schema } from "mongoose";

//defining db structure
const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String},
  },
  { timestamps: true }
);

//defining ts type
type Note = InferSchemaType<typeof noteSchema>;

//creating Notes collection on atlas ie. db
//creating model of type note to interface b/w code and collection
export default model<Note>("Note", noteSchema);
