import React, { useContext, useState, useRef, useEffect } from 'react';
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
    const user = useContext(UserContext);
    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        students:[],
        mapped: [],
        email:'',
    })
    const [studentEmail, setStudentEmail] = useState("");
    const [refreshStudents, setRefreshStudents] = useState(true);
    const [students, setStudents] = useState();
    const [selectedStudentIndex, setSelectedStudentIndex] = useState();
    const [studentFlights, setStudentFlights] = useState();
    const [inputInvalidError, setInputInvalidError] = useState("");

    const studentEmailInputEl = useRef(null);

    const [modal, setModal] = useState({
        open: false,
        values: []
    });

    useEffect(() => {
        if (!studentEmailInputEl.current) return;
        studentEmailInputEl.current.setCustomValidity(inputInvalidError);
        return () => {
            studentEmailInputEl.current.setCustomValidity("");
        }
    }, [inputInvalidError]);

    useEffect(() => {
        if (!refreshStudents) return;
        const handle = setTimeout(async () => {
            try {
                const { data } = await API.getStudents(user.userId);
                const students = data.filter(({ studentID }) => studentID != null);
                setStudents(students);
                setRefreshStudents(false);
                if (!students.length) return setSelectedStudentIndex(undefined);
                if (selectedStudentIndex == null || selectedStudentIndex >= students.length) setSelectedStudentIndex(0);
            } catch (err) {
                console.error(err);
            }
        }, 100)
        return () => clearTimeout(handle);
    }, [refreshStudents]);

    useEffect(() => {
        if (selectedStudentIndex == null) return;
        getStudentFlights();
    }, [selectedStudentIndex]);


    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            // Find if the entered email address is already in the database
            // Find current logged in user
            const [matchingStudent, loggedInUser] = await Promise.all([API.userVerify({ studentEmail: studentEmail }), API.userData({})]);

            // If the email address entered corresponds to active user account
            if (!matchingStudent.data[0]) {
                return setInputInvalidError('This student needs to create an account first');
            }

            // Find if the logged in user already has access to the entered student account
            const DuplicateAccess = await API.checkDuplicates({
                instructorID: loggedInUser.data.id,
                studentID: matchingStudent.data[0].id
            })

            // If a duplicate is not found
            if (DuplicateAccess.data[0]) {
                return setInputInvalidError('You already have access to this student');
            }

            // If the user didn't enter their own email address
            if ((loggedInUser.data.id === matchingStudent.data[0].id)) {
                return setInputInvalidError('You have entered your own Email.');
            }

            // Send an authentication email to the email address typed in
            API.sendMail({
                "email": matchingStudent.data[0].email,
                "ID": matchingStudent.data[0].id,
                "user": loggedInUser
            })
            setInputInvalidError('');
        }
        catch (error) {
            console.error(error);
        }
    }

    const getStudentFlights = async () => {
        try {
            const { studentID } = students[selectedStudentIndex];
            const { data } = await API.getFlights(studentID)
            setStudentFlights(data.map(x => ({
                Date: x.date,
                Aircraft: x['Aircraft.tailNumber'],
                Route: x.route,
                Comments: x.comments,
                Total: x.total,
                id: x.id
            })))
        } catch (err) {
            console.error(err)
        }
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
    const mapStudents = () => {
        console.log(students)
        const studentArray = students.map(({ studentEmail }, index) => ({
            value:index, 
            email: studentEmail
        }))
        setState({ ...state,
            students: studentArray
            })
        console.log(state)
    }
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
            case 'addStudentMenu':
                return (
                    <> 
                    <form onSubmit={onSubmit}>
                    <label htmlFor="student-email-input" > Student Email </label>
                    <input
                        ref={studentEmailInputEl}
                        type="email"
                        id="student-email-input"
                        placeholder="Student Email"
                        onChange={({ target: { value } }) => {
                            setStudentEmail(value);
                            setInputInvalidError('');
                        }}
                    />
                    <Button 
                        text='Add Student'
                        btnid='add-student' 
                        className='formBtn'
                        type="submit" 
                    />
                </form>
                    </>
                )
            case 'selectStudentMenu':
                return (
                    <>
                        <select
                    name="students"
                    id="student-select"
                    onChange={({ target: { value } }) => {
                        setSelectedStudentIndex(value)
                    }}
                    onClick={() => setRefreshStudents(true)}
                >

                    {
                        students && students.length ?
                            students.map(({ studentEmail }, index) => (<option value={index} key={index}>{studentEmail}</option>)) :
                            (<option value=""> ... </option>)
                    }
                </select>
                    </>
                )
            default:
                break;
        };
    };

    return (
        <>
            <Nav />
            <div className='menuDiv'>
                <Button
                    text='Add Student'
                    btnId='addStudentMenu'
                    btnClass='menuBtn'
                    handleClick={openAccordion}
                />
                <Button
                    text='Select Student'
                    btnId='selectStudentMenu'
                    btnClass='menuBtn'
                    handleClick={openAccordion}
                    // handleClick={mapStudents}
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
                studentFlights &&
                <Table
                    flights={studentFlights} />
            }
            <main>
                
                
            </main>
            {/* {
                studentFlights &&
                <Table
                    flights={studentFlights} />
            } */}
        </>
    );
};


export default Training;