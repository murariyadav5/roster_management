const { User } = require('../models');
const { getUserById ,getDepartmentById,encryptPassword,comparePassword} = require('../helpers');
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
  updateUser,
  updateDepartment,
  getStaffForManager,
};

