import { useContext, useEffect, useState } from "react"
import { WholePageLoader } from "../components/loader/pageLoaderComponent"
import {useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import authSvc from "../pages/auth/auth.service"
import { AuthContext } from "../components/context/AuthContext"

const AllowedBy = ({role, component}) =>{
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext)

    const checkLoginUser = async()=>{
        try{
            const loggedInUserDetail = await authSvc.getLoggedInUserDetail();
            if(role.includes(loggedInUserDetail.data.role)){
                setAuth({
                    loggedInUser: loggedInUserDetail.data
                })
                setLoading(false)
            }else{
                setLoading(false);
                toast.warning("You don't have access to this page.")
                navigate("/"+loggedInUserDetail.data.role)
            }
        }catch(exception){
            console.log(exception)
            localStorage.clear();
            setLoading(false);
            toast.error("Error while accessing. Please login again.")
            navigate("/login")
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem("token") || null;
        if(token){
            checkLoginUser();
        }else{
            toast.error("Please login first.")
            navigate("/login")
        }
    }, [])
    
    return <>
    {
        loading ? <> <WholePageLoader/> </> : <>{component}</>
    }
    </>
}

export default AllowedBy