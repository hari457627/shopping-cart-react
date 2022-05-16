import React from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import common_service from "../../Common-Service";
import "./cart.css";

const Cart = (props) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({ type: types.CART_OPEN, payload: false });
    }

    const cartItems = () => {
        if (props.cartData) {
            let items = 0;
            (Object.keys(props.cartData)).forEach(item => {
                (Object.keys(props.cartData[item])).forEach(prod => {
                    items = items + props.cartData[item][prod].quantity;
                })
            })
            return items;
        }
        return 0;
    }

    const handleEditQuantity = async (add, catid, prodid) => {
        const prevCartData = JSON.parse(JSON.stringify(props.cartData ? props.cartData : {}));
        if (prevCartData && Object.keys(prevCartData).length) {
            if (prevCartData && prevCartData[catid] && prevCartData[catid][prodid] && prevCartData[catid][prodid].quantity === 1 && !add) {
                delete prevCartData[catid][prodid];
                if (!Object.keys(prevCartData[catid]).length) {
                    delete prevCartData[catid]
                }
            }
            else {
                prevCartData[catid][prodid] = { ...prevCartData[catid][prodid], quantity: add ? prevCartData[catid][prodid].quantity + 1 : prevCartData[catid][prodid].quantity - 1 };
            }
            await common_service.setUserCookies(prevCartData, true);
            dispatch({ type: types.CART_DATA, payload: prevCartData });
            if (prevCartData && !Object.keys(prevCartData).length) {
                await common_service.setUserCookies(prevCartData, true);
                dispatch({ type: types.CART_DATA, payload: null });
            }
        }
    }

    const cartTotalPrice = () => {
        let totalPrice = 0;
        if(props.cartData){
            Object.keys(props.cartData).forEach(cat => {
                Object.keys(props.cartData[cat]).forEach(prod => {
                    totalPrice = totalPrice + (props.cartData[cat][prod]['price'] * props.cartData[cat][prod]['quantity'])
                })
            })
        }
        return totalPrice;
    }

    const renderCart = (isMinDevice = false) => {
        return (
            <Box className={`${isMinDevice ? 'product-cart product-cart-min-device' : 'product-cart'}`}>
                <div className='cart-title'>
                    <div>
                        My cart ({cartItems()} items)
                    </div>
                    <div className='cart-title-close'>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                    </div>
                </div>
                <div className='cart-items-list'>
                    {
                        props.cartData && Object.keys(props.cartData).length ?
                            Object.keys(props.cartData).map(item => {
                                return Object.keys(props.cartData[item]).map(prod => {
                                    return (
                                        <div className='cart-items-list-block' key={prod}>
                                            <div>
                                                <img className='cart-items-list-block-img' src={props.cartData[item][prod]['imageURL']} />
                                            </div>
                                            <div className='cart-items-list-block-actions'>
                                                <div className='cart-items-list-block-header'>{props.cartData[item][prod]['name']}</div>
                                                <div className='cart-items-list-block-actions-section'>
                                                    <div className='cart-items-list-block-actions-section-item'><Fab className={isMinDevice ? 'cart-items-list-block-actions-quantity cart-item-square-fab' : 'cart-items-list-block-actions-quantity'} aria-label="add" color="red" onClick={() => handleEditQuantity(false, item, prod)}><RemoveIcon /></Fab></div>
                                                    <div className='cart-items-list-block-actions-section-item'>{props.cartData[item][prod]['quantity']}</div>
                                                    <div className='cart-items-list-block-actions-section-item'><Fab className={isMinDevice ? 'cart-items-list-block-actions-quantity cart-item-square-fab' : 'cart-items-list-block-actions-quantity'} aria-label="add" color="red" onClick={() => handleEditQuantity(true, item, prod)}><AddIcon /></Fab></div>
                                                    <div className='cart-items-list-block-actions-section-item'><ClearIcon /></div>
                                                    <div className='cart-items-list-block-actions-section-item'>Rs.{props.cartData[item][prod]['price']}</div>
                                                </div>
                                            </div>
                                            <div className='cart-items-list-block-actions-price'>
                                                Rs.{props.cartData[item][prod]['price'] * props.cartData[item][prod]['quantity']}
                                            </div>
                                        </div>
                                    )
                                })
                            })
                            :
                            <div className='cart-items-empty'>
                                OOPS! Looks like your cart is empty...
                            </div>
                    }
                    <div className='cart-items-lowest-price-block'>
                        <img src={'./static/images/lowest-price.png'} />
                        <div className='cart-items-lowest-price-block-desc'>You won't find it cheaper anywhere</div>
                    </div>
                </div>
                <div className='cart-footer'>
                    <div>
                        Promo code can be applied on payment page
                    </div>
                    <Button className={`${!props.cartData ? "login-button cart-footer-actions login-button-disabled" : "login-button cart-footer-actions"}`} type="submit" variant="outlined" disabled={!props.cartData}>
                        <span>Proceed to checkout</span>
                        <div><span>Rs.{cartTotalPrice()} <ArrowBackIosNewIcon style={{ fontSize: 14 }} /></span></div>
                    </Button>
                </div>
            </Box>
        )
    }

    const handleBack = () => {
        dispatch({type: types.CART_OPEN, payload: false});
    }

    return (
        <div>
            <Modal
                open={props.cartOpen}
                onClose={handleClose}
                aria-labelledby="cart-modal-title"
                aria-describedby="cart-modal-description"
                id="cart-modal-block"
            >
                {renderCart()}
            </Modal>
            <div className='cart-block-min'>
                <div className='cart-block-min-back' onClick={handleBack}><span><ArrowBackIcon style={{fontSize: 12}}/>Back</span></div>
                {renderCart(true)}
            </div>
        </div>
    )
}

export default Cart;