import React, { Component } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs, Grid, AppBar, Typography, } from "@material-ui/core";
import { createMuiTheme,  ThemeProvider} from "@material-ui/core/styles";
import PropType from "prop-types";
import { checkAuthenticated } from "../redux/action/authaction";

import { connect } from "react-redux";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import HomeIcon from "@material-ui/icons/Home";
import Mi from "../messenger/main";

import Home from "../home/home";
import Layout from "../profile/index";
import Loading from "../loading/loading";
import io from 'socket.io-client'
const socket = io('http://localhost:4009')
export const sockets=socket
class appBar extends Component {
  constructor() {
    super();
    this.state = {
      auth: true, ///
      value: 0,
      mode: {},
      color:'#fdd835'
    };
  }
  componentWillMount() {
    socket.emit('connected',()=>{})
    socket.emit('disconnect',()=>{
    })
    var uid = localStorage.getItem('uid');
if(uid){
  console.log(uid);
  
  socket.emit('user',{uid})
}



    this.props.checkAuthenticated();
    const theme = JSON.parse(localStorage.getItem('chat_mode'));
    if (!theme){
      const data = {
        mode:'light',
        bgColor:'#eeeeee'
      };
      this.setState({mode:data})
      localStorage.setItem('chat_mode', JSON.stringify(data))
    }else {
      if (theme.mode === 'light'){
        this.setState({
          color:'#fdd835'
        })
      }
      if (theme.mode === 'dark'){
        this.setState({
          color:theme.mode
        })
      }
      this.setState({mode:theme})
    }

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
        //mode: "light",
      });
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { auth, value,mode } = this.state;

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
          
          palette: {
            // type: this.state.mode,
            primary: {
              main: '#fdd835',
              dark:"#000"
            },
            secondary: {
              main: '#ffb300',
            },
            type:mode.mode
          },
        })}
      >
        <div>
          {!auth && <Loading />}
          {auth && (
            <Grid >
              <AppBar position="sticky" color={mode.mode === 'light' ? 'primary':'default'}
            >
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
