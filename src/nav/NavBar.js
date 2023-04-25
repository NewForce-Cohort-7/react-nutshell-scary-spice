import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

/* Very neat! bsPrefix overrides the default bootstrap class names. From the docs: 	
Change the underlying component CSS base class name and modifier class names prefix. 
This is an escape hatch for working with heavily customized bootstrap css. */

const NavBar = () => {
    return (
    <Navbar expand="lg" bg="navbar-background" variant="dark" fixed="top">
        <Navbar.Brand href="#home" bsPrefix="navbar-brand-custom">Nutshell</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link href="#events" bsPrefix="nav-link-custom">Events</Nav.Link>
            <Nav.Link href="#tasks" bsPrefix="nav-link-custom">Tasks</Nav.Link>
            <Nav.Link href="#articles" bsPrefix="nav-link-custom">Articles</Nav.Link>
            <Nav.Link href="#placeholder" bsPrefix="nav-link-custom">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default NavBar