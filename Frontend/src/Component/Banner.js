import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/fetch/banner')
            .then((res) => {
                setImages(res.data.banners[0]?.images || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="banner-carousel">
            <div id="foodBannerCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                {/* Indicators */}
                <div className="carousel-indicators">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#foodBannerCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Carousel Items */}
                <div className="carousel-inner">
                    {images.map((img, index) => (
                        <div 
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img 
                                src={img.url} 
                                className="d-block w-100" 
                                alt={`Promotional banner ${index + 1}`}
                                loading="lazy"
                            />
                            {/* Optional Caption - Uncomment if needed */}
                            {/* <div className="banner-caption">
                                <h3>Special Offer</h3>
                                <p>Get 20% off on your first order</p>
                                <button className="btn btn-primary">Order Now</button>
                            </div> */}
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#foodBannerCarousel" 
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#foodBannerCarousel" 
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Banner;