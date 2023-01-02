var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require("passport")

router.post('/login',function(req,res,next){
  passport.authenticate('local', {session:false},(err,user,info)=>{
      if (err || !user){
          return res.status(400).json({
              message: 'Something is not right',
              user:user
          })
      }
      req.login(user,{session:false},(err)=>{
          if(err){
              res.send(err)
          }
      
      const token = jwt.sign(JSON.stringify(user),process.env.JWT);
      
      return res.json({user,token})
    })
  })(req,res)
})

module.exports = router;
