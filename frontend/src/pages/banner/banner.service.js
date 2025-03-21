import HttpService from "../../services/http.service";

class BannerService extends HttpService {
    bannerCreate = async(data)=>{
        try{
            const response = await this.postRequest("/banner", data, {
                auth: true,
                file: true
            })

            return response;
        }catch(exception){
            throw exception;
        }
    }

    getBannerList = async({page=1, search=null})=>{
        try{
            let params = {}
            if(search){
                params = {
                    ...params,
                    keyword: search
                }
            }
            const response = await this.getRequest("/banner", {
                auth: true,
                params: {
                    ...params,
                    page: page
                }
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    deleteBanner = async(bannerId)=>{
        try{
            const response = await this.deleteRequest("/banner/"+bannerId, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getBannerDetailById = async(id)=>{
        try{
            const response = await this.getRequest("/banner/"+id, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    bannerEdit = async(id, data)=>{
        try{
            const response = await this.putRequest("/banner/"+id, data, {
                auth: true,
                file: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getForHomePage = async()=>{
        try{
            let response = await this.getRequest("/banner/home-banner");
            return response;
        }catch(exception){
            throw exception;
        }
    }
}

const bannerSvc = new BannerService();

export default bannerSvc;