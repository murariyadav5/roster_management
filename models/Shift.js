const mongoose = require('mongoose');

const shiftModel = new mongoose.Schema({
	shift:{
		type: String,
        enum: ["MORNING","AFTERNOON","NIGHT"] 
	},
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    }
},
);

const Shift = mongoose.model("Shift", shiftModel);
module.exports = Shift;