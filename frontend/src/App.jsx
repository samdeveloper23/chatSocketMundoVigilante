import { useState } from 'react';
import './App.css'

import io from 'socket.io-client';
import Chat from './Chat';
import { Container, Card, CardContent, Form, FormField, Button, Icon  } from 'semantic-ui-react';
const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
      socket.emit("join_room", room);
    
  }

  return (
    <Container>
      <Card fluid>
      <CardContent header='Unirme al chat' />
      <CardContent >
        <Form>
          <FormField>
            <label>First Name</label>
            <input placeholder='First Name' />
          </FormField>
          <FormField>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </FormField>
          
          <Button type='submit'>Submit</Button>
        </Form>
      </CardContent >
      <CardContent extra>
      <Icon name='user' />4 Friends
      </CardContent>
    </Card>
      <div className='joinchatContainer'>
        
        <input type="text" placeholder='Isma...'
          onChange={(e) => setUsername(e.target.value)} />

        <input type="text" placeholder='ID Sala:'
          onChange={(e) => setRoom(e.target.value)} />

        <button onClick={joinRoom}>Unirme</button>
        <Chat socket={socket} username={username} room={room} />

      </div>
    </Container>
  )
  }

export default App

//<h1>hi world!! very happy!!</h1>
