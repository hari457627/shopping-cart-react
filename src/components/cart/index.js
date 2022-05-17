import Cart from "./cart";
import { connect } from "react-redux";
import actions from "../../actions";

export default connect(
  state => ({
    categoriesData: state.data.categoriesData,
    productsData: state.data.productsData,
    currentTab: state.data.currentTab,
    cartData: state.data.cartData,
    cartOpen: state.data.cartOpen
  }),
  {
    editCart: actions.editCart
  }
)(Cart);