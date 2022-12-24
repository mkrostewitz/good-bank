import React from 'react';
import { FormBody } from '../Context/context';
import Logo from '../Pictures/bank.png';

function Home() {
    return (
            <FormBody
                bgcolor="primary"
                txtcolor="white"
                header="Welcome to the Bad Bank"
                title="Welcome to the bank"
                text="We are the first bank who doesnt care about your privacy."
                body={<img src={Logo} className="img-fluid" alt="Logo" />}
            />
    );
};

export default Home