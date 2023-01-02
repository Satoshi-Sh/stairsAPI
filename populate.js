#! /usr/bin/env node

console.log('This script populates some users and records to your database');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Record = require('./models/record')
var User = require('./models/user')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// remove collections 
async function clearCollections() {
    const collections = db.collections;
  
    await Promise.all(Object.values(collections).map(async (collection) => {
        await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    }));
  }


var users = []
var records = []


function createUser(username,password,cb){
    var user = new User({username,password})
    user.save(function(err){
        if(err){
            cb(err,null)
            return;
        }
        console.log('New User: ' +user)
        users.push(user)
        cb(null,user)
    })
}

function recordCreate(floor,user,date,cb) {
  postDetail = {
    floor,
    user,
    date
  } 
  var record  = new Record(postDetail);    
  record.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New record: ' + record);
    records.push(record)
    cb(null, record)
  }  );
}

function createUsers(cb){
    async.series([
        function(callback){
            createUser('Satoshi','123456',callback)
        }
    ],
    cb
)}

function createRecords(cb) {
    async.parallel([
        function(callback) {
          recordCreate(25, users[0], "2022-12-31T18:48:00.000Z",callback);
        },
        function(callback) {
            recordCreate(22 , users[0], "2022-12-30T14:48:00.000Z", callback);
          },
          function(callback) {
            recordCreate(10 , users[0], "2022-12-30T12:48:00.000Z", callback);
          },
          function(callback) {
            recordCreate(22 , users[0], "2023-01-01T14:48:00.000Z", callback);
          },
        ],
        // optional callback
        cb);
}


async.series([
        clearCollections,
        createUsers,
        createRecords,
    ],
    // Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('Items: '+records);
            
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
