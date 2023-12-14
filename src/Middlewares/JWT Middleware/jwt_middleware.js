import jsonwebtoken from "jsonwebtoken";
import ApplicationError from "../../Error_Handler/error_handler.js";
export const jwtAuthorization=(req,res,next)=>{
    // read the token
    // const jwtToken=req.cookies.jwtToken;
    const jwtToken=req.headers.authorization;
    if(jwtToken){
        //verify token
        try{
           const payload=jsonwebtoken.verify(jwtToken,process.env.JWT_SECRET) ;
           req.userId=payload.userId;
           console.log(payload);
        }catch(err){
            throw new ApplicationError("User is Unauthorized!",401)
          
        }
    }else {
        throw new ApplicationError("User is Unauthorized!",401)
    }
    next();
}