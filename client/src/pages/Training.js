import React, { useState, useEffect, useContext } from 'react';
import Input from '../components/Input';
import Nav from '../components/Nav/index';
import API from '../utils/API'
import UserContext from '../utils/UserContext';
import Table from '../components/Table/index';


const Training = () => {

    const [studentEmail, setStudentEmail] = useState("");
    const [invalidSubmission, setInvalidSubmission] = useState(false);
    const [students, setStudents] = useState({
        ids: [],
        flights: []
    })
        const [modal, setModal] = useState({
        open: false,
        values: []
    });
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
                                            if (!(loggedInUser.data.id === matchingStudent.data[0].id)) {
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
                const mapped = data.map(x => ({
                    studentId: x.studentID,
                }))
                setStudents(student => ({
                    ...student,
                    mapped
                }))
            })
            .catch(err => console.log(err))
    }

    const getStudentFlights = async () => {
        API.getFlights(await students.mapped[0].studentId)
            .then((res) => {
                console.log('res', res)
                const mapped = res.data.map(x => ({
                    Date: x.date,
                    Aircraft: x['Aircraft.tailNumber'],
                    Route: x.route,
                    Comments: x.comments,
                    Total: x.total,
                    id: x.id
                }))
                setStudents(state => ({
                    ...state,
                    flights: mapped
                }))
            })
            .catch(err => {
                console.log(err)
            });
    }

    // const openModal = e => {
    //     e.preventDefault();
    //     const { target } = e;

    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open,
    //         values: state.fullResults.find(x => parseInt(x.id) === parseInt(target.id))
    //     }))
    // };

    // const openEdit = id => {

    //     const selected = state.fullResults
    //         .find(x => parseInt(x.id) === id)
    //     const newLog = {}

    //     if (!selected) return;
    //     Object.keys(logbookForm).forEach(key => { newLog[key] = selected[key] })
    //     setlogbookForm(newLog)
    //     getAircraftTypes()


    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open
    //     }))
    //     setState({
    //         ...state,
    //         open: true,
    //         btnClicked: 'editBtn'
    //     })
    //     window.scrollTo(0, 0)
    // }

    // const deleteBtn = id => {
    //     // hit the delete flight route
    //     API.deleteFlight(id)
    //         .then(getStudentFlights())
    //         .catch(err => console.log(err))
    //     // closes modal after flight is deleted
    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open
    //     }))
    // }

    console.log(user)
    console.log(students.mapped[0])
    return (
        <>
            {/* {
                (modal.open && !!modal.values) &&

                <Modal
                    key={modal.values.id}
                    results={modal.values}
                    openEdit={openEdit}
                    deleteBtn={deleteBtn}
                    handleClick={e => {
                        e.preventDefault();
                        setModal(state => ({
                            ...state,
                            open: !modal.open
                        }))
                    }}
                />

            } */}
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
                <button
                    onClick={() => {
                        getStudentFlights();
                        console.log(students)
                    }}>
                    Student Table
                </button>
            </main>
            {
                !!students.flights.length &&
            <Table
                flights={students.flights} />
            }
        </>
    );
};


export default Training;