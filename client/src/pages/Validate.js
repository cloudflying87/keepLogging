import React from 'react';
import { Redirect, BrowserRouter, Route, Link } from 'react-router';
import API from '../utils/API'


 const Validate  = (props) => {
    // console.log(props.match.params.key)
    API.userAccess({
        key: props.match.params.key,
        ID: props.match.params.studentID
    })
        console.log("validate.js line 26-key", props.match.params.key)
        console.log("validate.js line 27-ID", props.match.params.studentID)
        return(
            <h1>Your connection to this user has been verified! You can now close this tab.</h1>
            // <Redirect to="/logbook" />
        );
}

export default Validate