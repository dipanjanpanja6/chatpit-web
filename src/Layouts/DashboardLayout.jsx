import { AppBar, Badge, Tab, Tabs } from "@material-ui/core"
import { ThemeProvider, createTheme, withStyles } from "@material-ui/core/styles"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined"
import HomeIcon from "@material-ui/icons/Home"
import NotificationsIcon from "@material-ui/icons/Notifications"
import PropType from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loading from "../loading/loading"
import Mi from "../messenger/main"
import Notify from "../notifications/notify"
import Home from "../pages/home"
import Layout from "../profile/index"
import { checkAuthenticated } from "../redux/action/authaction"

class DashboardLayout extends Component {
  constructor() {
    super()
    this.state = {
      auth: false, ///
      value: 0,
      mode: {},
      color: "#fdd835",
    }
  }
  componentDidMount() {
    this.props.checkAuthenticated()
    const theme = JSON.parse(localStorage.getItem("chat_mode"))
    if (!theme) {
      const data = {
        mode: "light",
        // bgColor:'#eeeeee'
      }
      this.setState({ mode: data })
      localStorage.setItem("chat_mode", JSON.stringify(data))
    } else {
      if (theme.mode === "light") {
        this.setState({
          color: "#fdd835",
        })
      }
      if (theme.mode === "dark") {
        this.setState({
          color: theme.mode,
        })
      }
      this.setState({ mode: theme })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.auth.authorized) {
      console.log(nextProps.auth)

      this.setState({
        auth: nextProps.auth.auth.authorized,
      })
    }
    if (nextProps.auth.mode) {
      this.setState({
        //mode: "light",
      })
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue })
  }

  render() {
    const { auth, value, mode } = this.state
    const { classes } = this.props

    function TabContainer({ value, id, children, ...props }) {
      return value === id && children
    }

    return (
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: { main: "#fdd835", dark: "#000" },
            secondary: { main: "#ffb300" },
            type: mode.mode,
          },
        })}>
        {auth ? (
          <>
            <AppBar position="sticky" color={mode.mode === "light" ? "primary" : "default"} className={classes.AppBar}>
              <Tabs value={value} onChange={this.handleChange} indicatorColor="secondary" textColor="inherit" centered>
                <Tab icon={<HomeIcon />} />
                <Tab
                  icon={
                    <Badge badgeContent={4} color="error">
                      <ForumOutlinedIcon />
                    </Badge>
                  }
                />
                <Tab
                  icon={
                    <Badge badgeContent={4} color="error">
                      <NotificationsIcon />
                    </Badge>
                  }
                />
                <Tab icon={<AccountCircleIcon />} />
              </Tabs>
            </AppBar>

            <TabContainer value={value} id={0}>
              <Home />
            </TabContainer>

            <TabContainer value={value} id={1}>
              {/* <Messenger/> */}
              <Mi />
            </TabContainer>

            <TabContainer value={value} id={2}>
              <Notify />
            </TabContainer>

            <TabContainer value={value} id={3}>
              <Layout />
            </TabContainer>

            <ToastContainer />
          </>
        ) : (
          <Loading />
        )}
      </ThemeProvider>
    )
  }
}

DashboardLayout.propType = {
  auth: PropType.object.isRequired,
  checkAuthenticated: PropType.func.isRequired,
}
const mapState = state => ({ auth: state.auth })
const mapActionToProps = { checkAuthenticated }

export default connect(mapState, mapActionToProps)(withStyles((theme) => ({ AppBar: { zIndex: theme.zIndex.drawer + 1 } }))(DashboardLayout))
