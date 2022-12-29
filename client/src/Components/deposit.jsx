import React from 'react';
import { Consumer, FormBody, Form,  UnAuthMessage, AuthStatus } from '../Context/context';

function Deposit() {
    const [status, setStatus]   = React.useState('');
    // const authenticated = JSON.parse(localStorage.getItem('isLoggenIn'));
    const auth =        React.useContext(AuthStatus);

    return (
        <Consumer>
            { value => (
            auth.isAuthenticated === true ? (
            <FormBody
            bgcolor="success"
            header="Deposit"
            status={status}
            body={<Form
                bgcolor="success"
                buttonLabel="Deposit"
                buttonAction="accDeposit"
                showFormName={false}
                showFormEmail={false}
                showFormPassword={false}
                showFormAmount={true}
                amountType="none"
                disabled
                successButton="Deposit another amount!"
                />}
            />
            ):(
            <UnAuthMessage />
            )
            )}
        </Consumer>
        )
    }

export default Deposit;