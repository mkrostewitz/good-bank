import React from 'react';
const UserContext = React.createContext(null);
const AuthStatus = React.createContext(null);
const Consumer = AuthStatus.Consumer;

function FormBody(props){
    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return(
        <div id="createAccountForm" className="col d-flex justify-content-center">
            <div className={classes()} style={{maxWidth: "18rem"}}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id="createStatus">{props.status}</div>)}
            </div>
            </div>
        </div>
    )
}

function Form(props) {
    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txt.color : ' text-body';
        return 'mb-3 ' + bg + txt;
    }

    const [show, setShow]               = React.useState(true);
    const [status, setStatus]           = React.useState('');
    const [name, setName]               = React.useState('');
    const [email, setEmail]             = React.useState('');
    const [amount, setAmount]           = React.useState('');
    const [password, setPassword]       = React.useState('');
    const [disabled, setDisabled]       = React.useState(true);


    const ctx = React.useContext(UserContext);
    const auth = React.useContext(AuthStatus);

    const FormName = !props.showFormName ? false : true;
    const FormEmail = !props.showFormEmail ? false : true;
    const FormPassword = !props.showFormPassword ? false : true;
    const FormAmount = !props.showFormAmount ? false : true;
    const FormBalance = !props.showFormBalance ? false : true;

    //Clear Form
    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setAmount('');
        setShow(true);
    };

    //Disbable Login and Create Account Button
    function success(label, field) {

        if((FormName && name === "") || (FormEmail && email === "") || (FormPassword && password === "") || (FormAmount && amount === "")) { 
            return false;
           } else {
            setDisabled(false) 
               
        };
       }

    //validateForm
    function validateForm(field, label) {
        if (!field) {
            setStatus('Error: ' + label + 'missing.');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        // verify that the password has at least 8 characters
        if (label === 'password') {
            if (field.length < 8 ) {
                setStatus('Error: ' + label + 'Your Password must contain of at least 8 characters.');
                return false;
            };
            return true
        }

        //verify that numbers are numbers
        if (label === 'Amount') {
            if (isNaN(field)) {
                setStatus('Error: ' + label + 'should consist only of integers.');
                return false;
            };
            return true
        }

        return true
    }

    //create new user account
    function createUser(name, email, password) {
        ctx.users.push({name, email, password, balance:100});
        setStatus(`Success: Congratulations ${name}. Your account was successfully created`);
    }

    //Validate that user exists when logging in
    function validateUser(user, password, label) {
        for (let i = 0; i < ctx.users.length; i++) {
            if ( ctx.users[i].email === user){
                // user was found

                // verify user password
                if (ctx.users[i].password === password) {
                    ctx.account = [{name: ctx.users[i].name, email: ctx.users[i].email, balance: ctx.users[i].balance }];
                    setStatus(`Success: Welcome ${name}! You can deposit or withdraw money from your account.`);
                    return true;
                } else {
                    setStatus('Error:' + label + ' password incorrect.');
                    return false;
                }
            }
        };
        // user was not found
        setStatus('Error:' + label + ' not found.')
        return false
    }

    //deposit amount to user account
    function depositAmount(user, amount, label) {
        ctx.account[0].balance += parseInt(amount);
        let newBalance = ctx.account[0].balance ;


        for (let i = 0; i < ctx.users.length; i++) {
            if ( ctx.users[i].email === user){
                // update user balance 
                ctx.users[i].balance += parseInt(amount);

                //record transaction
                recordTransaction(label, amount, newBalance);

                setStatus(`Success: Successfully added ${amount} to your account. You new balance is ${newBalance}`);
                return true;
                } 
            };
        // user was not found
        setStatus('Error: User not found, register for an account first.');
        return false;
    }

     //widthdraw amount from user account
     function widthdrawAmount(user, amount, label) {
        let currentBalance = ctx.account[0].balance
        let newBalance = ctx.account[0].balance - parseInt(amount);

        if(newBalance >= 0 ) {
            ctx.account[0].balance -= amount;

            for (let i = 0; i < ctx.users.length; i++) {
                if ( ctx.users[i].email === user){
                    // update user balance 
                    ctx.users[i].balance -= amount;

                    //record transaction
                    recordTransaction(label, amount, newBalance)

                    // set form status
                    setStatus(`Success: Successfully withdrew ${amount}$ from your account. Your new balance is ${newBalance}$.`);
                    return true;
                    } 
                };
        // user was not found
        setStatus('Error: User not found, register for an account first.');
        return false;
        } else {
            setStatus(`Error: Insufficient balance! The withdrawal amount of ${amount}$ exceeds your current balance of ${currentBalance}$.`);
            return false;
        }
    }

    function recordTransaction(label, amount, newBalance) {
        //record transaction
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        
        date = mm + '/' + dd + '/' + yyyy;

        var id = ctx.transactions.length + 1;
        ctx.transactions.push({id, date, label, amount, newBalance});
    }

    function handleSubmit(action) {

        //handle create account
        if (action === "accCreate") { 
                console.log(name, email, password);
                if (!validateForm(name, 'name')) return;
                if (!validateForm(email, 'email')) return;
                if (!validateForm(password, 'password')) return;
                createUser(name, email, password);
                setShow(false);
        }

        //handle login
        if (action === 'accLogin') { 
                console.log(email, password);
                if (!validateForm(email, 'Email')) return;
                if (!validateForm(password, 'Password')) return;
                if (!validateUser(email, password, 'User')) return;                
                auth.LoginStatus = true;
                setShow(false);
        }

        //handle deposit
        if (action === 'accDeposit') {
            const user = ctx.account[0].email;
            console.log(amount);
            if(!user) return setStatus('Error: It seems like you are not logged in yet! Log in to your account first')
            if (!validateForm(amount, 'Amount')) return;
            if (!depositAmount(user, amount, 'Deposit')) return;
            setShow(false);
        }

        //handle widthdraw
        if (action ==='accWithdraw') {
            const user = ctx.account[0].email;

            console.log(amount);
            if(!user) return setStatus('Error: It seems like you are not logged in yet! Log in to your account first')
            if (!validateForm(amount, 'Amount')) return;
            if (!widthdrawAmount(user, amount, 'Withdrawal')) return;
            setShow(false);
        }

    
    }

    return(
        show ? (
            <form>

            {FormName && 
            <div id="required" className={classes()}>
                <label htmlFor="name" className="form-label text-white">Name</label>
                <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onBlur={e => success('name', props.buttonAction, e.currentTarget.value)} onChange={e => setName(e.currentTarget.value)} />
            </div>
            }

            {FormEmail && 
            <div id="required" className={classes()}>
                <label htmlFor="email" className="form-label text-white">Email</label>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onBlur={e => success('email', props.buttonAction, e.currentTarget.value)}  onChange={e => setEmail(e.currentTarget.value)} />
            </div>
            }

            {FormPassword && 
            <div id="required" className={classes()}>
                <label htmlFor="password" className="form-label text-white">Password</label>
                 <input type="input" className="form-control" id="password" placeholder="Enter Password" value={password} onBlur={e => success('password', props.buttonAction, e.currentTarget.value)}  onChange={e => setPassword(e.currentTarget.value)} />
            </div>
            }

            {FormAmount &&
            <div className={classes()}>
                <div id="props.buttonLabel" className="form-text text-white fs-6 text">Balance: {JSON.stringify(ctx.account[0].balance)}</div>
                <label htmlFor={props.buttonLabel} className="form-label text-white">{props.buttonLabel}</label>
                <input type="input" className="form-control" id={props.buttonLabel} placeholder="Enter Amount" value={amount} onBlur={e => success('amount', props.buttonAction, e.currentTarget.value)} onChange={e => setAmount(e.currentTarget.value)} />
            </div>
            }

            {FormBalance &&
                <div className={classes()}>
                <h3>Hi {ctx.account[0].name}!</h3> 
                <p>Your current account Balance is {JSON.stringify(ctx.account[0].balance)}</p>
                </div>
            }

            <button type="submit" id="button" className="btn btn-light" onClick={e => handleSubmit(props.buttonAction)} disabled={disabled}>{props.buttonLabel}</button>
            {status.includes("Error") && <div id="status" className="form-text text-danger">{status}</div>}
            </form>
            
            ):(

            <div>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>{props.successButton}</button>
            {status.includes("Success") && <div id="status" className="form-text text-white">{status}</div>}
            </div>    
            )
    )
}

function UnAuthMessage(props) {
    return (
        <div className="container">
        <h1>You are currently not logged in!</h1><br/>
        <p>Please login or register for an account first...</p>
        </div>
    )
}

export { UserContext, AuthStatus, Consumer, FormBody, Form, UnAuthMessage };
