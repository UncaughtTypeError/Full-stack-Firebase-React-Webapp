import React from 'react';

const UserGreeting = (props) => {

    const { imageUrl, name, role, laptopsNum, monitorsNum, isUser } = props;

    return (
        <div data-role={role}>
            <img src={imageUrl} alt={name} /> Welcome {name}
            { isUser && (laptopsNum  > 0 && monitorsNum > 0) ? (
                <p>You have <strong>{laptopsNum} Laptop/s</strong> and <strong>{monitorsNum} Monitor/s</strong> assigned to your account.</p>
            ) : (
                <p>You have no devices assigned to your account.</p>
            )}
        </div>
    );

}

export default UserGreeting;