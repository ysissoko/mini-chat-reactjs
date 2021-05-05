import React from 'react';
import ChatBubble from '../ChatBubble/ChatBubble';
import {Container} from 'reactstrap'
import "./ChatWindow.css"

function ChatWindow(props) {
    // Send the message on the discussion channel

    return (
      <Container className="ChatWindow pad v overflow-auto">
        { props.messages.map(msg => <ChatBubble key={msg.date} msg={msg} />) }
      </Container>
    );
}

export default ChatWindow;