import React, { useEffect, useMemo, useState } from "react";
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import Loader from "../loader";
import ProductCard from "../product-card";
import Carosel from "../carosel";
import "./dashboard.css";

const Dashboard = (props) => {
    const [loading, setLoading] = useState(true);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const dispatch = useDispatch();
    const getCategories = async () => {
        const { success, message } = await props.getCategories();
        const productsRes = await props.getCategoryProducts();
        const bannersRes = await props.getBannerDeals();
        if (!success || !productsRes.success || !bannersRes.success) {
            dispatch({ type: types.OPEN_SNACKBAR, payload: { open: true, message: !success ? message : !productsRes.success ? productsRes.message : !bannersRes.success ? bannersRes.message : 'Failed to fetch data' } });
        }
        setLoading(false);
    }

    const checkAuthUser = async (obj) => {
        const res = await props.checkUser(obj);
        if (!res.success) {
            await common_actions.clearUserCookies();
            props.history.push('/login');
        }
        else {
            getCategories();
        }
    }

    const getAuthUser = async () => {
        const userCookieObj = await common_actions.getUserCookies();
        checkAuthUser(userCookieObj);
    }

    const handleClickCategory = (id) => {
        setActiveCategoryId(id);
    }

    const handleChange = (val) => {
        dispatch({type: types.TAB_CHANGE, payload: val});
    }

    const addToCart = (catid, prodid, productDetails) => {
        const prevCartData = JSON.parse(JSON.stringify(props.cartData ? props.cartData : {}));
        if(prevCartData && prevCartData[catid]){
            if(prevCartData[catid][prodid]){
                prevCartData[catid][prodid] = {...productDetails, quantity : prevCartData[catid][prodid].quantity + 1};
            }
            else{
                prevCartData[catid][prodid] = {...productDetails, quantity : 1};
            }
        }
        else if(prevCartData && !prevCartData[catid]){
            prevCartData[catid] = {[prodid] : {...productDetails, quantity : 1}}
        }
        else{
            prevCartData[catid] = {};
            prevCartData[catid][prodid] = {...productDetails, quantity : 1};
        }
        dispatch({type: types.CART_DATA, payload: prevCartData});
    }

    useEffect(() => {
        const isLoggedIn = common_actions.isAuthenticated();
        if (isLoggedIn) {
            getAuthUser();
        }
    }, [])

    useEffect(() => {
        if (props.categoriesData && props.categoriesData.length) {
            const catid = (props.categoriesData.sort((a, b) => a.key > b.key))[0].id;
            setActiveCategoryId(catid);
        }
    }, [props.categoriesData]);

    const renderCategoryList = (fromipad = false) => {
        return (
            <div className={`${fromipad ? 'categories-list-section categories-list-section-block' : 'categories-list-section'}`}>
                {
                    props.categoriesData.sort((a, b) => a.key > b.key).map(item => {
                        return (
                            <div className={`categories-list-item-block ${(item.id === activeCategoryId) ? 'categories-active-item' : ''}`} key={item.id} onClick={() => handleClickCategory(item.id)}>
                                <div style={{paddingLeft: 20}}>
                                    {item.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const productsData = (props.categoriesData && props.categoriesData.length && props.productsData && props.productsData.length) ? props.productsData.filter(item => item.category === activeCategoryId) : [];
    const totalProductsData = (props.productsData && props.productsData.length) ? props.productsData : [];
    const data = (props.currentTab == 0) ? productsData : totalProductsData;

    const renderProductsList = (fromipad = false, hide = false, isMinDev = false) => {
        const dataArr = fromipad ? data.filter(item => item.category === activeCategoryId) : data;
        return (
            <div className={`${fromipad ? 'categories-card-section categories-card-section-block' : 'categories-card-section'}`}>
                {
                    (dataArr && dataArr.length) ?
                        dataArr.map(item => {
                            return (
                                <ProductCard {...item} path="product" fromipad={fromipad} hide={hide} handleChange={handleChange} isMinDev={isMinDev} addToCart={addToCart} productDetails={item}/>
                            )
                        })
                        :
                        <div className="no-products-card">
                            OOPS! No products to display...
                        </div>
                }
            </div>
        )
    }

    const bannerData = useMemo(() => {
        if(props.bannerData) return props.bannerData;
        else return [];
    },[props.bannerData])

    return (
        <div>
            {
                loading
                    ?
                    <Loader />
                    :
                    <>
                        {
                            (props.categoriesData && props.categoriesData.length) ?
                                <div className="categories-block">
                                    {renderCategoryList()}
                                    {renderProductsList(false, true, false)}
                                    <main>
                                        <div className={`${(props.currentTab == 1) ? 'categories-card-section-min categories-card-section-min-block' : 'categories-card-section-min'}`}>
                                            {
                                                props.currentTab == 0 && props.categoriesData && props.categoriesData.length ?
                                                    <>
                                                        <div>
                                                            <Carosel bannerData={bannerData}/>
                                                        </div>
                                                        <div>
                                                            {
                                                                props.categoriesData.map((item, index) => {
                                                                    return (
                                                                        <ProductCard {...item} path="category" even={index % 2 === 0} setActiveCategoryId={setActiveCategoryId} handleChange={handleChange}/>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    null
                                            }
                                            {props.currentTab == 1 && renderCategoryList(true)}
                                            {props.currentTab == 1 && renderProductsList(true, true, true)}
                                        </div>
                                    </main>
                                </div>
                                :
                                <div className="no-products-card">
                                    OOPS! No categories to display...
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default Dashboard;