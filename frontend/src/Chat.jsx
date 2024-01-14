import { useEffect, useState } from "react";
import {
    FormField,
    Input,
    Form,
    CardContent,
    Card,
    Container,
    Message,
    MessageHeader,
    Divider,
    Icon
} from "semantic-ui-react";
import ScrollToBottom from "react-scroll-to-bottom";

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
            setCurrentMessage("");
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
                    <ScrollToBottom>
                    <CardContent style={{ maxHeight: "400px" }} />
                    {messagesList.map((item, i) => {
                        return (
                            <spam key={i}>
                                <Message
                                    style={{ textAlign: username === item.author ? 'right' : 'left',
                            }}
                                success={username === item.author}
                                info={username !== item.author}
                                > 
                                    <MessageHeader>{item.message}</MessageHeader>
                                    <p>Enviado por: <strong>{item.author}</strong> a las <i>{item.time}</i></p>
                                    
                                </Message>
                                <Divider />
                            </spam>
                        );
                    })}
                    </ScrollToBottom>
                    

                <CardContent extra>
                    <Form>
                        <FormField >
                            <div className="ui action input ">
                                <Input
                                    action={{
                                        color: "teal",
                                        labelPosition: "right",
                                        icon: "send",
                                        content: "Enviar",
                                        onClick: sendMessage,
                                    }}
                                    value={currentMessage}
                                    type="text"
                                    placeholder="Mensaje..."
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPres={(e) => {
                                        if (e.key === "Enter")
                                        sendMessage();
                                    }} />
                            </div>
                        </FormField>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
};


export default Chat;