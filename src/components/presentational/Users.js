import React from 'react';

const Users = (props) => {

    const { user, onClick } = props;

    return (
        <li
            id={user.googleId}
            key={user.googleId}
            onClick={onClick}
        >
            <img src={user.profile.imageUrl} alt={user.profile.imageUrl} />
            <div>{user.profile.name}</div>
            <div><small>{user.profile.email}</small></div>
        </li>
    );
}

export default Users;