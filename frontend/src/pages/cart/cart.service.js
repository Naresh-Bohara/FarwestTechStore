import HttpService from "../../services/http.service";

class CartService extends HttpService{
    addToCart = async(data)=>{
        try{
            const response = await this.postRequest("/order/add-to-cart", data, {
                auth: true
            })
            return response;    
        }catch(exception){
            throw(exception);
        }

    }

    getCartItems = async(data)=>{
        try{
          const response = await this.getRequest("/order/my-cart",{
                auth: true
            })
            return response;    
        }catch(exception){
            throw(exception);
        }
    }

    updateCart = async(data)=>{
        try{
            const response = await this.putRequest("/order/remove-cart-item/",data,{
                auth: true
            })
            return response;    
        }catch(exception){
            throw(exception);
        }
    }

    placeOrder = async(payload)=>{
        try{
            const response = await this.postRequest("/order/checkout", payload,{
            auth: true
        })
        return response;
        }catch(exception){
            throw(exception);
        }
    }
}

const cartSvc = new CartService();
export default cartSvc;