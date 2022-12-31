import React from 'react';
import { UserConsumer } from '../Context/context';
import { AuthContext,  UnAuthMessage} from '../Context/authContext';
import { base_uri } from '../App';

function AllData() {
    const auth = React.useContext(AuthContext);
    const [users, setUsers]   = React.useState([]);

    function getAllUsers() {
        let token = auth.token.accessToken;
        
        console.log('Pulling User Data');
        const url = `${base_uri}/account/all`;
        (async () => {
            var res     = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                // push found transactions in array
                setUsers(data.docs)
            };
        })();
    }

    if (auth.isAuthenticated) {
        React.useEffect(() => {
            getAllUsers()
        },[]);
    }

    return (
        <UserConsumer>
            {value => (
                value.role === 'employee' ? (
                    <div className="container">
                        <h1>All Data</h1><br />
                        <h5>User Database</h5><br />
                        <table className="table table-striped">
                            <tbody>
                                <tr className="table-primary">
                                    <td className="col-3">Name</td>
                                    <td className="col-3">Password</td>
                                    <td className="col-3">Email</td>
                                    <td className="col-3">Balance</td>
                                    <td className="col-3">Role</td>
                                    <td className="col-3">Logged In</td>
                                </tr>
                                {users.map((user) => (
                                    <tr className="table-secondary" key={user.email}>
                                        <td className="col-3">{user.name}</td>
                                        <td className="col-3">{user.password}</td>
                                        <td className="col-3">{user.email}</td>
                                        <td className="col-3">{user.balance}</td>
                                        <td className="col-3">{user.role}</td>
                                        <td className="col-3">{user.loggedIn ? 'x' : "-" }</td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <UnAuthMessage />
                )
            )}
        </UserConsumer>
    )
};

export default AllData;