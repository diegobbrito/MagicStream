import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import logo from '../../assets/MagicStreamLogo.png';

const Header = ({handleLogout}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    return (
        <Navbar bg="dark" variant='dark' expand="lg" sticky="top" className='shadow-sm' >
            <Container>
                <Navbar.Brand>
                     <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">
                            <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-2"
                            />
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/">Magic Stream</Nav.Link>
                     </Nav>
                    
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='main-navbar-nav' />
                <Navbar.Collapse>
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/recommended">Recommended</Nav.Link>
                        {auth?.role === 'ADMIN' && (
                            <Nav.Link as={NavLink} to="/admin/add-movie">Add Movie</Nav.Link>
                        )}
                    </Nav>

                    <Nav className='ms-auto align-items-center' style={{ gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {auth ? (
                            <>
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    Hello, <strong>{auth.first_name}</strong>
                                </span>
                                <Button variant='outline-light' size='sm' onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='outline-info'
                                    size='sm'
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant='info'
                                    size='sm'
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </Button>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;