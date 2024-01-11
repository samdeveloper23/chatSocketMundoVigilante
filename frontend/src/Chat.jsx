import { useEffect, useState } from "react";

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
    <div>
        <section className="chat-header">
            <p>Chat MundoVigilante</p>
        </section>
        <section className="chat-messages">

        </section>
        <section className="chat-footer">
            <input type="text" placeholder="Mensaje..."
            onChange={(e) => setCurrentMessage(e.target.value)}
             />
            <button onClick={sendMessage}>Enviar &#9658;</button>
        </section>
    </div>
  )
}

export default Chat;