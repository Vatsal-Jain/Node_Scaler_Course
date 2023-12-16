function Middleware1(req,res,next){
    console.log("custom middleware")
    next()
  
  }
  
function Middleware2(req,res,next){
    console.log("custom second middleware")
    next()
  
  }

  module.exports ={
    Middleware1,
    Middleware2
  }