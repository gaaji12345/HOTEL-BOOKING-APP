import express,{Request,Response} from "express";
import multer from'multer';
const router = express.Router();
import cloudinary from 'cloudinary'
import Hotel, {HotelType} from "../models/hotel";
import verifyToken from "../middleware/auth";
import {body} from "express-validator";

const storage=multer.memoryStorage();

const upload=multer({storage:storage,
    limits:{fileSize:5 * 1024 * 1024},
});

// @ts-ignore
router.post('/',verifyToken ,
    [body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be a number"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles",6 ), async (req:Request, res:Response) =>{
        try{
            const imageFiles=req.files as Express.Multer.File[];
            const newHotel:HotelType=req.body;


            const uploadPromises=imageFiles.map(async (image) => {
                const b64=Buffer.from(image.buffer).toString("base64");
                // let dataURI="data:"+image.mimetype+";base64"+b64;
                const dataURI = "data:" + image.mimetype + ";base64," + b64;

                const res =await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });

            const imageUrls=await Promise.all(uploadPromises);

            // @ts-ignore
            newHotel.imageUrls=imageUrls;
            newHotel.lastUpdated=new Date();
            if (req.userId != null) {
                newHotel.userId = req.userId;
            }

            const hotel=new Hotel(newHotel);
            await hotel.save();

            res.status(201).json(hotel);

        }catch(e){
            console.log("Error creating hotel",e);
            res.status(500).json({message:"Something went wrong"});

        }

    })

// @ts-ignore
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});



export default router;
