import React, { Component } from "react";
import "./Auth.css";
import PropType from 'prop-types'
import {signUp,login,createToken,checkAuthenticated} from '../redux/action/authaction'
import Image from 'material-ui-image';
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
import Slide from './login_page_slide'

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
      // auth:false
    };
  }
componentDidMount(){
// this.props.token()
// this.props.checkAuthenticated()

}
componentWillReceiveProps(nextProps){
  console.log(nextProps);
  // if (nextProps.auth.auth) {
    
  //   this.setState({
  //     auth: nextProps.auth.auth,
  //   });
  // }
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
    // const { auth } = this.state;
    
    return (
      <div className="App">
        
        <Grid container className={classes.loginContainer}>
          <Grid item className='loginGrid' xs={12} sm={5} md={4}>
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

          <Grid className="loginBG" xs={12} sm={7} md={8}>
            <Slide/>
            
          </Grid>
        </Grid>

      </div>
    );
  }
}

const style = (theme) => ({

  loginPaper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    margin: "12vh 12px auto",
    // maxHeight:'100vh'
  },
  button: {
    marginTop: "12px",
  },
  from: {
    margin: "20px 0px",
    maxHeight:'90vh',
  },
  loginB: {
    padding: "20px",
  },
});

Auth.propType={
signUp:PropType.func.isRequired,
login:PropType.func.isRequired,
createToken:PropType.func.isRequired,
// auth:PropType.object.isRequired

}
const mapState=(state)=>({
// auth:state.auth
})
const mapActionsToProps={
  signUp,login,createToken,
  // checkAuthenticated
}
export default connect(mapState, mapActionsToProps) (withStyles(style)(Auth));
