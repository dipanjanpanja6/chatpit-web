import React, { Component } from "react";
import "./Auth.css";
import PropType from 'prop-types'
import {signUp,login,token} from '../redux/action/authaction'

import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  //   ThemeProvider,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

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
componentDidMount(){
// this.props.token()
}
componentWillReceiveProps(nextProps){
  console.log(nextProps);
}

  handleChangeSignUpUsername = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSignUpEmailChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handlePasswordChange=(e)=>{
    this.setState({ [e.target.id]: e.target.value });    
  }
  handleRePasswordChange=(e)=>{
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSignUp = (e) => {
    e.preventDefault();
    const data={
      name:this.state.signUpUserName,
      email:this.state.signupEmail,
      password:this.state.signupPassword,
      confirmPassword:this.state.signupRepass
    }
    this.props.signUp(data);
    
    signUp(data);
  };
  handleEmailChange=(e)=>{
    this.setState({ [e.target.id]: e.target.value });
  }
  handlePasswordChange=(e)=>{
    this.setState({ [e.target.id]: e.target.value });
  }
  handleLogin = (e) => {
    e.preventDefault();
    const data={
      email:this.state.loginEmail,
      password:this.state.loginPassword,
    }
    this.props.login(data);
  };
  handleLoginClick = () => {
    this.setState({ signup: !this.state.signup });
  };
  // handleForgetPassword = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Grid container className={classes.loginContainer}>
          <Grid item className={classes.loginGrid} md={4}>
            <Paper className={classes.loginPaper}>
              <Typography variant="h4">
                Be together,
                <br />
                whenever.
              </Typography>
              <Typography variant="subtitle1">
                A simple way to connect anonymously with anyone.
              </Typography>
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
                    required="true"
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
                    required="true"
                    id="signupRepass"
                    value={this.state.signupRepass}
                    variant="outlined"
                    onChange={this.handleRePasswordChange}
                  />
                  <br />

                  <Button
                    show="false"
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
                    color="primary"
                  >
                    Sign in
                  </Button>
                </form>
              )}

              <div className="loginHelp">
                {this.state.signup && (
                  <p onClick={this.handleLoginClick}>Existing user! Login</p>
                )}
                {!this.state.signup && (
                  <div>
                    <p onClick={this.handleForgetPassword}>Forget password</p>
                    <p onClick={this.handleLoginClick}>Create new user</p>
                  </div>
                )}
              </div>
            </Paper>
          </Grid>

          <Grid className="loginBG" md={8}>
            <Grid className={classes.loginB}>
              <Typography variant="h2">Welcome to xxx</Typography>
              <Typography variant="subtitle1">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Typography>
              <input />
              <input type="submit" />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const style = (theme) => ({
  loginContainer: {
    // height: "100vh",
  },
  span: {
    backgroundColor: "#445",
    // height: "100vh",
    width: "100%",
  },
  loginPaper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    margin: "12vh 12px",
  },
  button: {
    marginTop: "12px",
  },
  from: {
    margin: "20px 0px",
  },
  loginGrid: {
    backgroundColor: "#099",
    height: "100vh",
  },
  loginBG: {
    background: "url('./src/img/bg.jpg')",
    height: "100vh",
  },
  loginB: {
    padding: "20px",
  },
});

Auth.propType={
signUp:PropType.func.isRequired,
login:PropType.func.isRequired,
token:PropType.func.isRequired,
}
const mapState=(state)=>{

}
const mapActionsToProps={
  signUp,login,token
}
export default connect(mapState, mapActionsToProps) (withStyles(style)(Auth));
