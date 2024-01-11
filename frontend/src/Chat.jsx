import { useEffect, useState } from "react";
import {FormField, Input, Form, Button, CardContent, Card, Container, Icon } from 'semantic-ui-react'

const Chat = ({socket, username, room}) => {

    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date(Date.now()).getHours()+
                ":"+
                new Date(Date.now()).getMinutes(),
            };
            console.log(info);
            await socket.emit('send_message', info);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        })
    },[socket]);

  return (
    <Container>
        <Card fluid>
            <CardContent header='Chat MundoVigilante' />
            <CardContent >
                Mensajes
            </CardContent>

            <CardContent extra>
                <Form>
                        <FormField>
                        <Input
                            action={{
                                color: "teal",
                                labelPosition: "right",
                                icon: "send",
                                content: "Enviar",
                                onclick: sendMessage,
                            }} 
                            type="text"
                            placeholder="Mensaje..."
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                    </FormField>
                </Form>  
            </CardContent>
        </Card>
    </Container>
  )
};

export default Chat;