import { axiosInstance } from ".";

export const getloggedUser = async ()=>{
    try{
        const response = await axiosInstance.get('/api/user/get-logged-user');
        return response.data;
    }catch(err){
        return err;
    }
}