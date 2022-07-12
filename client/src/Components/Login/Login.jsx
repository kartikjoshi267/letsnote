import React, { useContext, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import loginContext from '../../Context/Login/Context'

function Login() {
  const context = useContext(loginContext);
  const { credentials, setCredentials, loginRequest, newCredentials, setNewCredentials, signUpRequest, remainLoggedIn } = context;

  useEffect(() => {
    remainLoggedIn()
    // eslint-disable-next-line
  }, [])
  

  const onLoginChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  
  const onChange = (e) => {
    setNewCredentials({ ...newCredentials, [e.target.name]: e.target.value });
  }

  const onLoginSubmit = (event) => {
    event.preventDefault();
    loginRequest();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    signUpRequest();
  }

  return (
        <Container style={{display: 'flex', justifyContent: 'center' }}>
            <div className='my-5 w-50 me-3 p-4 rounded border border-2'>
              <h1>Login</h1>
              <br />
              <Form onSubmit={onLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control autoComplete='off' type="email" placeholder="Enter email" value={credentials.email} name='email' onChange={onLoginChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control autoComplete='off' type="password" placeholder="Password" value={credentials.password} name='password' onChange={onLoginChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>

            <div className='my-5 w-50 p-4 rounded border border-2' style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', top: '-3%', left: '50%', backgroundColor: 'white', paddingLeft: '12px', paddingRight: '12px' }}>OR</p>
              <h1>Create a new account [It's Free]</h1>
              <br />
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Name</Form.Label>
                  <Form.Control autoComplete='off' type="name" placeholder="Enter name" value={newCredentials.name} name='name' onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control autoComplete='off' type="email" placeholder="Enter email" value={newCredentials.email} name='email' onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control autoComplete='off' type="password" placeholder="Password" value={newCredentials.password} name='password' onChange={onChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
        </Container>
  )
}

export default Login;