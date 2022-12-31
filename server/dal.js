const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://intutecmitadmin:kLjINXIPZHrDoVNY4h683z7pB216HEwZfgzvGJx2XAtPMdn2J0RXVOWg1AmzvlabKqeZO6Xby8SEACDbFHXxgA==@intutecmitadmin.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@intutecmitadmin@';
// const url           = 'mongodb://localhost:27017';
let db              = null;


MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to the db server')

    // connect to the bad bank database
    db = client.db('goodbank_db');
})

// create a new user
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const accno = Math.floor(Math.random() * 1000000000);
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, account: accno, role: "customer"};
        collection.insertOne(doc, {W:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    });
}

// search user account
function userSearch(email){
    return new Promise((resolve, reject) => {
        const users = db
        .collection('users')
        .find({email: email})
        .toArray(function(err, user) {
            err ? reject(err) : resolve(user);
        });
    });
};

// login to user account
function userLogin(email){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const user = {email: email}
        const doc = {$set: {loggedIn: true}};
        collection.updateOne(user, doc, function(err, result){
            err ? reject(err) : resolve(result);
        });
    });
};

// logout of user account
function userLogout(email){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const user = {email: email}
        const doc = {$set: {loggedIn: false}};
        collection.updateOne(user, doc, function(err, result){
            err ? reject(err) : resolve(result);
        });
    });
};

// update user account
function userUpdate(email, name, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const user = {email: email}
        const doc = {$set: {name: name, email: email, password: password}};
        collection.updateOne(user, doc, function(err, result){
            err ? reject(err) : resolve(result);
        });
    });
};

// deposit funds to user account
function updateBalance(email, newBalance){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const user = {email: email}
        const doc = {$set: {balance: newBalance}};
        collection.updateOne(user, doc, function(err, result){
            err ? reject(err) : resolve(result);
        });
    });
};

// record transaction
function newTransaction(label, date, id, user, account, amount, balance){
    return new Promise((resolve, reject) => {
        const collection = db.collection('transactions');
        const doc = {date, account, label, user, amount, balance};
        collection.insertOne(doc, {W:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    });
};

// all users
function all() {
    return new Promise((resolve, reject) => {
        const users = db
        .collection('users')
        .find({})
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });
};

// user transactions
function userTransactions(user) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('transactions');
        collection
        .find({user: user})
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });    
}

module.exports = {create, all, userSearch,  updateBalance, newTransaction, userLogin, userLogout, userTransactions,userUpdate};