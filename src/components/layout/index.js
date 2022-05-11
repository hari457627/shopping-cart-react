import Layout from "./layout";
import { connect } from "react-redux";

export default connect(
  state => ({
    snackBar: state.data.snackBar
  }),
  {
    
  }
)(Layout);