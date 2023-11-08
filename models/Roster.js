const mongoose = require('mongoose');

const rosterModel = new mongoose.Schema({
	userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
	shiftId:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'shift'
	},
	workingDay: {
		type: String,
        enum: ["MONDAY","TUESDAY","WEDNESDAY"," THURSDAY","FRIDAY","SATURDAY","SUNDAY"] ,
	},  
	attendanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendance' 
    },
    date: { type: String },
},
{ timestamps: { createdAt: 'systemCreatedAt', updatedAt: 'systemUpdatedAt' } }
);

const Roster = mongoose.model("Roster", rosterModel);
module.exports = Roster;