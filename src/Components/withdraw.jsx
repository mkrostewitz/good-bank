import React from 'react';
import { Consumer, FormBody, Form, UnAuthMessage } from '../Context/context';

function Withdraw() {
    const [status, setStatus]   = React.useState('');
    
    return (
        <Consumer>
            { value => (
            value.LoginStatus === true ? (
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
        </Consumer>
    )
};

export default Withdraw;