import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

const CarouselCustom = () => {
    const images = [
        "https://res.cloudinary.com/ds41xxspf/image/upload/v1668568489/Donde-Suena-Assets/fly_fly_wqigdf.jpg",
        "https://res.cloudinary.com/ds41xxspf/image/upload/v1668568489/Donde-Suena-Assets/wos_rhdmtf.jpg",
        "https://res.cloudinary.com/ds41xxspf/image/upload/v1668568489/Donde-Suena-Assets/eruca_flyer_fl6pfb.jpg",
        "https://res.cloudinary.com/ds41xxspf/image/upload/v1668568489/Donde-Suena-Assets/artics_flyer_jd8qle.jpg",
    ];
    
    return (
        <Carousel
            autoPlay={true}
            showThumbs={false}
            showIndicators={true}
            infiniteLoop={true}
            showStatus={false}
        >
            {images &&
                images.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <img
                                src={el}
                                alt={"el"}
                            />
                        </div>
                    );
                })}
        </Carousel>
    );
};

export default CarouselCustom;
