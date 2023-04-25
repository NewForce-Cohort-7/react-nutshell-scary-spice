import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("nutshell_user");

    return (
        <Navbar expand="lg" bg="navbar-background" variant="dark" fixed="top">
            <Navbar.Brand href="#home" bsPrefix="navbar-brand-custom">Nutshell</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#events" bsPrefix="nav-link-custom">Events</Nav.Link>
                    <Nav.Link href="#tasks" bsPrefix="nav-link-custom">Tasks</Nav.Link>
                    <Nav.Link href="#articles" bsPrefix="nav-link-custom">Articles</Nav.Link>
                    {isLoggedIn &&
                        <NavItem className="navbar__item navbar__logout">
                            <Nav.Link bsPrefix="nav-link-custom" to="/" onClick={() => {
                                localStorage.removeItem("nutshell_user");
                                navigate("/", { replace: true });
                            }}>Logout</Nav.Link>
                        </NavItem>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
