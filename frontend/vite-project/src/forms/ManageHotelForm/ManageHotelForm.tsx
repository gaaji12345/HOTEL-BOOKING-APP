import {FormProvider, useForm} from "react-hook-form";
import DetailsSection from "./DetailsSection.tsx";
import TypeSection from "./TypeSection.tsx";
import FacilitiesSection from "./FacilitiesSection.tsx";
import GuestsSection from "./GuestsSection.tsx";
import ImageSection from "./ImageSection.tsx";
import  {type HotelType} from "../../../../../backendnew/src/shared/types.ts";
import {useEffect} from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
};




const ManageHotelForm = ({onSave, isLoading,hotel  }: Props) => {
    const formMethods=useForm<HotelFormData>()
    const {handleSubmit,reset}=formMethods;

    useEffect(()=>{
        reset(hotel);
    },[hotel,reset]);

    const onSubmit=handleSubmit((formDataJson:HotelFormData)=>{

      console.log(formDataJson);
      const fromData=new FormData();

      if (hotel){
          fromData.append("hotelId",hotel._id);
      }
      fromData.append("name",formDataJson.name);
      fromData.append("city",formDataJson.city);
      fromData.append("country",formDataJson.country);
      fromData.append("description",formDataJson.description);
      fromData.append("type",formDataJson.type);
      fromData.append("pricePerNight",formDataJson.pricePerNight.toString());
      fromData.append("starRating",formDataJson.starRating.toString());
      fromData.append("adultCount",formDataJson.adultCount.toString());
      fromData.append("childCount",formDataJson.childCount.toString());

        // formDataJson.facilities.forEach((facility, index) => {
        //     fromData.append(`facilities[${index}]`, facility);
        // });
        //
        // Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        //     fromData.append("imageFile",imageFile);
        // });

        // ✅ Append facilities correctly
        formDataJson.facilities.forEach((facility, index) => {
            fromData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                fromData.append(`imageUrls[${index}]`, url);
            });
        }

        // ✅ Correct field name for images
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            fromData.append("imageFiles", imageFile);
        });

        onSave(fromData);

    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestsSection/>
                <ImageSection/>

                <span className="flex justify-end">
                    <button disabled={isLoading}

                        type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
                        {isLoading?"Saving...":"Save..."}
                    </button>

                </span>


            </form>
        </FormProvider>
    )
}

export default ManageHotelForm
