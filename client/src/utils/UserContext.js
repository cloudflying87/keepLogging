import React, { createContext } from 'react';

const UserContext = createContext({
    userId: JSON.parse(localStorage.getItem('userId'))
});

export default UserContext;