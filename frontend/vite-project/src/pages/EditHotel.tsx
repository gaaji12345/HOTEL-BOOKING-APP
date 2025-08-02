import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm.tsx";

const EditHotel=()=>{
    const {hotelId}=useParams();


    const { data: hotel } = useQuery(
        "fetchMyHotelById",
        () => apiClient.fetchMyHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    );


    // @ts-expect-error
    return <ManageHotelForm hotel={hotel}  />

}

export default EditHotel;