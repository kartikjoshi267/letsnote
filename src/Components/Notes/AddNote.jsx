import React, { useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import loginContext from '../../Context/Login/Context';

function AddNote() {
    const context = useContext(loginContext);
    const { remainLoggedIn, newNote, setNewNote, addNote } = context;

    useEffect(() => {
        remainLoggedIn()
        // eslint-disable-next-line
    }, [])

    const onChangeHandler = (e) => {
        setNewNote({...newNote, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addNote();
    }

    return (
        <Container className='my-4 border border-2 rounded p-4'>
            <h1>Add Notes</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' type="text" placeholder="Untitled" value={newNote.title} onChange={onChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' as="textarea" rows={5} placeholder='Type Something...' value={newNote.description} onChange={onChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="text" placeholder="General" name='tag' value={newNote.tag} onChange={onChangeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </Container>
    )
}

export default AddNote