var express = require('express');
var router = express.Router();
const recordController = require('../controllers/recordControllers');
const jwt = require('jsonwebtoken');


/* GET stats */
router.get('/', verifyToken,recordController.all_records);
router.get('/daily',verifyToken,recordController.daily_records);
router.get('/weekly',verifyToken,recordController.weekly_records);
router.get('/monthly',verifyToken,recordController.monthly_records);

//* POST records 
router.post('/record',verifyToken,recordController.record)


// verify token 

function verifyToken(req,res,next){
    const auth=req.body['token'] || req.headers["authorization"];
    if(typeof auth !=='undefined'){
        jwt.verify(auth,process.env.JWT,(err,authData)=>{
           if (err){
            return res.status(500).send({auth:false, message:err})
           }
           res.locals.user = authData
           next() 
        }) 
    } else {
        res.sendStatus(401).send({
        auth:false,
        message:"Token required"
        })
    }
}

module.exports = router;
