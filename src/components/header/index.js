import Header from "./header";
import { connect } from "react-redux";

export default connect(
  state => ({
    isLoggedIn: state.data.isLoggedIn,
    currentTab: state.data.currentTab,
    cartData: state.data.cartData
  }),
  {
    
  }
)(Header);