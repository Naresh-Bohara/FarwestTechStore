import HttpService from "../../services/http.service";

class AuthService extends HttpService {
    registerUser = async(data)=>{
       try{
        const response = await this.postRequest("/auth/register", data, {file: true})
        return response;
       }catch(exception){
        throw exception
       }
    }

    activateUserByOtp = async(data)=>{
        try{
            const response = await this.postRequest("/auth/activate", data)
            return response
        }catch(exception){
            throw exception  
        }
    }

    loginUser = async(credentials) =>{
        try{
            const response = await this.postRequest("/auth/login", credentials)
            return response
        }catch(exception){
            throw exception
        }
    }

    getLoggedInUserDetail = async()=>{
        try{
            const response = await this.getRequest("/auth/me", {auth:true});
            return response;
        }catch(exception){
           if(exception.data.status === "TOKEN_EXPIRED"){
            await this.refreshToken();
            return await this.getLoggedInUserDetail();
           }else{
               throw exception
           }
        }
    }

    refreshToken =async ()=>{
        try{
            const response = await this.getRequest("/auth/refresh", {refresh:true})
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("refresh", response.data.refreshToken)

            return response;
        }catch(exception){
            throw exception
        }
    }
}

const authSvc = new AuthService();
export default authSvc