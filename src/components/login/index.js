import Login from "./login";
import { connect } from "react-redux";
import actions from "../../actions";

export default connect(
  state => ({
    
  }),
  {
    loginSubmit: actions.loginSubmit,
    checkUser: actions.checkUser
  }
)(Login);