

import express from "express";

const app=express();
const port=3000;
app.get("/",(req,res)=>{
    res.send("Weclome to E commerce API")
});


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})