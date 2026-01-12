const jwt= require('jsonwebtoken');



  const generateAccessToken=({id,role,department,branch})=>{
      return jwt.sign(
      { sub: id, role: role, department: department ?? null, branch: branch ?? null },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

const generateRefreshToken=({id})=>{
    return jwt.sign(
   { sub: id },
   process.env.REFRESH_JWT_SECRET,
   { expiresIn: '7d' }
 );
}   

module.exports={
    generateAccessToken,
    generateRefreshToken
}