import HttpService from "../../services/http.service";

class CategoryService extends HttpService {
    categoryCreate = async(data)=>{
        try{
            const response = await this.postRequest("/category", data, {
                auth: true,
                file: true
            })

            return response;
        }catch(exception){
            throw exception;
        }
    }

    getCategoryList = async({page=1, limit=10, search=null})=>{
        try{
            let params = {}
            if(search){
                params = {
                    ...params,
                    keyword: search
                }
            }
            const response = await this.getRequest("/category", {
                auth: true,
                params: {
                    ...params,
                    page: page,
                    limit: limit
                }
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    deleteCategory = async(categoryId)=>{
        try{
            const response = await this.deleteRequest("/category/"+categoryId, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getCategoryDetailById = async(id)=>{
        try{
            const response = await this.getRequest("/category/"+id, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    categoryEdit = async(id, data)=>{
        try{
            const response = await this.putRequest("/category/"+id, data, {
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
            let response = await this.getRequest("/category/home-category");
            return response;
        }catch(exception){
            throw exception;
        }
    }
}

const categorySvc = new CategoryService();

export default categorySvc;