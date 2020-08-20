import React, { createContext }from 'react';

const User = createContext({
    email: '',
    userId: ''
})

export default User;