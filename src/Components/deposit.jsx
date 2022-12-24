import React from 'react';
import { Consumer, FormBody, Form,  UnAuthMessage } from '../Context/context';

function Deposit() {
    const [status, setStatus]   = React.useState('');

    return (
        <Consumer>
            { value => (
            value.LoginStatus === true ? (
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