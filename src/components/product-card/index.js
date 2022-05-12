import React from "react";
import Button from '@mui/material/Button';
import "./product.css";

const productCard = (props) => {
    const { name, imageURL, description, price, stock, category, sku, id } = props;
    return (
        <div className="product-card">
            <div className="product-card-header">
                {name}
            </div>
            <div className="product-card-image">
                <img src={imageURL} alt={name}/>
            </div>
            <div className="product-card-description">
                {description}
            </div>
            <div className="product-card-footer">
                <div className="product-card-price-block">
                    MRP Rs.{price}
                </div>
                <div>
                    <Button className="login-button" type="submit" variant="outlined">Buy Now</Button>
                </div>
            </div>
        </div>
    )
}

export default productCard;