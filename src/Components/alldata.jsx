import React from 'react';
import {UserContext, AuthStatus} from '../Context/context';

function AllData() {
    const ctx = React.useContext(UserContext);
    const auth = React.useContext(AuthStatus);

    return (
        
        <div className="container">
            <h1>All Data</h1><br/>
            <h5>User Database</h5><br/>
            <table className="table table-striped">
                <tbody>
                    <tr className="table-primary">
                            <td className="col-3">Name</td>
                            <td className="col-3">Password</td>
                            <td className="col-3">Email</td>
                            <td className="col-3">Balance</td>
                    </tr>
                    {ctx.users.map((user) => (
                        <tr className="table-secondary" key={user.email}>
                            <td className="col-3">{user.name}</td>
                            <td className="col-3">{user.password}</td>
                            <td className="col-3">{user.email}</td>
                            <td className="col-3">{user.balance}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

            <h5>User Account</h5><br/>
            {JSON.stringify(ctx.account)}<br/><br/>

            <h5>LogIn Status</h5><br/>
            {JSON.stringify(auth.LoginStatus)}<br/><br/>

            <h5>Transactions</h5><br/>
            <table className="table table-striped">
                <tbody>
                    <tr className="table-primary">
                        <td className="col-3">Id</td>
                        <td className="col-3">Date</td>
                        <td className="col-3">Label</td>
                        <td className="col-3">Amount</td>
                        <td className="col-3">Balance</td>
                    </tr>
                    {ctx.transactions.map((item) => (
                        <tr className="table-secondary" key={item.id}>
                        <td className="col-3">{item.id}</td> 
                        <td className="col-3">{item.date}</td>
                        <td className="col-3">{item.label}</td>
                        <td className="col-3">{item.amount}</td>
                        <td className="col-3">{item.newBalance}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>



        </div>
        
    );
};

export default AllData;