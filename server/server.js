const express               = require('express');
const app                   = express();
const cors                  = require('cors');
const dal                   = require('./dal');
const auth                  = require('./auth');


app.use(cors());

//<---------------------- PUBLIC ---------------------->
app.get('/', (req, res) => {
    res.send('Good Bank Database Server!')
  })

//<---------------------- CREATE USER ACCOUNT ---------------------->
app.get('/account/create/:name/:email/:password', function (req, res) {
    let name = req.params.name;
    let email = req.params.email;
    let password = req.params.password;

    let response;
    let message;
    let show;

    // check if user exists
    dal.userSearch(email)
    .then((doc) => {
        if (doc.length > 0 ) {
            // user exists already
            message = `User ${email} already exists. Use another Username or login.`;
            show = true; //show Form
            response =  {details: {status: 'error', show: show, message: message}}
            res.send(response);
        } else {
            // create a new user
            dal.create(name, email, password)
            .then((user)=> {
                // Return User Details

                console.log(`Response from Database Server ${user}`);
                // send response
                message = `Success: Congratulations ${name}. Your account was successfully created`;
                response = {details: { status: 'success', show: false, message: message}}
                res.send(response);
            });
        }
    });
});

//<---------------------- LOGIN TO USER ACCOUNT ---------------------->
app.get('/account/login/:email/:password', function (req, res) {

    let user        = req.params.email;
    let password    = req.params.password;

    let response;

    // check if user exists
    dal.userSearch(user)
    .then((doc) => {
        if (doc.length == 0 ) {
            // user not found
            response = {details: { status: 'error', message: `User ${user} could not be found`}}
            res.send(response);
        } else {
            // authenticate & authorize user
             res.send(auth.validateUser(user, password, 'User', doc));
        }
    });
});

//<---------------------- UPDATE USER ACCOUNT ---------------------->
app.get('/account/update/:name/:email/:password', function (req, res) {

    let username         = req.params.name;
    let useremail        = req.params.email;
    let userpass         = req.params.password;
    let response;

    // check if user exists
    dal.userSearch(useremail)
    .then((doc) => {
        if (doc.length == 0 ) {
            // user not found
            response = {details: { status: 'error', message: `User ${useremail} could not be found`}}
            res.send(response);
        } else {
            // update record
            dal.userUpdate(useremail, username, userpass)
            .then((result) => {
                response = {details: { status: 'success', message: `User ${username} updated`}}
                res.send(response)
            })
        }
    });
});

//<---------------------- LOGOUT OF USER ACCOUNT ---------------------->
app.get('/account/logout/:email', function (req, res) {
  user        = req.params.email;

  let response;

  // check if user exists
  dal.userSearch(user)
  .then((doc) => {
      if (doc.length == 0 ) {
          // user not found
          response = {details: { status: 'error', message: `User ${user} could not be found`}}
          res.send(response);
      } else {
          // update database login status
          dal.userLogout(user)
          .then((result) => {
            response = {details: { status: 'success', message: `User ${user} logged out`}}
            res.send(response, result)
          })
      };
  });
});

//<---------------------- CHECK IF USER IS AUTHENTICATED ---------------------->
app.get('/account/authenticate/:user', auth.authenticateJWT, function (req, res) {
  const { email } = req.user;
  const user = req.params.user;

  console.log(email)
  console.log(user)

    if (user === email) {
         return res.send(true);
    } else {
        return res.send(false)
    }
});

//<---------------------- LIST ALL DATAA ---------------------->
app.get('/account/all', auth.authenticateJWT, function (req, res) {
  const { role } = req.user;

    if (role !== 'employee') {
      return res.sendStatus(403);
    }

    dal.all()
    .then((docs) => {
        console.log(docs);
        let details = {status: 'success', show: false, message: `Successfully retracted all user data!`}
        res.send({details, docs});
    });
});

//<---------------------- RECORD TRANSACTION ---------------------->
app.get('/transaction/:label/:date/:id/:user/:account/:amount/:balance', function(req, res) {
  let label = req.params.label;
  let date = req.params.date;
  let id = req.params.id;
  let user = req.params.user;
  let account = req.params.account;
  let amount = req.params.amount;
  let balance = req.params.balance;
  let transactionAmount

  //Set Amount to +/- Depend on Deposit or Withdrawal
  if (label === "Withdraw") {
    transactionAmount = amount;
  } else {
    transactionAmount = -amount;
  }

  console.log(`About to create a transaction got ${label, date, id, user, account, transactionAmount, balance}`)
    dal.newTransaction(label, date, id, user, account, transactionAmount, balance)
    .then((docs) => {
        console.log(docs);
        let details = {status: 'success', show: false, message: `Successfully deposited ${amount} for ${user}. The new account balance is ${balance}`}
        res.send({details, docs});
    });
})


//<---------------------- DEPOSIT FUNDS TO USER ACCOUNT ---------------------->
app.get('/deposit/:email/:amount', auth.authenticateJWT, function (req, res) {
    let user        = req.params.email;
    let amount      = parseInt(req.params.amount);

    // check if user exists
    dal.userSearch(user)
    .then((doc) => {
        if (doc.length == 0 ) {
            // user not found
            response = {login: { status: 'error', message: `User ${user} could not be found`}}
            
        } else {
            // deposit funds
            let currrentBalance = parseInt(doc[0].balance);
            let newBalance = currrentBalance + amount;
            dal.updateBalance(user, newBalance)
            .then((result) => {
                if(result.acknowledged == true ) {
                    // --> Deposit was successfull
                    // Get updated user info
                    dal.userSearch(user)
                    .then ((doc) => {
                        let response = {details: {status: 'success', show: false, message: `Succesully deposited ${amount} to your account!`}, userinfo: doc[0]};
                        res.send(response)
                    });
                } else {
                    // --> Deposit unsucessfull 
                    let response = {details: {status: 'error', show: true, message: `There was an error while trying while trying to make a deposit.`}, info: {result}};
                    res.send(response)
                }
            });   
        };
    });
});

//<---------------------- WITHDRAW FUNDS FROM USER ACCOUNT ---------------------->
app.get('/withdraw/:email/:amount', auth.authenticateJWT, function (req, res) {
  let user        = req.params.email;
  let amount      = parseInt(req.params.amount);

  // check if user exists
  dal.userSearch(user)
  .then((doc) => {
      if (doc.length == 0 ) {
          // user not found
          response = {login: { status: 'error', message: `User ${user} could not be found`}}
          
      } else {
          // withdraw funds
          let currrentBalance = parseInt(doc[0].balance);
          let newBalance = currrentBalance - amount;
          if (newBalance < 0 ) {
            let response = {details: {status: 'error', show: true, message: `The withdrawal amount of ${amount} exceeds your available balance of ${currrentBalance}! Choose a smaller amount.`}, info: {result}};
            res.send(response)
          } else {
            dal.updateBalance(user, newBalance)
            .then((result) => {
                if(result.acknowledged == true ) {
                    // --> Withdrawal was successfull
                    // Get updated user info
                    dal.userSearch(user)
                    .then ((doc) => {
                        let response = {details: {status: 'success', show: false, message: `Succesully withdrew ${amount} from your account!`}, userinfo: doc[0]};
                        res.send(response)
                    });
                } else {
                    // --> Withdrawal unsucessfull 
                    let response = {details: {status: 'error', show: true, message: `There was an error while trying while trying to withdraw.`}, info: {result}};
                    res.send(response)
                }
            });
        }   
      };
  });

});


//<---------------------- LIST USER TRANSACTIONS ---------------------->
app.get('/account/transactions/:email', auth.authenticateJWT, function (req, res) {
  let user        = req.params.email;
  dal.userTransactions(user)
  .then((docs) => {
      console.log(docs);
      let details = {status: 'success', show: false, message: `Successfully retracted transactions for ${user}.`}
      res.send({details, docs});
  });
});

var port = 5000
app.listen(process.env.PORT || port);
console.log(`Application server running on port: ${port}`);