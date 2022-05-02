import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='bg-dark p-3' style={{ height: '92vh' }}>
            <Container className='text-center p-4 text-light'>
                <img src='/main.png' alt="let's note" />
                <h1 className='my-0'>Let's Note</h1>
                Best Notes Taking App
                <h5 className='my-3'>Create a free account and start taking your notes securely!</h5>
                <Link to="/login">
                    <Button variant='primary' className='fs-4 my-4'>
                        Login or Create a free Account
                    </Button>
                </Link>
            </Container>
        </div>
    )
}

export default Home