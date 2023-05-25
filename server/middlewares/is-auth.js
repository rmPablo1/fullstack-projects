const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]
  console.log("in middleware auth",token)
  let decodedToken
  try{
    decodedToken = jwt.verify(token, "ajfajfajfpafkoakapokkoakok" )
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 403
    }
    next(err)
  }
  if (!decodedToken){
    const error = new Error("Unauthorized")
    error.statusCode = 403
    throw error
  }
  console.log("decodedToken", decodedToken)

  req.userId = decodedToken.userId
  next()
}
