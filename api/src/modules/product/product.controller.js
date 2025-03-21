import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "./product.service.js";

class ProductController {
    storeProduct =async(req, res, next)=>{
        try{
            // transfer data
            // DB store
            // respond
            let data = await productSvc.transformProductCreateData(req);
            let productObj = await productSvc.createProduct(data);
            res.json({
                data: productObj,
                message: "Product Created Successfully!",
                status: HttpResponse.product.create_success,
                options: null
            })
        
        }catch(exception){
            console.log("StoreProduct", exception);
            next(exception);
        }
    }

    updateProduct = async(req, res, next)=>{
        try{
            const productExists = await productSvc.getDataById(req.params.id);
            const data = await productSvc.transformProductUpdateData(req, productExists);
            const updated = await productSvc.updateProductById(req.params.id, data)
            res.json({
                data: updated,
                message: "Product Updated Successfully.",
                status: HttpResponse.product.update_success,
                options: null
            })
        }catch(exception){
            console.log("updateProduct: ", exception);
            next(exception);
        }
    }

    listAllData = async(req, res, next)=>{
        try{
            // pagination
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page-1) * limit;

            // filter
            let filter = {};
            if(req.query.keyword){
                filter = {
                    $or:[
                        {title: new RegExp(req.query.keyword, 'i')},
                        {description: new RegExp(req.query.keyword, 'i')},
                    ]
                }
            }

            let data = await productSvc.listAllProductData({
                limit: limit,
                skip: skip,
                filter: filter
            });

            let totalCount = await productSvc.totalCount(filter)
            res.json({
                data: data,
                message: "Product List",
                status: "PRODUCT_LIST_SUCCESS",
                options: {
                    page: page,
                    limit: limit,
                    total: totalCount
                }
            })
        }catch(exception){
            console.log("ListAllData: ", exception);
            next(exception);
        }
    }

    getById = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const data = await productSvc.getDataById(id);
            res.json({
                data: data,
                message: "Product Detail",
                status: "PRODUCT_DETAIL",
                options: null,
            })
        }catch(exception){
            console.log("getById: ", exception);
            next(exception)
        }
    }

    deleteById = async(req, res, next)=>{
        try{
            const productExists = await productSvc.getDataById(req.params.id);
            let deletedData = await productSvc.deleteById(req.params.id)

            res.json({
                data: deletedData,
                message: "Product Deleted Successfully.",
                status: HttpResponse.product.delete_success,
                options: null
            })

        }catch(exception){
            console.log("deleteById: ", exception);
            next(exception);
        }
    }

    getForHomePage = async(req, res, next)=>{
        try{
            let data = await productSvc.listAllProductData({
                limit: 16,
                page: 1,
                filter: {
                    status: "active",
                }
            })
            res.json({
                data: data,
                message: "Product List For Home page.",
                status: HttpResponse.product.list_for_home,
                options: null,
            })
        }catch(exception){
            console.log("getForHomePage: ", exception);
            next(exception);
        }
    }

    getDetailBySlug = async(req, res, next)=>{
        try{
            const slug = req.params.slug;
            const productDetail = await productSvc.getSingleProductByFilter({
                slug: slug,
                status: "active"
            })
            let related = await productSvc.listAllProductData({
                skip: 0,
                limit: 8, 
                filter: {
                    slug: {$ne: slug},
                    status: "active",
                    category: productDetail.category._id
                }
            })
            res.json({
                data: {
                    detail: productDetail,
                    related: related
                },
                message: "Product detail.", 
                status: HttpResponse.product.list_success
            })
        }catch(exception){
            next(exception)
        }
    }
}

const productCtrl = new ProductController();

export default productCtrl;