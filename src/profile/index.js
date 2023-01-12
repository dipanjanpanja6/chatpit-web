import { Avatar, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import EditIcon from "@material-ui/icons/Edit"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import SettingsIcon from "@material-ui/icons/Settings"
import { Skeleton } from "@material-ui/lab"
import PropType from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import CopyRight from "../component/copyright"
import DialogFrom from "../component/Dialog"
import DialogFile from "../component/Dialog File"
import NewPost from "../component/posts/newPost"
import PostCard from "../component/posts/postCard"
import Sceleton from "../component/posts/sceleton"
import Settings from "../component/SettingsDialog"
import { url } from "../config/config"
import { getProfile } from "../redux/action/userAction"

const token = sessionStorage.getItem("token")

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: "",
      open: false,
      openDialog: false,
      openDialogF: false,
      title: "",
      content: "",
      label: "",
      posts: null,
      mode: "light",
      modeState: "Dark Mode",
      SettingsOpen: false,
    }
  }
  getPost = () => {
    fetch(`${url}/profile/posts`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then(res =>
        res.json().then(data => {
          console.log(data)
          if (data.success) {
            this.setState({
              posts: data.data,
            })
          }
          if (data.error) {
            this.setState({
              posts: [],
            })
          }
        })
      )
      .catch(error => {
        console.log(error)
      })
  }
  componentWillMount() {
    document.title = "Profile - Chatpit"
    this.props.getProfile()
    this.getPost()
    const f = localStorage.getItem("chat_mode")
    if (f) {
      const theme = JSON.parse(f)
      if (theme.mode === "dark") {
        this.setState({
          mode: "dark",
          modeState: "Light Mode",
        })
      }
      if (theme.mode === "light") {
        this.setState({
          mode: "light",
          modeState: "Dark Mode",
        })
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post.newPost.success) {
      this.getPost()
    }
    if (nextProps.post.newPost.error) {
      alert(nextProps.post.newPost.message)
    }
    if (nextProps.user.userProfile) {
      this.setState({
        userProfile: nextProps.user.userProfile.user,
      })
    }
  }
  signOut = () => {
    sessionStorage.clear()
    localStorage.removeItem("shout_name")
    window.location = "/auth"
  }
  handleClick = () => {
    this.setState({ ...this.state, open: !this.state.open })
  }
  updateName = () => {
    this.setState({
      title: "Update username",
      content: "Enter a unique username and don't use any real information",
      label: "please enter username",
    })
    this.handelOpen()
  }
  updateNamee = data => {
    let d = { name: data }

    fetch(`${url}/profile/update/name`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    }).then(res => {
      res.json().then(data => {
        console.log(data)
        if (data.success) {
          this.props.getProfile()
          this.handleClose()
          toast.success(data.message)
        }
        if (data.error) {
          toast.error(data.message)
        }
      })
    })
  }
  updateDp = () => {
    this.setState({
      title: "Update Profile Picture",
      content: "Image should be less then 5MB",
      label: "",
    })
    this.handelOpenDF()
  }
  updateDpp = data => {
    var formdata = new FormData()
    formdata.append("profile_image", data)
    let toastId = null
    if (toastId === null) {
      toastId = toast("Upload in Progress", { autoClose: false })
    }
    fetch(`${url}/profile/update/image`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formdata,
    })
      .then(res =>
        res.json().then(d => {
          if (d.success) {
            this.props.getProfile()
            toast.update(toastId, { render: d.message, type: toast.TYPE.INFO, autoClose: 3000 })
            this.handleClose()
          }
          if (d.error) {
            toast.update(toastId, { render: d.message, type: toast.TYPE.INFO, autoClose: 3000 })
          }
          console.log(d)
        })
      )

      .catch(error => console.log("error", error))
  }
  handelOpen = () => {
    this.setState({
      openDialog: true,
    })
  }
  handelOpenDF = () => {
    this.setState({
      openDialogF: true,
    })
  }
  handleClose = () => {
    this.setState({
      openDialog: false,
      openDialogF: false,
    })
  }

  handleMode = () => {
    const { mode } = this.state
    if (mode === "light") {
      const data = {
        mode: "dark",
      }
      localStorage.setItem("chat_mode", JSON.stringify(data))
      localStorage.setItem("bgColor", "#000")
      this.setState({
        mode: "dark",
        modeState: "Light Mode",
      })
      window.location.reload()
    }
    if (mode === "dark") {
      this.setState({
        mode: "light",
        modeState: "Dark Mode",
      })
      const data = {
        mode: "light",
        // bgColor:'#eeeeee'
      }
      localStorage.setItem("chat_mode", JSON.stringify(data))
      localStorage.removeItem("bgColor")
      window.location.reload()
    }
  }

  moreSettings = () => {
    this.setState({ SettingsOpen: !this.state.SettingsOpen })
  }

  render() {
    const { classes } = this.props
    const { userProfile, open, openDialog, openDialogF, title, content, label, posts } = this.state

    const postsList = posts ? (
      posts.map(p => {
        return (
          <PostCard
            post_uid={p.post_by_uid}
            postID={p.post_id}
            key={p.post_id}
            isImg={p.isImage}
            avatar={p.post_by_image}
            userName={p.post_by_name}
            postDate={p.createdAt}
            postImgSrc={p.image_link}
            postText={p.post}
            {...p}
          />
        )
      })
    ) : (
      <Sceleton />
    )

    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid className={classes.msgList} xs={12} md={3}>
          <List>
            <ListItem onClick={this.signOut} button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary="Goodbye" />
            </ListItem>
            <ListItem onClick={this.handleMode} button>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary={this.state.modeState} />
            </ListItem>

            {/* <ListItem button>Add details</ListItem> */}

            <ListItem onClick={this.handleClick} button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText className={classes.listText} primary="Settings" />
              {open ? <ExpandLess className={classes.listText} /> : <ExpandMore className={classes.listText} />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={this.updateName}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="Change User Name" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={this.updateDp}>
                  <ListItemIcon>
                    <AddPhotoAlternateIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="Update Profile Picture" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={this.moreSettings}>
                  <ListItemIcon>
                    <MoreHorizIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="More settings" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            {userProfile ? <Avatar src={userProfile.userImage} className={classes.avatar} /> : <Skeleton variant="circle" className={classes.avatar} />}
            <Grid item className={classes.subTitle}>
              {userProfile ? (
                <>
                  <Typography align="center" className={classes.title} variant="h4">
                    {userProfile.name}
                  </Typography>
                  <Typography align="center" color="textSecondary" variant="subtitle1">
                    here you can add Bio
                  </Typography>
                  <Typography align="center" color="textSecondary" variant="subtitle2">
                    {userProfile.email}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton width="20%" className={classes.title} />
                  <Skeleton animation="pulse" width="30%" />
                  <Skeleton height={15} width="50%" />
                  <Skeleton height={18} width="40%" />
                  <Skeleton animation="pulse" width="30%" />
                </>
              )}

              <br />
            </Grid>
          </Paper>
          <br />
          <NewPost />
          {postsList}
        </Grid>

        <Grid item xs={12} md={3}>
          <CopyRight />
        </Grid>

        <DialogFrom key="1" title={title} content={content} label={label} handleClose={this.handleClose} od={openDialog} e={this.updateNamee} />
        <DialogFile key="2" title={title} content={content} label={label} handleClose={this.handleClose} odf={openDialogF} e={this.updateDpp} />
        <Settings open={this.state.SettingsOpen} settingsClosed={this.moreSettings} />
      </Grid>
    )
  }
}
const style = theme => ({
  root: {
    flexGrow: 1,
    // minHeight:'calc(100vh - 80px)'
  },
  paper: {
    marginTop: "100px",
    paddingTop: "200px",
  },
  title: {
    paddingTop: "20px",
  },
  subTitle: { textAlign: "-webkit-center" },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginLeft: `calc(50% - ${theme.spacing(13)}px)`,
    // marginLeft:'50%',
    marginTop: "-300px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listText: {
    color: theme.palette.text.primary,
  },
})

Layout.propType = {
  // token: PropType.func.isRequired,
  post: PropType.object.isRequired,
  getProfile: PropType.func.isRequired,
  user: PropType.object.isRequired,
}
const mapState = state => ({
  // auth: state.auth,
  user: state.user,
  post: state.post,
})
const mapActionToProps = {
  getProfile,
}

export default connect(mapState, mapActionToProps)(withStyles(style)(Layout))
