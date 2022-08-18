import React, { useState } from 'react';
import loginContext from './Context';

function LoginContextProvider(props) {

    // State to check whether you are logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const remainLoggedIn = () => {
        if (!localStorage.getItem('auth-token')) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
            authenticate();
        }
    }

    // State to get the name of the user
    const [name, setName] = useState('');

    // State to get the notes
    const [notes, setNotes] = useState([]);

    // State to set a new note
    const [newNote, setNewNote] = useState({
        'title': '',
        'description': '',
        'tag': ''
    });

    // State to set a new note
    const [updatedNote, setUpdatedNote] = useState({
        'title': '',
        'description': '',
        'tag': ''
    });

    // State to store credentials
    const [credentials, setCredentials] = useState({
        'email': "",
        'password': ""
    });

    // State to store newCredentials
    const [newCredentials, setNewCredentials] = useState({
        'name': "",
        'email': '',
        'password': ''
    });

    // State to store error
    const [errors, setError] = useState({
        error: '',
        errType: ''
    });

    // Function to make POST Request for logging in a user
    const loginRequest = async () => {
        await fetch(`/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })

            }).then(async (response) => {
                if (response.status === 401) {
                    const error = await response.json();
                    setError({ error: error['error'], errType: 'danger' });
                    return;
                }
                else if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    localStorage.setItem('auth-token', await data['authtoken']);
                    setCredentials({ email: "", password: "" });
                    setIsLoggedIn(true);
                    authenticate();
                    window.location.pathname = '/notes'
                }
            });
        }

        const addVisitor = async () => {
            await fetch(`/api/count/visit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then (async (response) => {
                if (response.status == 200) {
                    return response.text();
                }
            }).then (async (data) => {
                return data;
            })
        }

        // Function to make POST Request for authenticating a user
        const authenticate = async () => {
            await fetch(`/api/auth/getuser`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
                
            }).then(async (response) => {
                if (response.status === 200) {
                    return response.json();
                }
                
            }).then(async (data) => {
                setName(await data['name']);
                fetchNotes();
            });
    }

    // Function to make POST Request for creating a new user
    const signUpRequest = async () => {
        await fetch(`/api/auth/createuser`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCredentials.name, email: newCredentials.email, password: newCredentials.password })

            }).then(async (response) => {
                if (response.status === 400) {
                    const error = await response.json();
                    setError({ error: error['errors']['errors'][0]['msg'], errType: 'danger' });
                    return;
                }
                else if (response.status === 409) {
                    const error = await response.json();
                    setError({ error: (error['error']), errType: 'danger' });
                    return;
                }
                else if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    setError({ error: data['msg'] + ' (Please login now)', errType: 'success' });
                    setNewCredentials({ name: "", email: "", password: "" });
                }
            });
    }

    // Function to fetch all the notes of a particular user
    const fetchNotes = async () => {
        await fetch(`/api/notes/fetchnotes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }

            }).then(async (response) => {
                if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    setNotes(await data);
                }
            });
    }

    // Function to add a note of a particular user
    const addNote = async () => {
        await fetch(`/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({title: newNote.title, description: newNote.description, tag: newNote.tag})

            }).then(async (response) => {
                if (response.status === 400) {
                    const error = await response.json();
                    setError({ error: error['errors']['errors'][0]['msg'], errType: 'danger' });
                    return;
                }
                else if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    setNewNote({ title: '', description: '', tag: '' });
                    fetchNotes();
                    setError({error: 'Note added successfully', errType: 'success'});
                }
            });
    }

    // Function to update an existing note of a particular user
    const editNote = async (id) => {
        await fetch(`/api/notes/updatenote/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({title: updatedNote.title, description: updatedNote.description, tag: updatedNote.tag})

            }).then(async (response) => {
                if (response.status === 400) {
                    const error = await response.json();
                    setError({ error: error['errors']['errors'][0]['msg'], errType: 'danger' });
                    return;
                }
                else if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    fetchNotes();
                    setError({error: 'Successfully updated', errType: 'success'});
                }
            });
    }

    // Function to delete an existing note of a particular user
    const deleteNote = async (id) => {
        await fetch(`/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },

            }).then(async (response) => {
                if (response.status === 404) {
                    const error = await response.json();
                    setError({ error: error['error'], errType: 'danger' });
                    return;
                }
                else if (response.status === 403) {
                    const error = await response.json();
                    setError({ error: error['error'], errType: 'danger' });
                    return;
                }
                else if (response.status === 200) {
                    return response.json();
                }

            }).then(async (data) => {
                if (data !== undefined) {
                    fetchNotes();
                    setError({error: 'Deleted successfully', errType: 'success'});
                }
            });
    }

    // Function to signout
    const signOut = () => {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        window.location.pathname = '/login';
    }

    return (
        <React.Fragment>
            <loginContext.Provider value={{ credentials, setCredentials, newCredentials, setNewCredentials, loginRequest, errors, setError, isLoggedIn, setIsLoggedIn, signUpRequest, name, authenticate, remainLoggedIn, fetchNotes, notes, newNote, setNewNote, addNote, updatedNote, setUpdatedNote, editNote, deleteNote, signOut, addVisitor }} >
                {props.children}
            </loginContext.Provider>
        </React.Fragment>
    )
}

export default LoginContextProvider;
