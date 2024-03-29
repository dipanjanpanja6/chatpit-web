import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import withStyles from "@material-ui/core/styles/withStyles"
import PropType from "prop-types"
import React, { Component } from "react"
import GoogleLogin from "react-google-login"
import { connect } from "react-redux"
import CopyRight from "../component/copyright"
import ShoutBox from "../component/message/SoutBox"
import { url } from "../config/config"
import { createToken, login, signUp } from "../redux/action/authaction"

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      signup: true,
      signUpUserName: "",
      signupEmail: "",
      signupPassword: "",
      signupRepass: "",
      mode: {},
      loginPassword: "",
      loginEmail: "",
    }
  }
  responseGoogle = response => {
    if (!response.error) {
      fetch(`${url}/login/g/${response.tokenId}`, {
        method: `POST`,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          sessionStorage.setItem("token", `Bearer ${data.token}`)
          sessionStorage.setItem("device", data.device_key)
          sessionStorage.setItem("uid", data.user_id)
          data.success && (window.location = "/")
          data.error && alert(data.message)
        })
        .catch(err => console.log(err))
    }
    console.log(response)
  }
  componentDidMount() {
    document.title = "Login into Chatpit | Chatpit"
    const data = {
      mode: "light",
      // bgColor: "#eeeeee",
    }
    this.setState({ mode: data })
    if (!localStorage.getItem("chat_mode")) {
      localStorage.setItem("chat_mode", JSON.stringify(data))
    }
  }
  componentWillReceiveProps(nextProps) {}

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSignUp = e => {
    e.preventDefault()
    const data = {
      name: this.state.signUpUserName,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      confirmPassword: this.state.signupRepass,
    }
    this.props.signUp(data)

    // signUp(data);
  }

  handleLogin = e => {
    e.preventDefault()
    const data = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    }
    this.props.login(data)
  }
  handleLoginClick = () => {
    this.setState({ signup: !this.state.signup })
  }

  oneTime = () => {
    fetch(`${url}/login/a`, {
      method: `POST`,
    })
      .then(res => {
        res.json().then(data => {
          console.log(data)
          sessionStorage.setItem("token", `Bearer ${data.token}`)
          sessionStorage.setItem("device", data.device_key)
          sessionStorage.setItem("uid", data.user_id)
          data.success && (window.location = "/")
          data.error && alert(data.message)
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props
    const inputProps = { variant: "outlined", margin: "dense", size: "small", required: true, fullWidth: true }

    return (
      <ThemeProvider theme={createTheme({ palette: { type: this.state.mode.mode, primary: { main: "#fdd835" }, secondary: { main: "#ffb300" } } })}>
        <Grid container style={{ minHeight: "100vh", textAlign: "center", background: "linear-gradient(184deg, rgb(36, 0, 2) 0%, rgb(121, 11, 9) 30%, rgb(255, 212, 0) 100%)" }}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Be together, whenever.</Typography>
              <Typography variant="subtitle1">A simple way to connect anonymously with anyone</Typography>
              <Divider />
              <Box maxWidth={300} mx="auto" my={2}>
                {this.state.signup ? (
                  <form onSubmit={this.handleSignUp} className={classes.from}>
                    <TextField
                      {...inputProps}
                      id="signUpUserName"
                      autoComplete="new-username"
                      value={this.state.signUpUserName}
                      onChange={this.handleChange}
                      placeholder="User name"
                      autoFocus
                    />
                    <br />
                    <TextField
                      {...inputProps}
                      style={{ font: "medium" }}
                      type="email"
                      id="signupEmail"
                      placeholder="Email address"
                      value={this.state.signupEmail}
                      onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                      {...inputProps}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      id="signupPassword"
                      value={this.state.signupPassword}
                      onChange={this.handleChange}
                    />
                    <br />
                    <TextField {...inputProps} type="password" placeholder="Retype password" id="signupRepass" value={this.state.signupRepass} onChange={this.handleChange} />
                    <br />
                    <Button fullWidth className={classes.button} variant="contained" type="submit" color="secondary">
                      Sign up
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={this.handleLogin} className={classes.from}>
                    <TextField
                      autoFocus
                      {...inputProps}
                      style={{ font: "medium" }}
                      type="email"
                      id="loginEmail"
                      placeholder="Email address"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <br />
                    <TextField {...inputProps} type="password" placeholder="Password" id="loginPassword" onChange={this.handleChange} />
                    <br />
                    <Button fullWidth show="false" className={classes.button} variant="contained" type="submit" color="secondary">
                      Sign in
                    </Button>
                  </form>
                )}

                {this.state.signup ? (
                  <div>
                    <Button fullWidth className={classes.button} onClick={this.handleLoginClick} variant="contained" color="default">
                      Existing user! Login
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button fullWidth className={classes.button} onClick={this.handleLoginClick} variant="contained" color="default">
                      Create new user
                    </Button>
                  </div>
                )}
                <Button fullWidth className={classes.button} onClick={this.oneTime} variant="contained" color="primary">
                  One time use*
                </Button>

                <GoogleLogin
                  clientId="672411401216-bd1qmtk0veo0jn4gmhc1vlgs4h5jgg9o.apps.googleusercontent.com"
                  buttonText="Login"
                  render={renderProps => (
                    <Button fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.button} variant="contained" color="primary">
                      continue with Google
                    </Button>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Box>

              <Divider />
              <CopyRight />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <div style={{ margin: "16px" }}>
              <AnonymousToSpecific key="auth_anonymous" hight="63vh" />
            </div>
          </Grid> */}
          <Grid xs={12} md={4} item>
            <div style={{ margin: "16px" }}>
              <ShoutBox key="auth_shoutBox" hight="73vh" />
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
}

const style = theme => ({
  paper: {
    padding: theme.spacing(2, 4),
    margin: theme.spacing(2),
    textAlign: "center",
    minHeight: "89vh",
  },
  button: {
    marginTop: "10px",
    // width: "220px",
  },
})

Auth.propType = {
  signUp: PropType.func.isRequired,
  login: PropType.func.isRequired,
  createToken: PropType.func.isRequired,
}
const mapState = () => ({})
const mapActionsToProps = { signUp, login, createToken }
export default connect(mapState, mapActionsToProps)(withStyles(style)(Auth))
