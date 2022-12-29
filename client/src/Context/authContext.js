import React from "react";
import { useNavigate } from "react-router";
const Navigate = useNavigate;

const UserContext           = React.createContext({user:'', email:'', role:'', account:'', balance: 0});
const AuthStatus            = React.createContext({isAuthenticated: false});
const Consumer              = AuthStatus.Consumer;

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



export { userLogout, userLogin };
