const { User,Attendance ,Roster,Shift,Department} = require('../models');
const { getUserById ,getDepartmentById,encryptPassword,comparePassword, getCurrentTimeInHHMMSS ,getRosterById} = require('../helpers');
const { createToken }  = require('../auth');

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, password } = req.body;
        const encryptedPassword = await encryptPassword(password);
        const newUser = await new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            isActive: true,
            password: encryptedPassword  // hashed password
        }).save();
        res.status(200).json({ userId: newUser._id, msg: "User successfully registered." });
    } catch(error)  {
        console.log("error",error);
        res.status(400).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error("email is required");
        if (!password) throw new Error("password is required");
        const user = await User.findOne({ email: email});
        if(!user) throw new Error("User is not registered");
        const decryptedPassword=await comparePassword(user.password, password); // decrypt the hashed password
        if(decryptedPassword){
          const token = await createToken(user);
          res.status(200).json({ token: token, user: user, msg: "User successfully loggedIn." });
        }else{
          throw new Error("Password mismatch");
        }
    } catch(error)  {
        console.log("error",error);
        res.status(400).json({ msg: error.message });
    }
};

const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, role, password  ,departmentId } = req.body;
      const encryptedPassword = await encryptPassword(password);
      const newUser = await new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          role:role,
          password: encryptedPassword,  // hashed password
          departmentId: departmentId,
          isActive:true,
      }).save();
      res.status(200).json({ userId: newUser._id, msg: "User successfully created." });
  } catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const user = await getUserById(req.body.userId);
		if(!user) throw new Error("User not found");
		await User.findOneAndUpdate(user._id, req.body);
    res.status(200).json({ msg:"role successfully updated for user"});
} catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const getUser = async (req, res) => {
    try {
      const user = await getUserById(req.body.userId);
      if(!user) throw new Error("User is not available");
      res.status(200).json({ user: user });
  } catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await getUserById(req.query.userId);
		if(!user) throw new Error("User not found");
		await User.findOneAndUpdate(user._id, req.body);
    res.status(200).json({ userId: user._id,msg:"user successfully updated"});
} catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const deleteUser = async (req, res) => {
  try {
    const user = await getUserById(req.body.userId);
		if(!user) throw new Error("User is not present to delete");
    await User.findOneAndUpdate({_id:user._id}, {isActive:false});
    res.status(200).json({ user: user._id, msg: "User successfully deleted"});
} catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const createAttendance = async (req, res) => {
  try {
    const { userId, imagePath, status ,date} = req.body;
    const currentTime = getCurrentTimeInHHMMSS();
    const user = await getUserById(userId);
		if(!user) throw new Error("User is not valid to update");
    const attendance= await new Attendance({
      userId:user._id,
      imagePath:imagePath,
      status:status,
      date:date,
      punchingTime:currentTime
  }).save();
    await Roster.findOneAndUpdate({userId:userId,date:date},{attendanceId:attendance._id}); // updates attendance in roster
    res.status(200).json({ msg: "Attendance successfully created"});
} catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const createRoster=async(req, res) => {
  try{
    const { userId, shift, workingDay, date } = req.body;
    const user = await getUserById(userId);
		if(!user) throw new Error("User is not valid to create Roster");
	    await new Roster({
      userId:userId,
      shiftId:shift,
      workingDay:workingDay,
      date:date
  }).save();
    res.status(200).json({ msg: "Roster created successfully"});
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const editRoster=async(req, res) => {
  try{
    const { rosterId } = req.body;
    console.log("hi");
    const roster = await getRosterById(rosterId);
    console.log(roster);
		if(!roster) throw new Error("roster is not valid");
    await Roster.findOneAndUpdate({_id:rosterId}, req.body);
    res.status(200).json({ msg: "Roster edited successfully"});
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const viewRoster=async(req, res) => {
  try{
    const { rosterId } = req.query;
    const roster = await getRosterById(rosterId);
		if(!roster) throw new Error("roster is not valid");
    res.status(200).json({ roster: roster });
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const viewAssignedShiftForStaff=async(req, res) => {
  try{
    const { userId } = req.query;
    const user = await getUserById(userId);
		if(!user) throw new Error("User is not valid");
    const roster = await Roster.findOne({ userId: userId});
		if(!roster) throw new Error("User doesn't have any assigned shift");
    res.status(200).json({ assignedShiftDetails: roster });
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const updateDepartment=async(req, res) => {
  try{
    const user = await getUserById(req.body.userId);
		if(!user) throw new Error("User not found");
    const department=await getDepartmentById(req.body.departmentId);
    if(!department) throw new Error("Department not found");
		await User.findOneAndUpdate(user._id, req.body);
    res.status(200).json({ msg:"Department updated successfully" });
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};

const getStaffForManager=async(req, res) => {
  try{
    const user = await getUserById(req.body.userId);
		if(!user) throw new Error("User not found");
    const department=await getDepartmentById(req.body.departmentId);
    if(!department) throw new Error("Department not found");
		const staff=await User.find({departmentId:req.body.departmentId,role:"STAFF"});
    res.status(200).json({staffMembers:staff });
  }catch(error)  {
    console.log("error",error);
    res.status(400).json({ msg: error.message });
}
};



module.exports =  { 
  signUp,
  login,
  updateRole,
  createUser,
  deleteUser,
  getUser,
  updateUser ,
  createAttendance,
  createRoster,
  editRoster,
  viewRoster,
  viewAssignedShiftForStaff,
  updateDepartment,
  getStaffForManager,
};

