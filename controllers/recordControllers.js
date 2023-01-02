const User = require("../models/user")
const Record = require("../models/record")
const { query } = require("express")
const {inSteps,inMeters,inCalories} =require('../estimators')

//filter by user
exports.all_records = (req,res,next)=>{
  Record.find()
  .sort({createdAt:-1})
  .exec(function(err,records){
if (err){
    return next(err)
}
let total = 0;
records.map((x)=>{total+= x.floor})
console.log(`Floor:${total}`)
console.log(`Height:${inMeters(total)} m`)
console.log(`Steps:${inSteps(total)} steps`)
console.log(`Calories: ${inCalories(total)} calories`)
const height = inMeters(total)
const steps = inSteps(total)
const calories = inCalories(total)
res.json({total,height,steps,calories})
  })
}

// monthly 
exports.monthly_records = (req,res,next)=>{
Record.aggregate([{$group:{
  _id:{
      year:{$year:"$date"},
      month:{$month:'$date'},
  },
  total_floors_month:{$sum:"$floor"}
}}]).exec(function(err,records){
  if (err){
      return next(err)
  }
res.json(records)
  })
}

// daily 
exports.daily_records = (req,res,next)=>{
  Record.aggregate([{$sort:{date:1}},{$group:{
    _id:{
        year:{$year:{date:'$date',timezone: "America/Chicago"}},
        month:{$month:{date:'$date',timezone: "America/Chicago"}},
        day:{$dayOfMonth:{date:'$date',timezone: "America/Chicago"}}
    },
    total_floors_day:{$sum:"$floor"}
  }}]).exec(function(err,records){
    if (err){
        return next(err)
    }
  res.json(records)
    })
  }

