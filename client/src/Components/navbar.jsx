import React from 'react';
import { UserConsumer } from '../Context/context';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ProfileDummy from '../Images/dummy.png'
import Logo from '../Images/logo.png';

function NavBar(props) { 
   
    let user = JSON.parse(window.localStorage.getItem('user'));
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/')
    }
    

    return(
        <UserConsumer>
            {value => (
                <Navbar expand="lg" variant="light" id="navbar">
                <Container>
                    <Navbar.Brand href="/"><img src={Logo} alt="Logo" width="50"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {( localStorage.getItem('user') ?  
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link id="home" desc="This is our homepage..." href="#/">Home</Nav.Link>
                                    <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                                    <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
                                    <Nav.Link href="#/transactions/">Transactions</Nav.Link>
                                    {(value.role === 'employee' && <Nav.Link href="#/alldata/">All Data</Nav.Link> )}
                                </Nav>
                                    <Nav className="justify-content-end">
                                        <Navbar.Collapse className="justify-content-end">
                                            <Navbar.Text style={{ color: "#ffffff" }}> Hi {user.user} </Navbar.Text>
                                            <Dropdown>
                                                <Dropdown.Toggle style={{ background: "none", border: "none" }} id="profile-menu">
                                                    <img src={ProfileDummy} width="40" height="40" alt={user.user} className="rounded-circle" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                                    <Dropdown.Item href="#/Profile">Profile</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Navbar.Collapse>
                                    </Nav>
                            </>
                            
                            :(
                                <>
                                <Nav className="me-auto">
                                    <Nav.Link id="home" desc="Good Bank Home" href="/">Home</Nav.Link>
                                </Nav>
                                <Nav className="justify-content-end">
                                    <Navbar.Collapse className="justify-content-end">
                                        <Nav.Link href="#/login/">Login</Nav.Link>
                                        <Nav.Link href="#/createaccount/">Create Account</Nav.Link>
                                    </Navbar.Collapse>
                                </Nav>
                                </>
                            ) 
                            )};
                    </Navbar.Collapse>
                    </Container>
            </ Navbar>
            )}
        </UserConsumer>     
    )
}

export default NavBar;