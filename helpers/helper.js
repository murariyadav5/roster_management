const bcrypt = require('bcrypt');

// Function to encrypt a password
const encryptPassword=async (password) =>{
  try {
    const saltRounds = 10; // The number of salt rounds determines the computational cost, 10 is a good default value
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Function to compare a password with its hash
const comparePassword=async (hashedPassword,password)=> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const getCurrentTimeInHHMMSS=() =>{
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

module.exports={encryptPassword, comparePassword,getCurrentTimeInHHMMSS};
