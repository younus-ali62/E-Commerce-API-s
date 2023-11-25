import jsonwebtoken from "jsonwebtoken";

export const jwtAuthorization=(req,res,next)=>{
    // read the token
    const jwtToken=req.cookies.jwtToken;
    
    if(jwtToken){
        //verify token
        try{
           const payload=jsonwebtoken.verify(jwtToken,"a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c") ;
           
        }catch(err){
            console.log(err);
            return res.status(401).send("User is Unauthorized!");
        }
    }else {
        return res.status(401).send("User is Unauthorized!");
    }
    next();

}