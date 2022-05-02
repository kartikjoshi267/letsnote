import React, { useRef, useState } from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import { MdOutlineDelete, MdEdit } from 'react-icons/md'
import ModalComp from '../ModalComp/ModalComp';

function NoteItem(props) {
    const [message, setMessage] = useState('');

    const reference = useRef(null);

    const openEditModal = () => {
        setMessage('Edit Note');
        reference.current.click();
    }

    const openDeleteModal = () => {
        setMessage('Do you really want to delete this note?');
        reference.current.click();
    }

    return (
        <>
            <ModalComp reference={reference} message={message} content={!(message === 'Do you really want to delete this note?') ? { id: props.id, title: props.title, description: props.description, tag: props.tag } : { id: props.id }} />

            <Card border="dark" className='me-3 my-2' style={{ width: '18rem' }}>
                <Card.Header><b>{props.title}</b></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Badge bg="secondary">{props.tag}</Badge>
                </Card.Body>

                <div className='d-flex p-3 flex-wrap'>
                    <Button className='me-3 fs-5 rounded-circle' variant="danger" onClick={openDeleteModal}><MdOutlineDelete /></Button>
                    <Button className='fs-5 rounded-circle' onClick={openEditModal} variant="primary"><MdEdit /></Button>
                </div>
            </Card>
        </>
    )
}

export default NoteItem