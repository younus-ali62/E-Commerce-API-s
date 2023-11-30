
import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      
        cb(null,"Public/");
        
    },
    
    filename:(req,file,cb)=>{
        const timestamp=Date.now();
        const originalName=file.originalname;
        const fileName=timestamp + "-" + originalName;
        cb(null,fileName);
    }
    
});

export const fileUpload=multer({storage:storage});