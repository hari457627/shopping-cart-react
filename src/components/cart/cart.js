import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import "./cart.css";

const Cart = (props) => {

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({type: types.CART_OPEN, payload: false});
    }

    return (
        <div>
            <Modal
                open={props.cartOpen}
                onClose={handleClose}
                aria-labelledby="cart-modal-title"
                aria-describedby="cart-modal-description"
            >
                <Box className='product-cart'>
                    <div className='cart-title'>
                        <div>
                            My cart ({} item)
                        </div>
                        <div>
                            <CloseIcon style={{cursor: 'pointer'}} onClick={handleClose}/>
                        </div>
                    </div>
                    <div className='cart-items-list'>
                        <div className='cart-items-list-block'>
                            <div>
                                prod image
                            </div>
                            <div>
                                prod price
                            </div>
                            <div>
                                prod total price
                            </div>
                        </div>
                    </div>
                    <div className='cart-footer'>
                        <div>
                            Cart footer
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Cart;