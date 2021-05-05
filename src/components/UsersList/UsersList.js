import React from 'react';

function UsersList(props) {
    return ( <ul className="list-group">
            {props.users.map(user => <li key={user.id} className="list-group-item">{user.username}</li>)}
        </ul>);
}

export default UsersList;