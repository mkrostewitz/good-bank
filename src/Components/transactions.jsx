import React from 'react';
import {Consumer, UserContext,  UnAuthMessage } from '../Context/context';

function Transactions() {
    const ctx = React.useContext(UserContext);
    
    // const users = ctx.users;
    // const acc = ctx.account[0].email;
    
    // const index = () => {
    //     for (let i = 0; i < users.length; i++) {
    //     const element = users[i];
    //     if (element.email === acc ){
    //     const index = i
    //     return index;            
    //     };
    //     return false
    //     };
    // }

    return (
        <Consumer>
            { value => (
            value.LoginStatus === true ? (
            <div className="container">
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
            ):(
            <UnAuthMessage /> 
            )
            )}
        </Consumer>
    );
};

export default Transactions;