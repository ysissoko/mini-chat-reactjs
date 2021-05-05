import React, { useContext, useState } from 'react';
import { useStore } from 'react-redux';
import "./MessageBar.css"
import { Button, FormGroup, Input, Col} from 'reactstrap';
import { SocketContext } from "../../contexts/socket";

function MessageBar() {
    let [msg, setMsg] = useState("");
    const socket = useContext(SocketContext);
    const store = useStore();
    // Send the message on the discussion channel
    const send = () => {
        store.getState().then(currentUsr => {
          socket.emit('newmsg', {date: Date.now(), sender: currentUsr, txt: msg});
          setMsg("")
        })
    }

    return (
            <FormGroup row={true}>
                <Col><Input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}/></Col>
                <Col><Button onClick={send} disabled={msg === ""}>Envoyer</Button></Col>
            </FormGroup>
        );
}

export default MessageBar;