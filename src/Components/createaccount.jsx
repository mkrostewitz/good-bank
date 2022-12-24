
import React from 'react';
import { FormBody, Form } from '../Context/context';

function CreateAccount() {
    const [status, setStatus]   = React.useState('');
    
    return (
        <FormBody
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={<Form
            bgcolor="primary"
            buttonLabel="Create Account"
            buttonAction="accCreate"
            showFormName={true}
            showFormEmail={true}
            showFormPassword={true}
            showFormAmount={false}
            amountType="none"
            successButton="Create another account"
            />}
        />
    )
    };

    export default CreateAccount