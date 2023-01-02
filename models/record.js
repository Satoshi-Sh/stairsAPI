const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const RecordSchema = new Schema({
    floor: {type:Number,
            required:true,
            integer:true},
    user: {type:Schema.Types.ObjectId, ref:"User",required:true},
    date: { type:Date, required:true}
}
)

// Export model 
module.exports = mongoose.model("Record",RecordSchema)