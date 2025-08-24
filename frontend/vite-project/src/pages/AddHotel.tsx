import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm.tsx";
import {useMutation} from "react-query";
import {useAppContext} from "../contexts/AppContext.tsx";
import * as apiClient from '../api-client.ts'

const AddHotelPage = () => {
    const {showToast}=useAppContext();

    const {mutate,isLoading}=useMutation(apiClient.addMyHotel,{
        onSuccess: () => {
            showToast({message:"Hotel added successfully.",type:"SUCCESS"});
        },onError: () => {
            showToast({message: "Something went wrong.", type: "ERROR"});
        },
        });


    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };



    return<ManageHotelForm onSave={handleSave} isLoading={isLoading}/>

}

export default AddHotelPage