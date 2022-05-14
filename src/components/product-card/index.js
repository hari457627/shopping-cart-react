import React from "react";
import Button from '@mui/material/Button';
import "./product.css";

const productCard = (props) => {
    const { name, imageURL, description, price, stock, category, sku, id, key, imageUrl, path, even, setActiveCategoryId, fromipad, hide, handleChange, isMinDev } = props;
    return (
        <>
            <div key={id} className={`${fromipad ? 'product-card product-card-block' : 'product-card'} product-card-small`} onClick={() => { if (path === 'category') setActiveCategoryId(id); else return; }}>
                <div className="product-card-header">
                    {name}
                </div>
                {
                    !isMinDev &&
                    <>
                        <div className="product-card-image">
                            <img src={imageURL} alt={name} />
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
                    </>
                }
                {
                    isMinDev &&
                    <>
                        <div className="product-card-min-desc-block-medium">
                            <div className="product-card-min-desc-block">
                                <div className="product-card-image">
                                    <img src={imageURL} alt={name} />
                                </div>
                                <div className="product-card-description">
                                    {description}
                                </div>
                            </div>
                            <div className="product-card-footer">
                                <Button className="login-button" type="submit" variant="outlined">Buy Now @ Rs.{price}</Button>
                            </div>
                        </div>
                        <div className="product-card-min-desc-block-small">
                            <div className="product-card-min-desc-block">
                                <div className="product-card-image">
                                    <img src={imageURL} alt={name} />
                                </div>
                                <div className="product-card-desc-right-block">
                                    <div className="product-card-description">
                                        {description}
                                    </div>
                                    <div className="product-card-footer">
                                        <Button className="login-button" type="submit" variant="outlined">Buy Now @ Rs.{price}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            {!hide && <div key={id} className="product-card-min" style={{ flexDirection: `${even ? 'row-reverse' : 'initial'}`, boxShadow: '0px 12px 18px -15px #111' }}>
                <div className="product-card-image-min">
                    <img className="product-card-src-image-min" src={imageUrl} alt={name} />
                </div>
                <div className="product-card-desc-min">
                    <div className="product-card-header">
                        {name}
                    </div>
                    <div className="product-card-description-min">
                        {description}
                    </div>
                    <div>
                        <Button className="login-button login-button-min" type="submit" variant="outlined" onClick={() => { if (path === 'category') { setActiveCategoryId(id); handleChange(1); } else return; }}>Explore {key}</Button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default productCard;