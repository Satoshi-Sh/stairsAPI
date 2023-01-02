const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
},
function (username,password,done){
    return User.findOne({username},function(err,user){
        if (err){return done(err);}
        if(!user){return done(null,false,{message:'User not found'})}
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                return done(null,user)
            }
            return done(null,false,{message:'Password is Wrong'})
        })
    })

}
))