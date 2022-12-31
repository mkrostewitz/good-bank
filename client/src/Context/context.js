import React from "react";
import { AuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { base_uri } from "../App";

const UserContext           = React.createContext({user:'', email:'', role:'', account:'', balance: 0});
const UserConsumer          = UserContext.Consumer;

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

    const [show, setShow]                       = React.useState(true);
    const [status, setStatus]                   = React.useState({details: {}, show: true});
    const [amount, setAmount]                   = React.useState('');
    const [password, setPassword]               = React.useState('');
    const [disabled, setDisabled]               = React.useState(true);

    const ctx                   = React.useContext(UserContext);
    const auth                  = React.useContext(AuthContext);
    const navigate = useNavigate();

    const FormName = !props.showFormName ? false : true;
    const NameValue = !props.NameInput ? false : props.NameInput;
    const FormEmail = !props.showFormEmail ? false : true;
    const EmailValue = !props.EmailInput ? false : props.EmailInput;
    const FormPassword = !props.showFormPassword ? false : true;
    const FormAmount = !props.showFormAmount ? false : true;
    const FormBalance = !props.showFormBalance ? false : true;

    
    // Prefill Fields for User Profile
    let predefinedValue
    if (NameValue) { 
        predefinedValue = NameValue
    } else {
        predefinedValue = ''
    }
    const [name, setName]                       = React.useState(predefinedValue);


    if (EmailValue) {
        predefinedValue = EmailValue
    } else {
        predefinedValue = ''
    }

    const [email, setEmail]                     = React.useState(predefinedValue);

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
        let response 

        if (!field) {
            response = {details: {status: 'error', message: `${label} missing`}};
            setTimeout(() => setStatus(response.details), 3000);
            console.log(status)
            return false;
        }
        // verify that the password has at least 8 characters
        if (label === 'password') {
            if (field.length < 8 ) {
                response = {details: { status: 'error', message: `Your ${label} must contain of at least 8 characters.`}}
                setStatus(response.details)
                console.log(status)
                return false;
            };
            return true
        }

        //verify that numbers are numbers
        if (label === 'Amount') {
            if (isNaN(field)) {
                response = {details: { status:'error', message: `${label} should consist only of integers.`}};
                setStatus(response.details);
                console.log(status)
                return false;
            };
            return true
        }

        return true
    }

    //update UserContext
    function updateUserContext(object){
        if(!ctx) {
            return false
        } else {
        // Update User Context
        ctx.user        = object.user
        ctx.email       = object.email
        ctx.role        = object.role
        ctx.account     = object.account
        ctx.balance     = object.balance
        return true
        }
    }

    //update authentication status
    function updateAuthentication(token){
        if(!token.accessToken) {
            return false
        } else {
            auth.isAuthenticated = true;
            auth.token = token
        }
    }

    //create new user account
    function createUser(name, email, password) {
        console.log('Storing user details');
        const url = `${base_uri}/account/create/${name}/${email}/${password}`;
        (async () => {
            var res     = await fetch(url);
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                setShow(data.details.show);
            };
            setStatus(data.details);
        })();
    }

        //update Profile
        function updateUser(name, email, password) {
            console.log('Updating User Profile');
            const url = `${base_uri}/account/update/${name}/${email}/${password}`;
            (async () => {
                var res     = await fetch(url);
                var data    = await res.json();
                console.log(`Returned Data ${JSON.stringify(data)}`)
                if(data.details.status === 'success') {
                    // setShow(data.details.show);
                };
                setStatus(data.details);
            })();
        }

    //login to user account
    function loginUser(email, password) {
        
        console.log('Logging in user');
        const url = `${base_uri}/account/login/${email}/${password}`;
        (async () => {
            var res     = await fetch(url);
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                // Update User Context
                window.localStorage.setItem('user', JSON.stringify(data.userinfo));
                window.localStorage.setItem('token', JSON.stringify(data.token));
                window.localStorage.setItem('isLoggedIn', true );
                updateUserContext(data.userinfo);

                //update authentication status
                updateAuthentication(data.token);
                setShow(data.details.show);
                setStatus(data.details);
                navigate('/Profile')
                
            } else {
                setStatus(data.details)
            };
        })();
    }

    //deposit amount to user account
    function depositAmount(user, amount, label) {
        let token = auth.token.accessToken;

        console.log(`Depositing ${amount} $ to ${user}'s account.`);
        const url = `${base_uri}/deposit/${user}/${amount}`;
        (async () => {
            var res     = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                // Record Transaction
                recordTransaction(label, user, data.userinfo._id, data.userinfo.account, amount, data.userinfo.balance)
                
                // Update User Context
                updateUserContext(data.userinfo);
                
                // Change Form View
                setShow(data.details.show);

            };
            setStatus(data.details);
        })();
    }

     //widthdraw amount from user account
     function widthdrawAmount(user, amount, label) {
        let token = auth.token.accessToken;

        console.log(`Withdrawing ${amount} $ from ${user}'s account.`);
        const url = `${base_uri}/withdraw/${user}/${amount}`;
        (async () => {
            var res     = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
            var data    = await res.json();
            console.log(`Returned Data ${JSON.stringify(data)}`)
            if(data.details.status === 'success') {
                // Record Transaction
                recordTransaction(label, user, data.userinfo._id, data.userinfo.account, amount, data.userinfo.balance)
                
                // Update User Context
                updateUserContext(data.userinfo);
                
                // Change Form View
                setShow(data.details.show);

            };
            setStatus(data.details);
        })();   

    }

    function recordTransaction(label, user, id, account, amount, balance) {
        //record transaction
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        // set amount as deposit or withdrawal
        if(label === "Withdraw") {
            amount = -amount
        } else {
            amount = -amount
        };
        
        date = mm + '-' + dd + '-' + yyyy;

        console.log(`Recording Transaction for ${account} over the amount of ${amount} $ for ${user}'s account.`);
        const url = `${base_uri}/transaction/${label}/${date}/${id}/${user}/${account}/${amount}/${balance}`;
            (async () => {
                var res     = await fetch(url);
                var data    = await res.json();
                console.log(`Returned Data ${JSON.stringify(data)}`)
                if(data.details.status === 'success') {
                    // Record Transaction
                    console.log(`successfull recorded transaction for ${user}`)
                };
            })();
        };

    function handleSubmit(action) {

        //handle create account
        if (action === "accCreate") { 
                console.log(name, email, password);
                validateForm(name, 'name')
                validateForm(email, 'email')
                validateForm(password, 'password')

                if(validateForm(name, 'name') && validateForm(email, 'email') && validateForm(password, 'password') ) {
                    createUser(name, email, password);
                }
        };

        //handle account update
        if (action === "updateProfile") { 
            console.log(name, email, password);
            validateForm(name, 'name')
            validateForm(email, 'email')
            validateForm(password, 'password')

            if(validateForm(name, 'name') && validateForm(email, 'email') && validateForm(password, 'password') ) {
                updateUser(name, email, password);
            }
        };

        //handle login

        if (action === 'accLogin') { 
                console.log(email, password);
                if (!validateForm(email, 'Email')) return;
                if (!validateForm(password, 'Password')) return;
                loginUser(email, password);
        };

        //handle deposit
        if (action === 'accDeposit') {
            const user = ctx.email;
            console.log(amount);
            if(!user) return setStatus({details: {status: 'Error', message: 'It seems like you are not logged in yet! Log in to your account first'}})
            if (!validateForm(amount, 'Amount')) return;
            depositAmount(user, amount, "Deposit")
        }

        //handle widthdraw
        if (action ==='accWithdraw') {
            const user = ctx.email;
            console.log(amount);
            if(!user) return setStatus({details: { status: 'Error', message: `It seems like you are not logged in yet! Log in to your account first`}})
            if (!validateForm(amount, 'Amount')) return;
            widthdrawAmount(user, amount, "Withdraw")
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
                {EmailValue ?
                <input type="input" className="form-control" id="email" placeholder={EmailValue} value={email} onBlur={e => success('email', props.buttonAction, e.currentTarget.value)}  onChange={e => setEmail(e.currentTarget.value)} disabled />
                :
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onBlur={e => success('email', props.buttonAction, e.currentTarget.value)}  onChange={e => setEmail(e.currentTarget.value)} />
                }
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
                <div id="props.buttonLabel" className="form-text text-white fs-6 text">Balance: {JSON.stringify(ctx.balance)}</div>
                <label htmlFor={props.buttonLabel} className="form-label text-white">{props.buttonLabel}</label>
                <input type="input" className="form-control" id={props.buttonLabel} placeholder="Enter Amount" value={amount} onBlur={e => success('amount', props.buttonAction, e.currentTarget.value)} onChange={e => setAmount(e.currentTarget.value)} />
            </div>
            }


            {FormBalance &&
                <div className={classes()}>
                <h3>Hi {ctx.user}!</h3> 
                <p>Your current account Balance is {JSON.stringify(ctx.balance)}</p>
                </div>
            }

            <button type="submit" id="button" className="btn btn-light" onClick={e => handleSubmit(props.buttonAction)} disabled={disabled}>{props.buttonLabel}</button>
            {status.status === 'error' && <div id="status" className="form-text text-danger">{status.message}</div>}
            {status.status === 'success' && <div id="status" className="form-text text-green">{status.message}</div>}
            </form>
            
            ):(

            <div>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>{props.successButton}</button>
            {status.status === 'success' && <div id="status" className="form-text text-black">{status.message}</div>}
            </div>    
            )
    )
}

export { UserContext, UserConsumer, FormBody, Form };
