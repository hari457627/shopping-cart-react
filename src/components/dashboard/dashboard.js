import React, { useEffect, useState } from "react";
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import Loader from "../loader";
import ProductCard from "../product-card";
import "./dashboard.css";

const Dashboard = (props) => {
    const [loading, setLoading] = useState(true);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const dispatch = useDispatch();
    const getCategories = async () => {
        const { success, message } = await props.getCategories();
        const productsRes = await props.getCategoryProducts();
        if (!success || !productsRes.success) {
            dispatch({ type: types.OPEN_SNACKBAR, payload: { open: true, message: !success ? message : !productsRes.success ? productsRes.message : 'Failed to fetch data' } });
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
                                <div>
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

    const renderProductsList = (fromipad = false, hide = false) => {
        return (
            <div className={`${fromipad ? 'categories-card-section categories-card-section-block' : 'categories-card-section'}`}>
                {
                    (data && data.length) ?
                        data.map(item => {
                            return (
                                <ProductCard {...item} path="product" fromipad={fromipad} hide={hide}/>
                            )
                        })
                        :
                        <div>
                            OOPS! No products to display...
                        </div>
                }
            </div>
        )
    }

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
                                    {renderProductsList(false, true)}
                                    <div className={`${(props.currentTab == 1) ? 'categories-card-section-min categories-card-section-min-block' : 'categories-card-section-min'}`}>
                                        {
                                            props.currentTab == 0 && props.categoriesData && props.categoriesData.length ?
                                                <>
                                                    <div>
                                                        carosel
                                                    </div>
                                                    <div>
                                                        {
                                                            props.categoriesData.map((item, index) => {
                                                                return (
                                                                    <ProductCard {...item} path="category" even={index % 2 === 0} setActiveCategoryId={setActiveCategoryId} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </>
                                                :
                                                null
                                        }
                                        {props.currentTab == 1 && renderCategoryList(true)}
                                        {props.currentTab == 1 && renderProductsList(true, true)}
                                    </div>
                                </div>
                                :
                                <div>
                                    OOPS! No categories to display...
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default Dashboard;