const mongoose = require('mongoose');

const departmentModel = new mongoose.Schema({
	department:{
		type: String,
	},
},
);

const Department = mongoose.model("Department", departmentModel);
module.exports = Department;