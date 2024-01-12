import { useEffect, useState } from "react";
import {
    FormField,
    Input,
    Form,
    CardContent,
    Card,
    Container,
    Message,
    MessageHeader
} from "semantic-ui-react";

export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            console.log(info);
            console.log("hola caracola");

            await socket.emit("send_message", info);
            setMessagesList((list) => [...list, info]);
        }
    };

    useEffect(() => {
        const messageHandle = (data) => {
            setMessagesList((list) => [...list, data]);
        };

        socket.on("receive_message", messageHandle);

        return () => socket.off("receive_message", messageHandle);
    }, [socket]);

    return (
        <Container>
            <Card fluid>
                <CardContent header={`Chat MundoVigilante | En sala: ${room}`} />
                <CardContent style={{ minHeight: "300px" }} />
                {messagesList.map((item, i) => {
                    return (
                        <spam key={i}>
                            <Message style={{ textAlign: username === item.author ? 'right' : 'left' }}> 
                                <MessageHeader>{item.author}</MessageHeader>
                                <p>{item.message}</p>
                                <i>{item.time}</i>
                            </Message>
                        </spam>
                    );
                })}

                <CardContent extra>
                    <Form>
                        <FormField>
                            <Input
                                action={{
                                    color: "teal",
                                    labelPosition: "right",
                                    icon: "send",
                                    content: "Enviar",
                                    onClick: sendMessage,
                                }}
                                type="text"
                                placeholder="Mensaje..."
                                onChange={(e) => setCurrentMessage(e.target.value)} />
                        </FormField>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
};


export default Chat;