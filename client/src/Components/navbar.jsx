import React, { useContext } from 'react';
import { useNavigate } from "react-router";
import { UserContext, AuthStatus, Consumer, UnAuthMessage} from '../Context/context';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import Logo from '../Images/logo.png';
import ProfileDummy from '../Images/dummy.png'


function NavBar(props) {   
    const Navigate              = useNavigate
    const ctx                   = React.useContext(UserContext);
    const auth                  = React.useContext(AuthStatus);

    function userLogout(email) {
        console.log('Logging Out User');
        const url = `/account/logout/${email}`;
        (async () => {
            var res     = await fetch(url);
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                AuthStatus.isAuthenticated = false
    
                // Update User Context
                window.localStorage.removeItem('isLoggenIn');
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('token');
                console.log(`User with ${email} successfully logged out`);
                Navigate('/')
            } else {
                console.log(`Error loggin out ${email}`)
            }
        })();
    };
    
    function userLogin() {
        console.log('Logging In User');
        Navigate('/Deposit')
    };
    
  
    return(
        <Navbar expand="lg" variant="light">
        <Container>
            <Navbar.Brand href="/"><img src={Logo} alt="Logo" width="50"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            { auth.isAuthenticated === true ? (
                <>
                <Nav className="me-auto">
                    <Nav.Link id="home" desc="This is our homepage..." href="/">Home</Nav.Link>
                    <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                    <Nav.Link href="#/transactions/">Transactions</Nav.Link>
                    <Nav.Link href="#/alldata/">All Data</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{color: "#ffffff"}}> Hi {ctx.user} </Navbar.Text>
                                <Dropdown>
                                    <Dropdown.Toggle style={{background: "none", border: "none"}} id="profile-menu">
                                        <img src={ProfileDummy} width="40" height="40" alt={ctx.user} className="rounded-circle" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={e => userLogout(ctx.email)} to="/">Logout</Dropdown.Item>
                                        <Dropdown.Item href="/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>  
                    </Navbar.Collapse>
                </Nav>
                </>
                ):(
                <>
                <Nav className="me-auto">
                    <Nav.Link id="home" desc="This is our homepage..." href="/">Home</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#/login/">Login</Nav.Link>
                        <Nav.Link href="#/createaccount/">Create Account</Nav.Link>
                    </Navbar.Collapse>
                </Nav>
                </>
                )}                        
            </Navbar.Collapse>
        </Container>
    </ Navbar>
    )
}

export default NavBar;