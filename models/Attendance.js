const mongoose = require('mongoose');
const attendanceModel = new mongoose.Schema({
	userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
	imagePath: {
		type: String,
		required: true
	},			
    status: {
		type: String, 
		enum: ["PRESENT","ABSENT"] 
	},
    date: { type: String },
	punchingTime:{
	    type: String,
	    required:true
    },
},
{ timestamps: { createdAt: 'systemCreatedAt', updatedAt: 'systemUpdatedAt' } }
);

const Attendance = mongoose.model("Attendance", attendanceModel);
module.exports = Attendance;