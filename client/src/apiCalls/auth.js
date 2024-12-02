import { axiosInstance } from ".";

export const signUp = async (user)=>{
    try{
        const response = await axiosInstance.post('/api/auth/signup', user);
        return response.data;
    }catch(err){
        return err;
    }
}

export const logIn = async(user)=>{
    try{
        const response = await axiosInstance.post('/api/auth/login', user);
        return response.data;
    }catch(err){
        return err;
    }
}
