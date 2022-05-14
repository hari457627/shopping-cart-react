import React from "react";
import "./carosel.css";

const carosel = ({ bannerData }) => {
    return (
        <div class="container">
            <div class="content">
                <div class="slideshow">
                    {
                        bannerData.map((item, index) => {
                            return (
                                <button class={`slide-btn slide-btn-${index + 1}`}></button>
                            )
                        })
                    }
                    <div class="slideshow-wrapper">
                        {
                            bannerData.map(item => {
                                return (
                                    <div class="slide">
                                        <img class="slide-img" src={item.bannerImageUrl} alt={item.bannerImageAlt}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default carosel;