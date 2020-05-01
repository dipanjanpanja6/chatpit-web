import React, { Component } from "react";
import { url } from "../config/config";
import PropType from "prop-types";
import { signUp, login, createToken } from "../redux/action/authaction";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  //   ThemeProvider,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import ShoutBox from "../component/message/SoutBox";
import AnonymousToSpecific from "../component/message/AnonymousToSpecific";
import CopyRight from "../component/copyright";
import GoogleLogin from "react-google-login";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      signup: true,
      signUpUserName: "",
      signupEmail: "",
      signupPassword: "",
      signupRepass: "",

      loginPassword: "",
      loginEmail: "",
    };
  }
  responseGoogle = (response) => {
    if (!response.error) {
      fetch(`${url}/login/g/${response.tokenId}`, {
        method: `POST`,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", `Bearer ${data.token}`);
          localStorage.setItem("device", data.device_key);
          localStorage.setItem("uid", data.user_id);
          data.success && (window.location = "/");
          data.error && alert(data.message);
        })
        .catch((err) => console.log(err));
    }
    console.log(response);
  };
  componentDidMount() {    
    const data = {
      mode: "light",
      bgColor: "#eeeeee",
    };
    this.setState({ mode: data });
    localStorage.setItem("chat_mode", JSON.stringify(data));
  }
  componentWillReceiveProps(nextProps) {}

  handleChangeSignUpUsername = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSignUpEmailChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleRePasswordChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSignUp = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.signUpUserName,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      confirmPassword: this.state.signupRepass,
    };
    this.props.signUp(data);

    signUp(data);
  };
  handleEmailChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };
    this.props.login(data);
  };
  handleLoginClick = () => {
    this.setState({ signup: !this.state.signup });
  };

  oneTime = () => {
    fetch(`${url}/login/a`,{
      method:`POST`
    })
    .then(res=>{res.json().then(data=>{
      console.log(data)
      localStorage.setItem("token", `Bearer ${data.token}`);
          localStorage.setItem("device", data.device_key);
          localStorage.setItem("uid", data.user_id);
          data.success && (window.location = "/");
          data.error && alert(data.message);
    }
    )}).catch(err=>console.log(err)
    )
  };
  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider
        theme={createMuiTheme({
          palette: {
            // type: this.state.mode,
            primary: {
              main: "#fdd835",
              // dark:"#000"
            },
            secondary: {
              main: "#ffb300",
            },
            type: "dark",
          },
        })}
      >
        <Grid
          container
          
          style={{
            minHeight: "100vh",
            textAlign:'center',
            background:
              "linear-gradient(184deg, rgb(36, 0, 2) 0%, rgb(121, 11, 9) 30%, rgb(255, 212, 0) 100%)",
          }}
        >
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Be together, whenever.</Typography>
              <Typography variant="subtitle1">
                A simple way to connect anonymously with anyone
              </Typography>
              <Divider />
              {this.state.signup && (
                <form onSubmit={this.handleSignUp} className={classes.from}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    id="signUpUserName"
                    value={this.state.signUpUserName}
                    onChange={this.handleChangeSignUpUsername}
                    placeholder="User name"
                    required
                    autoFocus
                  />
                  <br />
                  <TextField
                    variant="outlined"
                    required
                    margin="dense"
                    size="small"
                    style={{ font: "medium" }}
                    type="email"
                    id="signupEmail"
                    placeholder="Email address"
                    value={this.state.signupEmail}
                    onChange={this.handleSignUpEmailChange}
                  />
                  <br />
                  <TextField
                    margin="dense"
                    type="password"
                    placeholder="Password"
                    required
                    // size='small'
                    variant="outlined"
                    id="signupPassword"
                    value={this.state.signupPassword}
                    onChange={this.handlePasswordChange}
                  />
                  <br />
                  <TextField
                    margin="dense"
                    type="password"
                    placeholder="Retype password"
                    required
                    id="signupRepass"
                    value={this.state.signupRepass}
                    variant="outlined"
                    onChange={this.handleRePasswordChange}
                  />
                  <br />
                  <Button
                    // fullWidth
                    // show="false"
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    color="secondary"
                  >
                    Sign up
                  </Button>
                </form>
              )}
              {!this.state.signup && (
                <form onSubmit={this.handleLogin} className={classes.from}>
                  <TextField
                    autoFocus
                    required
                    variant="outlined"
                    margin="dense"
                    size="small"
                    style={{ font: "medium" }}
                    type="email"
                    id="loginEmail"
                    placeholder="Email address"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <br />
                  <TextField
                    margin="dense"
                    type="password"
                    placeholder="Password"
                    required
                    // size='small'
                    variant="outlined"
                    id="loginPassword"
                    onChange={this.handlePasswordChange}
                  />
                  <br />
                  <Button
                    show="false"
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    color="secondary"
                  >
                    Sign in
                  </Button>
                </form>
              )}

              {this.state.signup && (
                <div>
                  <Button
                    className={classes.button}
                    onClick={this.handleLoginClick}
                    variant="contained"
                    color="default"
                  >
                    Existing user! Login
                  </Button>
                </div>
              )}
              {!this.state.signup && (
                <div>
                  <Button
                    className={classes.button}
                    onClick={this.handleLoginClick}
                    variant="contained"
                    color="default"
                  >
                    Create new user
                  </Button>
                </div>
              )}
              <Button
                className={classes.button}
                onClick={this.oneTime}
                variant="contained"
                color="primary"
              >
                One time use*
              </Button>
              <br />
              <GoogleLogin
                clientId="672411401216-bd1qmtk0veo0jn4gmhc1vlgs4h5jgg9o.apps.googleusercontent.com"
                buttonText="Login"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    continue with Google
                  </Button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <Divider />
              <CopyRight />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{
                margin: "16px",
              }}
            >
              {/* <AnonymousToSpecific key =' auth_anonymous' hight='63vh' /> */}
            </div>
          </Grid>
          <Grid xs={12} md={4} item>
            <div
              style={{
                margin: "16px",
              }}
            >
              <ShoutBox key ='auth_shoutBox' hight="73vh" />
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const style = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),

    // width:theme.spacing(16)*3,
    textAlign: "center",
    minHeight: "89vh",
  },
  button: {
    marginTop: "10px",
    width: "220px",
  },
});

Auth.propType = {
  signUp: PropType.func.isRequired,
  login: PropType.func.isRequired,
  createToken: PropType.func.isRequired,
};
const mapState = (state) => ({});
const mapActionsToProps = {
  signUp,
  login,
  createToken,
};
export default connect(mapState, mapActionsToProps)(withStyles(style)(Auth));
