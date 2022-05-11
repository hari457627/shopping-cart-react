import Dashboard from "./dashboard";
import { connect } from "react-redux";
import actions from "../../actions";

export default connect(
  state => ({
    
  }),
  {
    checkUser: actions.checkUser
  }
)(Dashboard);