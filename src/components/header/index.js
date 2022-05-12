import Header from "./header";
import { connect } from "react-redux";

export default connect(
  state => ({
    isLoggedIn: state.data.isLoggedIn
  }),
  {
    
  }
)(Header);