import Dashboard from "./dashboard";
import { connect } from "react-redux";
import actions from "../../actions";

export default connect(
  state => ({
    categoriesData: state.data.categoriesData,
    productsData: state.data.productsData,
    currentTab: state.data.currentTab
  }),
  {
    checkUser: actions.checkUser,
    getCategories: actions.getCategories,
    getCategoryProducts: actions.getCategoryProducts
  }
)(Dashboard);