import React, { useState, useContext, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import loginContext from '../../Context/Login/Context';

function ModalComp(props) {
    const referenceClose = useRef(null);
    const [show, setShow] = useState(false);
    const context = useContext(loginContext);

    const { updatedNote, setUpdatedNote, editNote, deleteNote } = context;

    const onChangeHandler = (e) => {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
    }

    const updateNote = (id) => {
        editNote(id);
        referenceClose.current.click();
    }

    const deleteHandler = (id) => {
        deleteNote(id);
        referenceClose.current.click();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (props.content.title) {
        return (
            <>
                <Button ref={props.reference} variant="primary" style={{ display: 'none' }} onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.message}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name='title' defaultValue={props.content.title} onChange={onChangeHandler} type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name='description' defaultValue={props.content.description} onChange={onChangeHandler} as="textarea" rows={5} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text" defaultValue={props.content.tag} onChange={onChangeHandler} name='tag' />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} ref={referenceClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => updateNote(props.content.id)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    else{
        return (
            <>
                <Button ref={props.reference} variant="primary" style={{ display: 'none' }} onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.message}</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} ref={referenceClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={() => deleteHandler(props.content.id)}>
                            Yes, Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalComp