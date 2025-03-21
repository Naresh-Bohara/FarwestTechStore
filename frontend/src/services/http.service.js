import { toast } from "react-toastify";
import axiosInstance from "../config/axios.config";

class HttpService {
    #headers = {};
    #params = {};

    #getHeaders = (config) => {
        this.#headers = {};
        this.#params = {};

        if (config && config.file) {
            this.#headers['Content-Type'] = "multipart/form-data";
        } else {
            this.#headers['Content-Type'] = "application/json";
        }

        if(config && config.auth){
            let token = localStorage.getItem("token") || null
            if(!token){
                toast.error("Authentication token not found..")
                throw {message: "Authentication token not found."}
            }else{
                this.#headers["Authorization"] = `Bearer ${token}`;
            }
        }else if(config && config.refresh){
            this.#headers['refresh'] = localStorage.getItem("refresh")
        }

        if(config && config.params){
            this.#params = config.params;
        }
    }

    postRequest = async (url, data = {}, config = null) => {
        try {
            if(config){
                this.#getHeaders(config);
            }

            let options = {}
            if(this.#headers){
                options = {
                    ...options,
                    headers: {
                        ...this.#headers
                    }
                }
            }

            if(this.#params){
                options = {
                    ...options,
                  params:{
                    ...this.#params
                  }
                }
            }

            const response = await axiosInstance.post(url, data, options);
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    getRequest = async(url, config=null) => {
        try{
            if(config){
                this.#getHeaders(config)
            }

            let options = {}
            if(this.#headers){
                options = {
                    ...options,
                    headers: {
                        ...this.#headers
                    }
                }
            }

            if(this.#params){
                options = {
                    ...options,
                  params:{
                    ...this.#params
                  }
                }
            }
            const response = await axiosInstance.get(url, options)
            return response
        }catch(exception){
            throw exception
        }
    }

    putRequest = async(url, data={}, config=null) => {
        try {
            if(config){
                this.#getHeaders(config);
            }

            let options = {}
            if(this.#headers){
                options = {
                    ...options,
                    headers: {
                        ...this.#headers
                    }
                }
            }

            if(this.#params){
                options = {
                    ...options,
                  params:{
                    ...this.#params
                  }
                }
            }

            const response = await axiosInstance.put(url, data, options);
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    patchRequest = async(url, data={}, config=null) => {
        try {
            if(config){
                this.#getHeaders(config);
            }

            let options = {}
            if(this.#headers){
                options = {
                    ...options,
                    headers: {
                        ...this.#headers
                    }
                }
            }

            if(this.#params){
                options = {
                    ...options,
                  params:{
                    ...this.#params
                  }
                }
            }

            const response = await axiosInstance.patch(url, data, options);
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteRequest = async(url, config=null) => {
        try{
            if(config){
                this.#getHeaders(config)
            }

            let options = {}
            if(this.#headers){
                options = {
                    ...options,
                    headers: {
                        ...this.#headers
                    }
                }
            }

            if(this.#params){
                options = {
                    ...options,
                  params:{
                    ...this.#params
                  }
                }
            }
            const response = await axiosInstance.delete(url, options)
            return response
        }catch(exception){
            throw exception
        }
    }
}

export default HttpService;
