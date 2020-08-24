import React, { useState, useEffect, useContext } from 'react';
import Input from '../components/Input';
import Nav from '../components/Nav/index';
import API from '../utils/API'


const Training = () => {

    const [studentEmail, setStudentEmail] = useState("");
    const [invalidSubmission, setInvalidSubmission] = useState(false);
    const [students, setStudents] = useState({
        ids: [],
        flights: []
    })
    const user = useContext(UserContext)

    useEffect(() => {
        getStudents();
        if (studentEmail && invalidSubmission) setInvalidSubmission(false);
    }, [studentEmail])

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!studentEmail) {
            return setInvalidSubmission(true); // render an error message
        }
        try {

            // Find if the entered email address is already in the database
            API.userVerify({
                studentEmail: studentEmail
            })
                .then(function (matchingStudent) {
                    // If the email address entered corresponds to active user account
                    if (matchingStudent.data[0]) {

                        // Find current logged in user
                        API.userData({
                        })
                            .then(function (loggedInUser) {
                                // Find if the logged in user already has access to the entered student account
                                API.checkDuplicates({
                                    instructorID: loggedInUser.data.id,
                                    studentID: matchingStudent.data[0].id
                                })
                                    .then(function (DuplicateAccess) {
                                        // If a duplicate is not found
                                        if (!DuplicateAccess.data[0]) {
                                            console.log("line 45", loggedInUser.data.id)
                                            console.log("line 45", matchingStudent.data[0].id)

                                            // If the user didn't enter their own email address
                                            if(!(loggedInUser.data.id === matchingStudent.data[0].id)){
                                                // Send an authentication email to the email address typed in
                                                API.sendMail({
                                                    "email": matchingStudent.data[0].email,
                                                    "ID": matchingStudent.data[0].id,
                                                    "user": loggedInUser
                                                })
                                            }
                                            else {
                                                console.log("You have entered your own email address")
                                            }
                                        }
                                        else {
                                            console.log("You already have access to this student")
                                        }

                                    })

                            })

                    }
                    else {
                        console.log("This student needs to create an account first")
                    }
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    // grab students associated with the instructor
    const getStudents = () => {
        API.getStudents(user.userId)
            .then(({ data }) => {
                console.log(data)
                // const mapped = data.map(x=> ({
                //     studentId: x.studentID,
                // }))
                // setStudents()
            })
            .catch(err => console.log(err))
    }

    // const getStudentFlights = () => {

    // }

    console.log(user)
    return (
        <>
            <Nav />
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