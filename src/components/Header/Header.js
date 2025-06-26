import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const login = useNavigate();
    const handleLogin = () => {
        login("/login")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand" >React quiz</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/user" className="nav-link">User</NavLink>
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </Nav>
                    <Nav >
                        <div className='header-button'>
                            <button className='btn btn-login' onClick={() => { handleLogin() }}>

                                Login

                            </button>
                            <button className='btn btn-signup'>
                                SignUp
                            </button>
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;