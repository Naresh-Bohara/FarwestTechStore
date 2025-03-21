import HttpService from "../../services/http.service";

class ProductService extends HttpService {
    productCreate = async(data)=>{
        try{
            const response = await this.postRequest("/product", data, {
                auth: true,
                file: true
            })

            return response;
        }catch(exception){
            throw exception;
        }
    }

    getProductList = async({page=1, limit=10, search=null})=>{
        try{
            let params = {}
            if(search){
                params = {
                    ...params,
                    keyword: search
                }
            }
            const response = await this.getRequest("/product", {
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

    deleteProduct = async(productId)=>{
        try{
            const response = await this.deleteRequest("/product/"+productId, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getProductDetailById = async(id)=>{
        try{
            const response = await this.getRequest("/product/"+id, {
                auth: true
            })
            return response;
        }catch(exception){
            throw exception;
        }
    }

    productEdit = async(id, data)=>{
        try{
            const response = await this.putRequest("/product/"+id, data, {
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
            let response = await this.getRequest("/product/home-product");
            return response;
        }catch(exception){
            throw exception;
        }
    }
}

const productSvc = new ProductService();

export default productSvc;