import React, { useState, useContext, useEffect } from 'react';
import { ToastHeader, Toast, ToastBody, Row, Col} from 'reactstrap';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import MessageBar from '../components/MessageBar/MessageBar'
import UsersList from '../components/UsersList/UsersList'
import { SocketContext } from '../contexts/socket';

const axios = require('axios');

function Chat() {
   const [messages, setMessages] = useState([]);
   const [connectedUsers, setConnectedUsers] = useState([]);
   const [lastParticipant, setLastParticipant] = useState({})
   const [lastParticipantLeave, setLastParticipantLeave] = useState({})
   const [showNotificationConnect, setShowNotificationConnect] = useState(false);
   const [showNotificationDisconnect, setShowNotificationDisconnect] = useState(false);
   
   const socket = useContext(SocketContext);

   const getMessages = () => {
      axios.get('http://localhost:8080/messages')
            .then(response => setMessages(response.data))
            .catch(e => {
               console.error(e);
            })
   }

   const getUsersList = () => {
      axios.get('http://localhost:8080/users')
            .then(response => setConnectedUsers(response.data))
            .catch(e => {
               console.error(e);
            })
   }

   useEffect(() => {
      getMessages();
      getUsersList();

      socket.on('newmsg', (msg) => {
         getMessages()
      });

      socket.on('newusr', (usr) => {
         setLastParticipant(usr);
         getUsersList()
         // Show the notification when a new user is connected
         setShowNotificationConnect(true);
         // Hide the notification after a delay
         setTimeout(() => {
            setShowNotificationConnect(false);
         }, 5000)
      });

      socket.on('disconnected', (user) => {
         console.log(user)
         setLastParticipantLeave(user)
         getUsersList();
         setShowNotificationDisconnect(true);

         // Hide the notification after a delay
         setTimeout(() => {
            setShowNotificationDisconnect(false);
         }, 5000)
      })
   }, [socket]);

   return (<div className="Chat">
         <div className="p-3 my-2 rounded">
            <Toast isOpen={showNotificationConnect}>
               <ToastHeader>
                  Nouveau participant &#129489; !
               </ToastHeader>
               <ToastBody>
                  {lastParticipant.username}
               </ToastBody>
            </Toast>
         </div>

         <div className="p-3 my-2 rounded">
            <Toast isOpen={showNotificationDisconnect}>
               <ToastHeader>
                  Déconnexion &#129489; !
               </ToastHeader>
               <ToastBody>
                  Au revoir {lastParticipantLeave.username}
               </ToastBody>
            </Toast>
         </div>

         <Row>
            <Col xs="2" sm="2" md="2">
               <UsersList users={connectedUsers} />
            </Col>
            <Col xs="10" sm="10" md="10">
               <ChatWindow messages={messages} />
               <MessageBar/> 
            </Col>
         </Row>

        </div>)
}

export default Chat;