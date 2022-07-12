import React, { useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap';
import loginContext from '../../Context/Login/Context'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(loginContext);
    const { remainLoggedIn, notes } = context;

    useEffect(() => {
        remainLoggedIn()
        // eslint-disable-next-line
    }, [])

    if (notes.length !== 0) {
        return (<>
            <AddNote />
            <Container className='my-4 border border-2 rounded p-4'>
                <h1>Your Notes</h1>
                <div className="d-flex flex-wrap">
                    {notes.map((note) => {
                        let returnValue;
                        returnValue = (
                            <NoteItem key={note._id} id={note._id} title={note.title} description={note.description} tag={note.tag} />
                        )
                        return returnValue;
                    })
                    }
                </div>
            </Container>
        </>
        )
    }
    else {
        return (<>
            <AddNote />
            <Container className='my-4 border border-2 rounded p-4'>
                <h1>Your Notes</h1>
                <h5 className='text-center p-3'>Nothing to Show!</h5>
            </Container>
        </>
        )
    }

}

export default Notes