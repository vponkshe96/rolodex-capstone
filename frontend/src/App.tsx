import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import axios from "axios";
import Note from "./components/note/Note";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  //specifies that notes is an array of NoteModel objects
  const [notes, setNotes] = useState<NoteModel[]>([]);
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/notes");
        const { data } = response;
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    loadNotes();
  }, []);
  return (
    <div className="App">
      {/* bootstrap grid system, uses flexbox */}
      <Container>
        {/* how many rows based on screen size */}
        {/* default bootstrap class for spacing */}
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => {
            return <Col key={note._id}>
               <Note note={note} key={note._id} />
            </Col>;
          })}
        </Row>
      </Container>
    </div>
  );
};
export default App;
