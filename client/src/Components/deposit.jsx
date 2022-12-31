import React from 'react';
import { FormBody, Form} from '../Context/context';
import { AuthConsumer, UnAuthMessage } from '../Context/authContext';

function Deposit() {
    const [status, ]   = React.useState('');

    return (
        <AuthConsumer>
            { value => (
            value.isAuthenticated === true ? (
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
        </AuthConsumer>
        )
    }

export default Deposit;