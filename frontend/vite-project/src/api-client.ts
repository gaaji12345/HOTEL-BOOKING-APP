import type {RegisterFormData} from "./pages/Register.tsx";
import type {SignInFormData} from "./pages/SignIn.tsx";
import type {HotelType} from '../../../backendnew/src/shared/types.ts';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

// export const register =async (formData:RegisterFormData)=>{
//     const response= await fetch(`${API_BASE_URL}/api/users/register`, {
//         method: 'POST',
//         headers: new Headers({'Content-Type': 'application/json'}),
//         body: JSON.stringify(formData),
//
//     });
//
//     const responseBody=await response.json();
//
//     if(!response.ok){
//         throw new Error(responseBody.message);
//     }
//
//
// };

export const register = async (formData: RegisterFormData) => {

        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message || 'Registration failed');
        }

};


export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST',


    })
    if (!response.ok) {
        throw new Error("Token during logout");
    }
}


export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
};



export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
};








