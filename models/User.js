const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
  },			
    role: {
		 type: String, 
		 enum: ["MANAGER","STAFF", "ADMIN"] 
	},
	password: {
		type: String,
		required: true
	},
	departmentId:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
	},
	isActive:{
		type:Boolean,
		default:true,
	}
},
{ timestamps: { createdAt: 'systemCreatedAt', updatedAt: 'systemUpdatedAt' } }
);

const User = mongoose.model("User", userModel);
module.exports = User;