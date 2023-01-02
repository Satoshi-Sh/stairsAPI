const User = require("../models/user")
const Record = require("../models/record")
const { query } = require("express")
const {estimate} =require('../estimators')
const mongoose = require('mongoose')

//filter by user
exports.all_records = (req,res,next)=>{
const id = mongoose.Types.ObjectId(res.locals.user._id)
Record.aggregate([{ $match: {"user":id } },{$group:{
  _id:null,
  total_floors:{$sum:"$floor"}
}}]).exec(function(err,records){
  if (err){
    return next(err)
}
records = estimate(records)
res.json(records)
})
}

// monthly 
exports.monthly_records = (req,res,next)=>{
const id = mongoose.Types.ObjectId(res.locals.user._id)
Record.aggregate([{ $match: {"user":id } },{$sort:{date:1}},{$group:{
  _id:{
      year:{$year:"$date"},
      month:{$month:'$date'},
  },
  total_floors:{$sum:"$floor"}
}}]).exec(function(err,records){
  if (err){
      return next(err)
  }
records = estimate(records)
res.json(records)
  })
}

// weekly 
exports.weekly_records = (req,res,next)=>{
  const id = mongoose.Types.ObjectId(res.locals.user._id)
  Record.aggregate([{ $match: {"user":id } },{$sort:{date:1}},{$group:{
    _id:{
        year:{$year:{date:'$date'}},
        week:{$week:{date:'$date'}}
    },
    total_floors:{$sum:"$floor"}
  }}]).exec(function(err,records){
    if (err){
        return next(err)
    }
  records = estimate(records)
  res.json(records)
    })
  }


// daily 
exports.daily_records = (req,res,next)=>{
  const id = mongoose.Types.ObjectId(res.locals.user._id)
  Record.aggregate([{ $match: {"user":id } },{$sort:{date:1}},{$group:{
    _id:{
        year:{$year:{date:'$date'}},
        month:{$month:{date:'$date'}},
        day:{$dayOfMonth:{date:'$date'}}
    },
    total_floors:{$sum:"$floor"}
  }}]).exec(function(err,records){
    if (err){
        return next(err)
    }
  records = estimate(records)
  res.json(records)
    })
  }


  // create a new record 

  exports.record = (req,res,next) =>{
    console.log(req.body)
    record = new Record({
      floor: req.body.floor,
      user: res.locals.user,
      date: req.body.date
    }).save((err)=>{
      if (err){
        return next(err)
      }
      res.json({
        message:`Recorded ${req.body.floor} at ${req.body.date}`
      })
    })

  }

