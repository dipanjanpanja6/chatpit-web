import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs, Grid, AppBar, Typography } from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import PropType from "prop-types";
import { token, checkAuthenticated } from "../redux/action/authaction";

import { connect } from "react-redux";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import HomeIcon from "@material-ui/icons/Home";
import Mi from "../messenger/main";

import Home from "../home/home";
import Layout from "../profile/index";
import Messenger from "../home/massegenger/index";
import Loading from "../loading/loading";
import { yellow } from "@material-ui/core/colors";

class appBar extends Component {
  constructor() {
    super();
    this.state = {
      auth: false, ///
      value: 0,
      mode: "light",
    };
  }
  componentDidMount() {
    this.props.checkAuthenticated();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.auth) {
      console.log(nextProps.auth);

      this.setState({
        auth: nextProps.auth.auth,
      });
    }
    if (nextProps.auth.mode) {
      this.setState({
        mode: "light",
      });
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { auth, value } = this.state;

    function TabContainer(props) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
        </Typography>
      );
    }

    return (
      <ThemeProvider
        theme={createMuiTheme({
          
          // overrides: { MuiAppBar: {default: "#FFC0CB"  } }, palette: { type: "dark" } ,
          palette: {
            type: this.state.mode,
            primary: {
              main: '#fdd835',
            },
            secondary: {
              main: '#ffb300',
            },
            type:'light'
          },
        })}
      >
        <div>
          {!auth && <Loading />}
          {auth && (
            <Grid>
              <AppBar position="sticky" color='primary'>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  centered
                >
                  <Tab icon={<HomeIcon />} />
                  <Tab icon={<ForumOutlinedIcon />} />
                  <Tab icon={<AccountCircleIcon />} />
                </Tabs>
              </AppBar>
              {value === 0 && (
                <TabContainer>
                  <Home />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  {/* <Messenger/> */}
                  <Mi />
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <Layout />
                </TabContainer>
              )}
              <ToastContainer />
            </Grid>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

appBar.propType = {
  auth: PropType.object.isRequired,
  checkAuthenticated: PropType.func.isRequired,
};
const mapState = (state) => ({
  auth: state.auth,
});
const mapActionToProps = {
  checkAuthenticated,
};

export default connect(mapState, mapActionToProps)(appBar);
