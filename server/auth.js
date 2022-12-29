const express               = require('express');
const bodyParser            = require('body-parser');
const jwt                   = require('jsonwebtoken');
const dal                   = require('./dal');

const app                   = express();

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
const refreshTokens = [];

app.use(bodyParser.json());

//<---------------------- ASSIGN SECURITY TOKEN---------------------->
function createToken (username, useremail, userrole) {
    // generate an access token
    const accessToken = jwt.sign({ name: username, email: useremail, role: userrole }, accessTokenSecret, { expiresIn: '20m' });
    const refreshToken = jwt.sign({ name: username, email: useremail, role: userrole }, refreshTokenSecret);

    refreshTokens.push(refreshToken);

    let response = {
        accessToken,
        refreshToken
    }

    return response;
}

//<---------------------- AIUTHENTICATe JWT ---------------------->
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

//<---------------------- VALIDATE USER ACCOUNT ---------------------->
function validateUser(user, password, label, user_data) {
    let response;

    for (let i = 0; i < user_data.length; i++) {
        if ( user_data[i].email == user){
 
            // verify user password
            if (user_data[i].password == password) {
                // update database login status
                dal.userLogin(user)

                let username = user_data[i].name;
                let userrole = user_data[i].role;
                let useremail = user_data[i].email;
                let accountno = user_data[i].account;
                let accbalance = user_data[i].balance;

                let message = `User ${username} successfully authenticated as ${userrole } using ${useremail}!`;
                let userinfo = {user: username, email: useremail, role: userrole, account: accountno, balance: accbalance};

                let token = createToken(username,useremail,userrole);
                
                response = {details: {status: 'success', show: false, message: message}, token, userinfo};

                // generate access token
                return response

            } else {
                let message = `${label} password incorrect.`;
                response = {details: {status: 'error', show: true, message: message}}
            }
        } else {

        }
        return response
    };
    // user was not found
    message = `Error: ${label} not found!`;
    response = {details: { status: 'error', show: true, message: message }}
    return response
}
module.exports = {validateUser, authenticateJWT};