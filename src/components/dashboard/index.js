import Dashboard from "./dashboard";
import { connect } from "react-redux";
import actions from "../../actions";

export default connect(
  state => ({
    categoriesData: state.data.categoriesData,
    productsData: state.data.productsData,
    currentTab: state.data.currentTab,
    bannerData: state.data.bannerData,
    cartData: state.data.cartData,
    cartOpen: state.data.cartOpen
  }),
  {
    checkUser: actions.checkUser,
    getCategories: actions.getCategories,
    getCategoryProducts: actions.getCategoryProducts,
    getBannerDeals: actions.getBannerDeals,
    editCart: actions.editCart
  }
)(Dashboard);