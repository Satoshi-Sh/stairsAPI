
const bcrypt = require('bcrypt')
var userArgs = process.argv.slice(2);

const saltRounds = 10;
var password = userArgs[0];

bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
            bcrypt.compare(password,hash,function(err,result){
                if(result){
                    console.log('fine')
                }
            })
   });
});





