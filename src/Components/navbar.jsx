import React from 'react';
import {Container, Nav, Navbar, OverlayTrigger,Tooltip} from 'react-bootstrap'
import { UserContext } from '../Context/context';

import Logo from '../Pictures/bank.png';

function NavBar(props) {
    const ctx = React.useContext(UserContext);
 
    const homeTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        This is the Bad Bank Homepage where you learn all about us.
        </Tooltip>
    );

    const createTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        On this page you can create your Bad Bank Account.
        </Tooltip>
    );

    const loginTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        After you created your account, you can use this page to login.
        </Tooltip>
    );

    const depositTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        After you logged in to your account, you may use this page to deposit funds and top up your account.
        </Tooltip>
    );

    const withdrawTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        After you logged in to your account, you may use this page to withdraw funds from your account.
        </Tooltip>
    );

    const transactionsTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        After you logged in to your account and performed some deposits or withdraws, you can check out your trnsaction histoy.
        </Tooltip>
    );

    const alldataTooltip = (props) => (
        
        <Tooltip id="button-tooltip" {...props}>
        This page gives you an overview off all the data of our bank incl. users and passwords, the current account info and login status.
        </Tooltip>
    );


        
    return(
        <Navbar expand="lg" bg="primary" variant="light">
            <Container>
                <Navbar.Brand href="/"><img src={Logo} alt="Logo" width="50"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={homeTooltip}>
                            <Nav.Link id="home" desc="This is our homepage..." href="/">Home</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={createTooltip}>
                            <Nav.Link href="#/createaccount/">Create Account</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={loginTooltip}>
                            <Nav.Link href="#/login/">Login</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={depositTooltip}>
                            <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={withdrawTooltip}>
                            <Nav.Link href="#/withdraw/">Withdrawal</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={transactionsTooltip}>
                            <Nav.Link href="#/transactions/">Transactions</Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={alldataTooltip}>
                            <Nav.Link href="#/alldata/">All Data</Nav.Link>
                        </OverlayTrigger>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                            {
                            ctx.account[0].name > '' && <Navbar.Text>
                                Signed in as: <a href="#/transactions/"> {ctx.account[0].name}</a>
                            </Navbar.Text>
                            }
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </ Navbar>

    )
}

export default NavBar;