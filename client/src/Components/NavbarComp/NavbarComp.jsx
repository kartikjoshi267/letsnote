import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import loginContext from '../../Context/Login/Context';

export default function NavbarComp(props) {
    const location = useLocation();
    document.title = "Let'sNote | " + ((location.pathname === '/') ? "Home" : (location.pathname === '/about') ? "About" : (location.pathname === '/login') ? "Login" : (location.pathname === '/notes') ? "Notes" : "404 | Not Found");

    const context = useContext(loginContext);
    const { isLoggedIn, name, signOut, addVisitor } = context;
    addVisitor();

    return (
        <>
            <Navbar bg="light" expand='lg' variant="light">
                <Link to="/" className='text-decoration-none'>
                    <Navbar.Brand>
                        {props.title}
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Link to='/' className={'me-3 text-decoration-none text-' + ((location.pathname === "/") ? 'dark' : 'secondary')}>
                            <Nav.Item>
                                Home
                            </Nav.Item>
                        </Link>

                        {/* <Link to='/about' className={'me-3 text-decoration-none text-' + ((location.pathname === '/about') ? 'dark' : 'secondary')}>
                            <Nav.Item>
                                About
                            </Nav.Item>
                        </Link> */}
                    </Nav>
                    <Nav className="text-right" activeKey={location.pathname}>
                        <Link to={!isLoggedIn ? "/login" : '/notes'} className={'me-3 text-decoration-none text-' + ((location.pathname === '/login') || (location.pathname === '/notes') ? 'dark' : 'secondary')}>
                            <Nav.Item>
                                {!isLoggedIn ? "Login" : name}
                            </Nav.Item>
                        </Link>

                        <hr />

                        <Nav.Item onClick={signOut} style={{ cursor: 'pointer' }} className={'me-3 text-decoration-none text-dark'}>
                            {!isLoggedIn ? "" : 'Sign out'}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
