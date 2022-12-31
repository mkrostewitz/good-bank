
import React from 'react';
import { FormBody, Form, UserConsumer } from '../Context/context';
import { AuthConsumer, UnAuthMessage} from '../Context/authContext';

function Profile() {
    const [status, ]   = React.useState('');
    
    return (
        <AuthConsumer>
        { auth => (
        auth.isAuthenticated === true ? (
        <FormBody
        bgcolor="light"
        txtcolor="dark"
        header="Profile Information"
        status={status}
        body={
            <UserConsumer>
            { user => (
            <Form
            bgcolor="light"
            buttonLabel="Update"
            buttonAction="updateProfile"
            showFormName={true}
            NameInput={user.user}
            showFormEmail={true}
            EmailInput={user.email}
            showFormPassword={true}
            amountType="none"
            disabled
            />
            )}
            </UserConsumer>
            }
        />
        ):(
        <UnAuthMessage />
        )
        )}
    </AuthConsumer>
    )
    };

    export default Profile