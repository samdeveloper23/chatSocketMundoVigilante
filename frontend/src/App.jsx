import { useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./Chat";
import {
  Container,
  Card,
  CardContent,
  Form,
  FormField,
  Button,
  Icon,
} from "semantic-ui-react";
const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  return (
    <Container>
      <Card fluid>
        <CardContent header="Unirme al chat" />
        <CardContent>
          <Form>
            <FormField>
              <label>Username: </label>
              <input
                type="text"
                placeholder="Isma..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>ID sala</label>
              <input
                type="text"
                placeholder="ID Sala:"
                onChange={(e) => setRoom(e.target.value)}
              />
            </FormField>

            <Button onClick={joinRoom}>Unirme</Button>
          </Form>
        </CardContent>
        <CardContent extra>
          <Icon name="user" />4 Friends
        </CardContent>
      </Card>

      <Chat socket={socket} username={username} room={room} />
    </Container>
  );
}

export default App;

//<h1>hi world!! very happy!!</h1>
