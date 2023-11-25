import jsonwebtoken from "jsonwebtoken";

export const jwtAuthorization=(req,res,next)=>{
    // read the token
    const token=req.headers.authorization;
    if(token){
        //verify token
        try{
           const payload=jsonwebtoken.verify(token,"a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c") ;
           console.log(payload);
        }catch(err){
            console.log(err);
            return res.status(401).send("User is Unauthorized!");
        }
    }else {
        return res.status(401).send("User is Unauthorized!");
    }
    next();

}