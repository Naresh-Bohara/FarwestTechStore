import React, { useEffect, useState } from 'react';
import DefaultSlider from "../slider/DefaultSlider";
import { toast } from 'react-toastify';
import bannerSvc from '../../pages/banner/banner.service';

const HomeBanner = () => {
    const [images, setImages] = useState();
    const [loading, setLoading] = useState();

    const getBannerForHome = async()=>{
        try{
            const response = await bannerSvc.getForHomePage()
            setImages(response.data)
        }catch(exception){
            toast.error("Banner can't load at this moment.");
            console.log(exception);
        }
    }

    useEffect(()=>{
        getBannerForHome();
    }, [])
    return (
        <>
            {
                images ? <DefaultSlider data={images} /> : <></>
            }
        </>
    );
};

export default HomeBanner;
