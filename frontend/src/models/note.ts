//all types within interface are strings since backend sends us json object with strings
export interface Note {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}
