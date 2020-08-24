import React from 'react';
import { Redirect, BrowserRouter, Route, Link } from 'react-router';
// import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// var Router = require('react-router');
// import Input from '../components/Input';
// import Nav from '../components/Nav/index';
import API from '../utils/API'
// const express = require('express');
// const path = require('path')
// const sequelize = require("sequelize");
// import React, { useState, useEffect, Component } from 'react';
// import Input from '../components/Input';
// import Nav from '../components/Nav/index';
// import API from '../utils/API'
// import { Router } from 'express';

 const Validate  = (props) => {
    // console.log(props.match.params.key)
    API.userAccess({
        key: props.match.params.key,
        ID: props.match.params.studentID
    })
   
        
        console.log("validate.js line 26-key", props.match.params.key)
        console.log("validate.js line 27-ID", props.match.params.studentID)
        return(
            <h1>Your connection to this user has been verified! You can now close this window.</h1>
            // <Redirect to="/logbook" />
        );
        
    

}

export default Validate