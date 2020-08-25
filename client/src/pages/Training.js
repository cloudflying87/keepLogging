import React, { useState, useEffect, useContext } from 'react';
import Input from '../components/Input';
import Button from '../components/Button/'
import Nav from '../components/Nav/index';
import API from '../utils/API'
import UserContext from '../utils/UserContext';
import Table from '../components/Table/';
import Model from '../components/Modal/';
import AddStudent from '../components/AddStudent/studentEmail';
import SelectStudent from '../components/AddStudent/studentDropDown';

const Training = () => {
    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        userCurrentAircraft: [],
        tailNumber: '',
        modelId: 0
    });
    const [studentEmail, setStudentEmail] = useState("");
    const [invalidSubmission, setInvalidSubmission] = useState(false);
    const [students, setStudents] = useState({
        ids: [],
        studentEmail: '',
        flights: [],
        errorMessage: ''
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
        
        // if (!studentEmail) {
        //     return setInvalidSubmission(true); // render an error message
        // }
        try {

            // Find if the entered email address is already in the database
            const emailCheck = students.studentEmail
            API.userVerify({
                emailCheck
            })
                .then(function (matchingStudent) {
                    // If the email address entered corresponds to active user account
                    console.log(students.studentEmail)
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
                                                setStudents(students => ({
                                                    ...students,
                                                    errorMessage: ('You have entered your own Email.')
                                                }))
                                            }
                                        }
                                        else {
                                            setStudents(students => ({
                                                ...students,
                                                errorMessage: ('You already have access to this student')
                                            }))
                                        }

                                    })

                            })

                    }
                    else {
                        setStudents(students => ({
                            ...students,
                            errorMessage: ('This student needs to create an account first')
                        }))
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

    const getStudentFlights = async (e) => {
        e.preventDefault()
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
    const openAccordion = e => {
        const { target } = e
        setState(state => ({
            ...state,
            open: !state.open,
            btnClicked: target.id
        }))
    }

    const handleFormInput = ({ target: { value, name } }) => {
        setStudents(students => ({
            ...students,
            [name]: value
        }))
        console.log(students)
    };
    const switchFunc = arg => {
        switch (arg) {
            case 'addStudent':
                return (
                    <>
                        <AddStudent
                            handleFormInput={handleFormInput}
                            addT={onSubmit}
                            value={students}
                        />
                    </>
                )
            case 'selectStudent':
            return (
                    <>
                        <SelectStudent
                            handleFormInput={handleFormInput}
                            addT={getStudentFlights}
                            data={students}
                        />
                    </>
                )
            default:
                break;
        };
    };

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
            <div className='menuDiv'>
                <Button
                    text='Add Student'
                    btnId='addStudent'
                    btnClass='menuBtn'
                    handleClick={openAccordion}
                />
                <Button
                    text='Select Student'
                    btnId='selectStudent'
                    btnClass='menuBtn'
                    handleClick={openAccordion}
                />
            </div>
                <div className='formDiv'>
                    {
                        !state.open
                            ? null
                            : (
                                switchFunc(state.btnClicked)
                            )
                    }
                </div>
                {
                    !!students.flights.length &&
                    <Table
                        flights={students.flights} />
                }
                {/* <form onSubmit={onSubmit}>
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
                    <div>{students.errorMessage}</div>
                </form>
                {invalidSubmission && (<div>Please enter a valid email</div>)}
                <button
                    onClick={() => {
                        ;
                        console.log(students)
                    }}>
                    Student Table
                </button> */}

        </>
    );
};


export default Training;