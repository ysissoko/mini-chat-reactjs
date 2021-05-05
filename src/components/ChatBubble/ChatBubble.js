import "./ChatBubble.css"
import React, {useEffect, useState} from 'react'
import { useStore } from 'react-redux';
import * as moment from 'moment';

function ChatBubble(props) {
    const store = useStore();
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        async function getCurrentUser()
        {
          setCurrentUser(await store.getState());
        }

        getCurrentUser();
    }, [store]);

    return (
            <div className={(currentUser.id !== props.msg.sender.id) ? "mine messages" : "yours messages"}>
              <div class="message">
                {props.msg.txt}
              </div>
              <cite>{props.msg.sender.username} - {moment(props.msg.date).locale('fr').fromNow()}</cite>
            </div>
    );
}

export default ChatBubble;