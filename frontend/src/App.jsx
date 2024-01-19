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
    if (username !== "" && room !== "") {
        socket.emit("join_room", room);   
        setShowChat(true);
  }
  };
  return (
    <Container>
      {!showChat?(
        <Card fluid>
        <CardContent header="Unirme al chat" />
        <CardContent>
          <Form>
            <FormField>
              <label>Username: </label>
              <input
                type="text"
                placeholder="uername..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormField>
            
            <FormField>
              <label>ID sala:</label>
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
          <Icon name="user" />4 Friendspsicologia oscura
        </CardContent>
      </Card>
      ) : (
      <Chat socket={socket} username={username} room={room} />
      )}
    </Container>
  );
}

export default App;

//<h1>hi world!! very happy!!</h1>
/**
 *  Pero que bien vivo viendo codear!
 *            __..--''``---....___   _..._    __
 *        _.-'    .-/";  `        ``<._  ``.''_ `.
 *    _.-' _..--.'_    \                    `( ) )
 *   (_..-'    (< _     ;_..__               ; `'
 *             `-._,_)'      ``--...____..-'
 */
/**                     ;,_            ,
*                   _uP~"b          d"u,
*                  dP'   "b       ,d"  "o
*                 d"    , `b     d"'    "b
*                l] [    " `l,  d"       lb
*                Ol ?     "  "b`"=uoqo,_  "l
*              ,dBb "b        "b,    `"~~TObup,_
*            ,d" (db.`"         ""     "tbc,_ `~"Yuu,_
*          .d" l`T'  '=                      ~     `""Yu,
*        ,dO` gP,                           `u,   b,_  "b7
*       d?' ,d" l,                           `"b,_ `~b  "1
*     ,8i' dl   `l                 ,ggQOV",dbgq,._"  `l  lb
*    .df' (O,    "             ,ggQY"~  , @@@@@d"bd~  `b "1
*   .df'   `"           -=@QgpOY""     (b  @@@@P db    `Lp"b,
*  .d(                  _               "ko "=d_,Q`  ,_  "  "b,
*  Ql         .         `"qo,._          "tQo,_`""bo ;tb,    `"b,
* (qQ         |L           ~"QQQgggc,_.,dObc,opooO  `"~~";.   __,7,
* `qp         t\io,_           `~"TOOggQV""""        _,dg,_ =PIQHib.
*  `qp        `Q["tQQQo,_                          ,pl{QOP"'   7AFR`
*    `         `tb  '""tQQQg,_             p" "b   `       .;-.`Vl'        HOLA!!!!!!!!
*               "Yb      `"tQOOo,__    _,edb    ` .__   /`/'|  |b;=;.__
*                             `"tQQQOOOOP""        `"\QV;qQObob"`-._`\_~~-._
*                                  """"    ._        /   | |oP"\_   ~\ ~\_  ~\
*                                          `~"\ic,qggddOOP"|  |  ~\   `\  ~-._
*                                            ,qP`"""|"   | `\ `;   `\   `\
*                                 _        _,p"     |    |   `\`;    |    |
*                                  "boo,._dP"       `\_  `\    `\|   `\   ;
*                                   `"7tY~'            `\  `\    `|_   |
*                                                            `~\  |*/
