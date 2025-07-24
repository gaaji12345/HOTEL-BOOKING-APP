import express,{Request,Response} from "express";
import multer from'multer';
const router = express.Router();
import cloudinary from 'cloudinary'

const storage=multer.memoryStorage();

const upload=multer({storage:storage,
    limits:{fileSize:5 * 1024 * 1024},
});

router.post('/',upload.array("imageFiles",6 ), async (req:Request, res:Response) =>{
    try{
        const imageFiles=req.files as Express.Multer.File[];
        const newHotel=req.body;

        const uploadPromises=imageFiles.map(async (image) => {
            const b64=Buffer.from(image.buffer).toString("base64");
            let dataURI="data:"+image.mimetype+";base64"+b64;
            const res =await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls=await Promise.all(uploadPromises);



    }catch(e){
        console.log("Error creating hotel",e);
        res.status(500).json({message:"Something went wrong"});

    }

})
