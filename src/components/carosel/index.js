import React from "react";
import "./carosel.css";

const carosel = (props) => {
    return (
        <div class="container">
            <h1 class="main-heading">Responsive Carousel using CSS</h1>
            <div class="content">
                <div class="slideshow">
                    <button class="slide-btn slide-btn-1"></button>
                    <button class="slide-btn slide-btn-2"></button>
                    <button class="slide-btn slide-btn-3"></button>
                    <button class="slide-btn slide-btn-4"></button>
                    <div class="slideshow-wrapper">
                        <div class="slide">
                            <img class="slide-img"
                                src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20210818140124/image1-300x169.png" />
                        </div>
                        <div class="slide">
                            <img class="slide-img"
                                src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20210818140126/image2-300x169.png" />
                        </div>
                        <div class="slide">
                            <img class="slide-img" src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20210818190339/image5-300x185.png" />
                        </div>
                        <div class="slide">
                            <img class="slide-img" src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20210818141837/image4-300x168.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default carosel;