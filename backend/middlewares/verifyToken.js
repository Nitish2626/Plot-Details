import jwt from "jsonwebtoken";

export const verifyToken=(async(req,res,next)=>{
    try {
        const token= await req.signedCookies["token"];
        if(!token){
            res.send({"status":"404","msg":"Token Not Received"});
        }
        else{
            const verified= jwt.verify(token,`${process.env.JWT_SECRET}`);
            if(verified){
                res.locals.jwtData=verified;
            }
            else{
                res.send({"status":"401","msg":"Token Expired"});
            }
            next();
        }
    }
    catch (error) {
        console.log("Verify Token API",error);
        res.status(400).send("Token Verification Failed");
    }
});