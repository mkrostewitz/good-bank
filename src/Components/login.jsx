import React from 'react';
import { FormBody, Form } from '../Context/context';

function Login() {
    const [status, setStatus]       = React.useState('');

    return (
        <FormBody
        bgcolor="warning"
        header="Login"
        status={status}
        body={<Form
            bgcolor="warning"
            buttonLabel="Login"
            buttonAction="accLogin"
            showFormName={false}
            showFormEmail={true}
            showFormPassword={true}
            showFormAmount={false}
            amountType="none"
            successButton="Login as another User"
            />}
        />
    )
    };

    export default Login