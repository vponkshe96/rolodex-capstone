import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../../models/note";
import "./note.css";
interface NoteProps {
  note: NoteModel;
}

//react functional component receives props in the shape NoteProps
const Note: React.FC<NoteProps> = ({ note }) => {
  const { title, text, createdAt, updatedAt } = note;
  return (
    <Card className="noteCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="cardText">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Note;
