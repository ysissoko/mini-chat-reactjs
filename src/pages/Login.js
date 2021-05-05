import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from 'react-redux';
import { Button, FormGroup, Input, Col, Label } from 'reactstrap';
import { SocketContext } from '../contexts/socket';

function Login() {
    const store = useStore();
    let [username, setUsername] = useState("");
    const socket = useContext(SocketContext);
    const history = useHistory();

    useEffect(() => {
        store.subscribe(() => {
            console.log("subscribe")
            history.push('chat')
        })
    }, [history, store])

    let connect = () => {
        console.log("connect")
        // Generate a unique uuid identifying the user with uuid v4
        const payload = {username: username, id: socket.id};
        socket.emit('newusr', payload)
        store.dispatch({
            type: 'LOGIN',
            payload: payload
        });
   }

   return (<div>
       <h1>Mini chat</h1>
        <FormGroup row={true}>
            <Col><Input placeholder="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></Col>
            <Col><Button onClick={connect} disabled={username === ""}>Connexion</Button></Col>
        </FormGroup>
   </div>)
}

export default Login;