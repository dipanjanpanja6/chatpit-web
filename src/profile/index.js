import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { getProfile,updateName,updateDp } from "../redux/action/userAction";
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CopyRight from "../component/copyright";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PostCard from "../component/posts/postCard";
import NewPost from "../component/posts/newPost";
import DialogFrom from "../component/Dialog";
import DialogFile from "../component/Dialog File";
import {ThemeProvider } from "@material-ui/core/styles";
import {createMuiTheme} from "@material-ui/core";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      
      userProfile: "",
      open: false,
      openDialog: false,
      openDialogF: false,
      title:'',content:'',label:''
    };
  }
  componentDidMount() {
    this.props.getProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userProfile.success) {
      this.setState({
        userProfile: nextProps.user.userProfile.user,
      });
      console.log(nextProps.user.userProfile.user);
    }
    console.log(this.state.userProfile);
  }
  signOut = () => {
    localStorage.clear();
    window.location = "/auth";
  };
  handleClick = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };
  updateName = () => {
    this.setState({
      title:'Update username',content:"Enter a unique username and don't use any real information",label:'please enter username'
    })
    this.handelOpen()
  };
  updateNamee=(data)=>{
let d={name:data}
this.props.updateName(d);


  }
  updateDp = () => {
    this.setState({
      title:'Update Profile Picture',content:'Image should be less then 5MB',label:''
    })
    this.handelOpenDF()
  };
  updateDpp = (data)=>{   
    this.props.updateDp(data)
  }
  handelOpen = () => {
    this.setState({
      openDialog: true,
    });
  };
  handelOpenDF = () => {
    this.setState({
      openDialogF: true,
    });
  };
  handleClose = () => {
    this.setState({
      openDialog:false,
      openDialogF:false
    })
  };
  
  mode=()=>{
    
    
  }
  render() {
    const { classes } = this.props;
    const { userProfile, open, openDialog,openDialogF,title,content,label } = this.state;
    // const postsList = posts.map((p) => {
    //   return (
    //     <PostCard
    //       key={p.post_id}
    //       isImg={p.isImage}
    //       avatar={p.post_by_image}
    //       userName={p.post_by_name}
    //       postDate={p.createdAt}
    //       postImgSrc={p.image_link}
    //       postText={p.post}
    //       likeCount={p.likeCount}
    //     />
    //   );
    // });
    return (
      
      <Grid container spacing={2} className={classes.root}>
        <Grid className={classes.msgList} xs={12} md={3}>
          <List>
            <ListItem onClick={this.signOut} button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
            <ListItem onClick={this.mode} button>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText primary="Dark mode" />
            </ListItem>

            {/* <ListItem button>Add details</ListItem> */}

            <ListItem onClick={this.handleClick} button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={this.updateName}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="update user name" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={this.updateDp}
                >
                  <ListItemIcon>
                    <AddPhotoAlternateIcon />
                  </ListItemIcon>
                  <ListItemText primary="update user image" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar src={userProfile.userImage} className={classes.avatar} />
            <Grid item>
              <Typography align="center" className={classes.title} variant="h4">
                {userProfile.name}
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                className={classes.subTitle}
                variant="subtitle1"
              >
                I'm 20 years old
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                className={classes.subTitle}
                variant="subtitle2"
              >
                {userProfile.email}
              </Typography>
              <br />
            </Grid>
          </Paper>
          <br />
          <NewPost />
          {/* {postsList} */}
        </Grid>

        <Grid item xs={12} md={3}>
          <CopyRight />
        </Grid>

        <DialogFrom key='1' title={title} content={content} label={label} handleClose={this.handleClose} od={openDialog} e={this.updateNamee} />
        <DialogFile key="2" title={title} content={content} label={label} handleClose={this.handleClose} odf={openDialogF} e={this.updateDpp} />
      </Grid>
      
    );
  }
}
const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: "100px",
    paddingTop: "200px",
  },
  title: {
    paddingTop: "20px",
  },
  subTitle: {},
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
});

Layout.propType = {
  token: PropType.func.isRequired,
  auth: PropType.object.isRequired,
  getProfile: PropType.func.isRequired,
  user: PropType.object.isRequired,
  updateName:PropType.func.isRequired,
  updateDp:PropType.func.isRequired
};
const mapState = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapActionToProps = {
  getProfile,updateName,updateDp
};

export default connect(mapState, mapActionToProps)(withStyles(style)(Layout));
