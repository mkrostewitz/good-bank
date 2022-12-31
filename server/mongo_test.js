const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://intutecmitadmin:kLjINXIPZHrDoVNY4h683z7pB216HEwZfgzvGJx2XAtPMdn2J0RXVOWg1AmzvlabKqeZO6Xby8SEACDbFHXxgA==@intutecmitadmin.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@intutecmitadmin@';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected to mongoDB')

    // database Name
    const dbName = 'goodbank_db';
    const db = client.db(dbName);
    
    // new user
    var name = 'user' + Math.floor(Math.random() * 10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('users');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log('Document Inserted');
    })

    //read users
    var users = db
    .collection('users')
    .find()
    .toArray(function(err, docs){
        console.log('Collection: ', docs)

        //clean up
        client.close();
    })
})

