
import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // console.log('destination')
        cb(null,"Public/");
        
    },
    
    filename:(req,file,cb)=>{
        const timestamp=Date.now();
        const originalName=file.originalname;
        const fileName=timestamp + "-" + originalName;
        cb(null,fileName);
    }
    
});
// console.log("inside file uploaded")
export const fileUpload=multer({storage:storage});