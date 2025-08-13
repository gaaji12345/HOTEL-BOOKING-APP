import express,{Request,Response} from "express";
import Hotel from "../models/hotel";
import {query} from "express-validator";
import {HotelSearchResponse} from "../shared/types";

const router = express.Router();

router.get('/search', async (req:Request,res:Response ) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );

        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query)
            .skip(skip)
            .limit(pageSize);

        const total = await Hotel.countDocuments(query);

        const response :HotelSearchResponse= {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.json(response);



    }catch (error) {
        console.log(error);
    }

})

export default router;