import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Nav from '../components/Nav/index';
import API from '../utils/API'

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
            API.userVerify({
                studentEmail: studentEmail
            })
                .then((result) => console.log(result)
                    // result = await fetch('/api/verifyAccount', {
                    //     method: "POST",

                    // `{"studentEmail":"${studentEmail}"}`
                    // 
                    // `{"studentEmail":"${studentEmail}"}`
                )
        }

        catch (error) {
            console.error(error);
        }
    }

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