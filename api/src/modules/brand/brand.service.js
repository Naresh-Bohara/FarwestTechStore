import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import FileUploadService from "../../services/cloudinary.service.js";
import BrandModel from "./brand.model.js";
import slugify from "slugify";

class BrandService {
    transformBrandCreateData = async(req)=>{
        try{
            let data = req.body;
            let file = req.file;

            if(!file){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"Image is required",detail:{
                    image: "Image is required."
                }, statusCode:HttpResponse.validationFailed}
            }

            data.image = await FileUploadService.uploadFile(file.path, "/brand");
            data.slug = slugify(data.title, {lower: true})
            data.createdBy = req.loggedInUser._id;
            return data;
        }catch(exception){
            throw (exception)
        }
    }

    transformBrandUpdateData = async(req, oldValue)=>{
        try{
            let data = req.body;
            let file = req.file;

            if(!file){
                data.image = oldValue.image;
            }else{
                data.image = await FileUploadService.uploadFile(file.path, "/brand");
            }
            data.updatedBy = req.loggedInUser._id;
            return data;
        }catch(exception){
            throw (exception)
        }
    }

    createBrand = async(data)=>{
        try{
            const brandObj = new BrandModel(data);
            return await brandObj.save();
        }catch(exception){
            throw exception;
        }
    }

    totalCount = async(filter)=>{
        try{
            const count = await BrandModel.countDocuments(filter);
            return count;
        }catch(exception){
            throw exception
        }
    }

    listAllBrandData = async({limit=10, skip=0, filter={}})=>{
        try{
            const data = await BrandModel.find(filter)
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
            const brandDetail = await BrandModel.findById(id)
                                         .populate("createdBy", ["_id", "name", "email", "role"])
                                         .populate("updatedBy", ["_id", "name", "email", "role"])
            if(!brandDetail){
                throw {status:HttpResponseCode.NOT_FOUND, message:"Brand doesn't exist.", statusCode:HttpResponse.notFound}
            }
            return brandDetail;
        }catch(exception){
            throw exception
        }
    }

    updateBrandById = async(id, data)=>{
        try{
            const brandUpdate = await BrandModel.findByIdAndUpdate(id, {$set: data}, {new:true});
            if(!brandUpdate){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"Brand can't be updated.", statusCode:HttpResponse.brand.update_error}
            }
            return brandUpdate;
        }catch(exception){
            throw exception;
        }
    }

    deleteById = async(id)=>{
        try{
            const deleted = BrandModel.findByIdAndDelete(id);
            if(!deleted){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"Brand can't be deleted.", statusCode:HttpResponse.brand.delete_error}
            }
            return deleted;
        }catch(exception){
            throw exception
        }
    }

    getSingleBrandByFilter = async(filter)=>{
        try{
            const brandDetail = await BrandModel.findOne(filter)
            if(!brandDetail){
                throw {status:HttpResponseCode.NOT_FOUND, message:"Brand doesn't exist.", statusCode:HttpResponse.notFound}
            }
            return brandDetail;
        }catch(exception){
            throw exception;
        }
    }

     getBrandWithProductBySlug = async (slug) => {
        try {
          const products = await BrandModel.aggregate([
            // Match the brand by slug
            {
              '$match': { 'slug': slug }
            },
            // Lookup products related to the brand
            {
              '$lookup': {
                'from': 'products',
                'localField': '_id',
                'foreignField': 'brand',
                'as': 'products'
              }
            },
            // Filter products by active status and search terms
            {
              '$addFields': {
                'products': {
                  '$filter': {
                    'input': '$products',
                    'as': 'product',
                    'cond': {
                      '$and': [
                        { '$eq': ['$$product.status', 'active'] },
                        {
                          '$or': [
                            { '$regexMatch': { 'input': '$$product.title', 'regex': /product/i } },
                            { '$regexMatch': { 'input': '$$product.description', 'regex': /product/i } }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            },
            // Sort products by creation date in descending order
            {
              '$addFields': {
                'products': {
                  '$sortArray': {
                    'input': '$products',
                    'sortBy': { 'createdAt': -1 }
                  }
                }
              }
            },
            // Limit the number of products to 10
            {
              '$addFields': {
                'products': {
                  '$slice': ['$products', 10]
                }
              }
            },
            // Lookup categories related to the products
            {
              '$lookup': {
                'from': 'category',
                'localField': 'products.category',
                'foreignField': '_id',
                'as': 'category'
              }
            },
            // Unwind the products array
            {
              '$unwind': {
                'path': '$products',
                'preserveNullAndEmptyArrays': true
              }
            },
            // Lookup categories related to each product again (if necessary)
            {
              '$lookup': {
                'from': 'categories',
                'localField': 'products.category',
                'foreignField': '_id',
                'as': 'category'
              }
            }
          ]);
      
          return products;
        } catch (exception) {
          console.error('Error in getBrandWithProductBySlug:', exception);
          throw exception;
        }
      };
      
      
}

const brandSvc = new BrandService();

export default brandSvc;