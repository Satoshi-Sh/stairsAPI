const User = require("../models/user")
const Record = require("../models/record")
const { query } = require("express")

//filter by user
exports.all_records = (req,res,next)=>{
  Record.find()
  .sort({createdAt:-1})
  .exec(function(err,all_records){
if (err){
    return next(err)
}
res.json(all_records)
  })
}
