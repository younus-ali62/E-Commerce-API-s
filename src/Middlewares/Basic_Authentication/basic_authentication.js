import Users from "../../Features/Users/UserModel/user_model.js";
export const basic_authorization=(req,res,next)=>{

    const authHeader=req.headers["authorization"];
    if(authHeader){
      
        const encoded_credentials=authHeader.replace("Basic"," ");
        
        //decoded encoded_credentials
        const decoded_credentials=Buffer.from(encoded_credentials,"base64").toString("utf8");
        const final_decoded_credentials=decoded_credentials.split(":");
        
        const result=Users.userAuthorized(final_decoded_credentials[0],final_decoded_credentials[1]);
        if(result){
            next();
        }
        else {
            res.status(401).send("User is not authorized");
        }
    }
    else {
        res.status(401).send("User is not authorized")
    }

}   