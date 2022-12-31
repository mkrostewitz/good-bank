import React from "react";

const AuthContext           = React.createContext({isAuthenticated: false, token:{accessToken: '', refreshToken:''}});
const AuthConsumer          = AuthContext.Consumer;

// function authenticateUser(email, token) {
//     (async () => {
//         var url = `/account/authenticate/${email}`;
//         var res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
//         var authdata = await res.json();
//         console.log(`Returned Data ${JSON.stringify(authdata)}`)
//         if (authdata === true) {
//             // Update User Context

//         }
//     })();
// }

function UnAuthMessage(props) {
    return (
        <div className="container">
        <h1>You are currently not logged in!</h1><br/>
        <p>Please login or register for an account first...</p>
        </div>
    )
}

export {AuthContext, AuthConsumer, UnAuthMessage };
