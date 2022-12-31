import React from 'react';
import { UserContext } from '../Context/context';
import { AuthContext, AuthConsumer, UnAuthMessage} from '../Context/authContext';
import { base_uri } from '../App';

function Transactions() {
    const ctx                               = React.useContext(UserContext);
    const auth                              = React.useContext(AuthContext);
    const [transactions, setTransactions]   = React.useState([]);

    // const authenticated = JSON.parse(localStorage.getItem('isLoggenIn'));
    const authenticated = auth.isAuthenticated

    function getUserTrasnactions(email) {
        let token = auth.token.accessToken;
        
        console.log('Pulling User Transactions');
        const url = `${base_uri}/account/transactions/${email}`;
        (async () => {
            var res     = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                // push found transactions in array
                setTransactions(data.docs)
            };
        })();
    }

    if (authenticated) {
        React.useEffect(() => {
            getUserTrasnactions(ctx.email)
        },[]);
    }

    return (
        <AuthConsumer>
            { value => (
            authenticated === true ? (
            <div className="container">
            <h5>Transactions</h5><br/>
            <table className="table table-striped">
                <tbody>
                    <tr className="table-primary">
                        <td className="col-3">Date</td>
                        <td className="col-3">Label</td>
                        <td className="col-3">Amount</td>
                        <td className="col-3">Balance</td>
                    </tr>
                    {transactions.map((item) => (
                        <tr className="table-secondary" key={item._id}>
                        <td className="col-3">{item.date}</td>
                        <td className="col-3">{item.label}</td>
                        <td className="col-3">{item.amount}</td>
                        <td className="col-3">{item.balance}</td>
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
        </AuthConsumer>
    );
};

export default Transactions;