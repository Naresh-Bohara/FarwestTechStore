import HttpService from "../../services/http.service";

class BrandService extends HttpService {
    brandCreate = async(data)=>{
        try{
            const response = await this.postRequest("/brand", data, {
                auth: true,
                file: true
            })

            return response;
        }catch(exception){
            throw exception;
        }
    }

    getBrandList = async({page=1, search=null})=>{
        try{
            let params = {}
            if(search){
                params = {
                    ...params,
                    keyword: search
                }
            }
            const response = await this.getRequest("/brand", {
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

    deleteBrand = async(brandId)=>{
        try{
            const response = await this.deleteRequest("/brand/"+brandId, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getBrandDetailById = async(id)=>{
        try{
            const response = await this.getRequest("/brand/"+id, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    brandEdit = async(id, data)=>{
        try{
            const response = await this.putRequest("/brand/"+id, data, {
                auth: true,
                file: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getBrandsWithProducts = async()=>{
        try{
            let response = await this.getRequest("/brand/home/with-products");
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getForHomePage = async()=>{
        try{
            let response = await this.getRequest("/brand/home-brand");
            return response;
        }catch(exception){
            throw exception;
        }
    }
}

const brandSvc = new BrandService();

export default brandSvc;