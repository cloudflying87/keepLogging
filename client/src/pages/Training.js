import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Nav from '../components/Nav/index';
import API from '../utils/API'
// import SMTP from '../utils/SMTP'
import randomstring from 'randomstring'
// const sendmail = require('sendmail')();



const Training = () => {

    const [studentEmail, setStudentEmail] = useState("");
    const [invalidSubmission, setInvalidSubmission] = useState(false);

    useEffect(() => {
        if (studentEmail && invalidSubmission) setInvalidSubmission(false);
    }, [studentEmail])

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(studentEmail)
        if (!studentEmail) {

            return setInvalidSubmission(true); // render an error message
        }
        try {
            var random = randomstring.generate()

            // Find if the entered email address is already in the system
            API.userVerify({
                studentEmail: studentEmail
            })
                .then(function (matchingStudent) {
                    console.log("Matching user", matchingStudent)

                    // Find current logged in user
                    API.userData({
                    })
                        .then(function (loggedInUser) {
                            console.log("Logged in user", loggedInUser)

                            API.sendMail({
                                "email": studentEmail,
                                "user": loggedInUser
                            })


                            // API.userAccess({
                            // })
                            //     .then(function (random, loggedInUser) {
                            //         console.log("Logged in user", loggedInUser)
                            //         console.log("random", random)
                            //     })
                        })
                        .catch(error => (console.log(error)))

                })

        }
        catch (error) {
            console.error(error);
        }

        // Set email as a variable
        // Add a random key to the logged in user's profile
        // Send the email with the same random key
        // When they click on the key it changes the key in the user's profile back to the students email address
    }

    return (
        <>
            <Nav/>
            <main>
                <form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        id="student-email-input"
                        placeholder="Student Email"
                        label="Student Email"
                        handleInputChange={({ target: { value } }) => setStudentEmail(value)}
                    />
                    <button id='add-student' type="submit" >
                        Add Student
                </button>
                </form>
                {invalidSubmission && (<div>Please enter a valid email</div>)}
            </main>
        </>
    );


};


export default Training;