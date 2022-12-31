import React from 'react';
import { FormBody, Form } from '../Context/context';
import { AuthConsumer, UnAuthMessage } from '../Context/authContext';

function Withdraw() {
    const [status, ]   = React.useState('');
    
    return (
        <AuthConsumer>
            { value => (
            value.isAuthenticated === true ? (
            <FormBody
            bgcolor="info"
            header="Withdraw"
            status={status}
            body={<Form
                bgcolor="info"
                buttonLabel="Withdraw"
                buttonAction="accWithdraw"
                showFormName={false}
                showFormEmail={false}
                showFormPassword={false}
                showFormAmount={true}
                amountType="none"
                successButton="Withdraw another amount!"
                />}
            />
            ):(
            <UnAuthMessage />
            )
        )}
        </AuthConsumer>
    )
};

export default Withdraw;