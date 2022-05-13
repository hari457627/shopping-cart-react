import React from "react";
import Button from '@mui/material/Button';
import "./product.css";

const productCard = (props) => {
    const { name, imageURL, description, price, stock, category, sku, id, key, imageUrl, path, even, setActiveCategoryId, fromipad, hide } = props;
    return (
        <>
            <div key={id} className={`${fromipad ? 'product-card product-card-block' : 'product-card'}`} onClick={()=> { if(path === 'category') setActiveCategoryId(id); else return; }}>
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
            {!hide && <div key={id} className="product-card-min" style={{flexDirection : `${even ? 'row-reverse' : 'initial'}`}}>
                <div className="product-card-image-min">
                    <img className="product-card-src-image-min" src={imageUrl} alt={name}/>
                </div>
                <div className="product-card-desc-min">
                    <div className="product-card-header">
                        {name}
                    </div>
                    <div className="product-card-description-min">
                        {description}
                    </div>
                    <div>
                        <Button className="login-button login-button-min" type="submit" variant="outlined">Explore {key}</Button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default productCard;