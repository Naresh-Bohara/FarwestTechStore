import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import FileUploadService from "../../services/cloudinary.service.js";
import ProductModel from "./product.model.js";
import slugify from "slugify";

class ProductService {
    transformProductCreateData = async(req)=>{
        try{
            let data = req.body;
            let files = req.files;

            let images = [];

            if(files && files.length > 0){
                for(let image of files){
                    let uploadImage = await FileUploadService.uploadFile(image.path, "/product");
                    images.push(uploadImage);
                }
            }

            data.images = images;

            if(!data.category || data.category === ""){
                data.category = null;
            }
            
            if(!data.brand || data.brand === ""){
                data.brand = null;
            }

            if(req.loggedInUser.role === "seller" ){
                data.seller = req.loggedInUser._id;
            }else if (req.loggedInUser.role === "admin" && (!data.seller || data.seller.trim() === "")) {
                data.seller = null;
            }
            
            data.price = data.price * 100
            data.actualAmount = data.price - (data.price * data.discount/100)

            data.slug = slugify(data.title, {lower: true})
            data.createdBy = req.loggedInUser._id;
            return data;
        }catch(exception){
            throw (exception)
        }
    }

    transformProductUpdateData = async(req, oldValue)=>{
        try{
            let data = req.body;
            let files = req.files || [];

            let images = [];

            if(files && files.length > 0){
                for(let image of files){
                    let uploadImage = await FileUploadService.uploadFile(image.path, "/product");
                    images.push(uploadImage);
                }
            }else{
                images = oldValue.images
            }

            data.images = images;

            if(!data.category || data.category === ""){
                data.category = null;
            }
            
            if(!data.brand || data.brand === ""){
                data.brand = null;
            }

            if(req.loggedInUser.role === "seller" ){
                data.seller = req.loggedInUser._id;
            }else if(req.loggedInUser.role === "admin" && (!data.seller || data.seller === "")){
                data.seller = null;
            }

            data.price = data.price * 100

            data.actualAmount = data.price - (data.price * data.discount/100)

            data.updatedBy = req.loggedInUser._id;
            return data;
        }catch(exception){
            throw (exception)
        }
    }

    createProduct = async(data)=>{
        try{
            const productObj = new ProductModel(data);
            return await productObj.save();
        }catch(exception){
            throw exception;
        }
    }

    totalCount = async(filter)=>{
        try{
            const count = await ProductModel.countDocuments(filter);
            return count;
        }catch(exception){
            throw exception
        }
    }

    listAllProductData = async({limit=10, skip=0, filter={}})=>{
        try{
            const data = await ProductModel.find(filter)
                            .populate("category", ["_id", "title", "slug"])
                            .populate("brand", ["_id", "title", "slug"])
                            .populate("seller", ["_id", "name", "email", "role"])
                            .populate("createdBy", ["_id", "name", "email", "role"])
                            .populate("updatedBy", ["_id", "name", "email", "role"])
                            .sort({"createdAt": "desc"})
                            .skip(skip)
                            .limit(limit);
            return data;
        }catch(exception){
            throw exception
        }
    }

    getDataById = async(id) =>{
        try{
            const productDetail = await ProductModel.findById(id)
                                        .populate("category", ["_id", "title", "slug"])
                                        .populate("brand", ["_id", "title", "slug"])
                                        .populate("seller", ["_id", "name", "email", "role"])
                                        .populate("createdBy", ["_id", "name", "email", "role"])
                                        .populate("updatedBy", ["_id", "name", "email", "role"])
            if(!productDetail){
                throw {status:HttpResponseCode.NOT_FOUND, message:"Product doesn't exist.", statusCode:HttpResponse.notFound}
            }
            return productDetail;
        }catch(exception){
            throw exception
        }
    }

    getSingleProductByFilter = async(filter) =>{
        try{
            const productDetail = await ProductModel.findOne(filter)
                                        .populate("category", ["_id", "title", "slug"])
                                        .populate("brand", ["_id", "title", "slug"])
                                        .populate("seller", ["_id", "name", "email", "role"])
                                        .populate("createdBy", ["_id", "name", "email", "role"])
                                        .populate("updatedBy", ["_id", "name", "email", "role"])
            if(!productDetail){
                throw {status:HttpResponseCode.NOT_FOUND, message:"Product doesn't exist.", statusCode:HttpResponse.notFound}
            }
            return productDetail;
        }catch(exception){
            throw exception
        }
    }

    updateProductById = async(id, data)=>{
        try{
            const productUpdate = await ProductModel.findByIdAndUpdate(id, {$set: data}, {new:true});
            if(!productUpdate){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"Product can't be updated.", statusCode:HttpResponse.product.update_error}
            }
            return productUpdate;
        }catch(exception){
            throw exception;
        }
    }

    deleteById = async(id)=>{
        try{
            const deleted = ProductModel.findByIdAndDelete(id);
            if(!deleted){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"Product can't be deleted.", statusCode:HttpResponse.product.delete_error}
            }
            return deleted;
        }catch(exception){
            throw exception
        }
    }
}

const productSvc = new ProductService();

export default productSvc;