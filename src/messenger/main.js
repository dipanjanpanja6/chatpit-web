import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar,Grid,Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ConversationHead from "./ConversationHead";
import ChatsHeader from "./ChatList";
import ChatSet from "./ChatsHeader";
import Chat from './Chat'
import { url } from '../config/config'
import io from 'socket.io-client'
import { connect } from "react-redux";
import { getProfile } from "../redux/action/userAction";
import PropType from 'prop-types';
import { toast } from 'react-toastify';


const messenger = io(`${url}/messenger`)
const token = sessionStorage.getItem("token");

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  date: {
    fontWeight: 500,
    color: "rgba(0,0,0,0.4)",
    margin: "12px 0",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  appBar: {
    top: "40px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    top: "40px",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  hide: {
    display: "none",
  },
  drawer: {
    top: "40px",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    top: "40px",

    width: drawerWidth,
    // top:theme.mixins.toolbar,

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...theme.mixins.toolbar,
  },
  drawerClose: {
    top: "40px",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(10) + 1,
    // [theme.breakpoints.up('sm')]: {
    //     width: theme.spacing(9) + 1,
    // },
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: "flex",
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  chatMsg: {
    marginBottom: "40px",
  },
  scroll: {
    paddingTop: '20px',
    overflowX: 'hidden',
    scrollbarWidth: 'none', /* Firefox */
    '-ms-overflow-style': 'none', /* IE 10+ */
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent', /* Chrome/Safari/Webkit */
    }
  }
}));


function MiniDrawer(props) {

  
  // console.log(props);
  if(props.auth.auth==false){
    window.location="/auth"
  }
  const uid = props.auth.auth.uid;
  let name = "";
  let [ChatList, setChatList] = React.useState(null);
  let userProfile;
  if(props.auth.auth){
  if (props.user.userProfile) {
    
    userProfile = props.user.userProfile.user.userImage;
    name = props.user.userProfile.user.name
  }}
  // let chatListFEtch=null;
  // setUserImage(props.user.userProfile)
  // console.log(userImage);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Messenger - Chatpit`;
    props.getProfile();

    fetch(`${url}/messenger/chatList`, {
      method: 'GET',
      headers: { Authorization: token }
    }).then(res => {
      res.json().then(d => {
        console.log(d);
        if(d.authorized===false){toast.error(d.error);window.location="/auth"}
        else if (d !== null) {
          setChatList(Object.values(d));
        } else {
          setChatList([])
        }
      })

    }).catch(r => console.log(r))


  }, []);

  useEffect(() => {

  })

  useEffect(() => {

    // messenger.emit('login', uid)
    // messenger.emit('chatListUpdate', uid)


  }, [uid])


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [chatBox, setChatBox] = React.useState(null);
  const [activeUser, setActiveUser] = React.useState({
    name: "Welcome to Chatpit Messenger " + name,
    image: "",
    status: "Select or Add any User first"
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chatSearch = (e) => {
    if (e !== "") {
      fetch(`${url}/messenger/add/${e}`, {
        method: 'POST',
        headers: { AUTHORIZATION: token },
      }).then(res => {
        res.json().then(d => {
          console.log(d);
          if (d.success) {
            fetch(`${url}/messenger/chatList`, {
              method: 'GET',
              headers: { Authorization: token }
            }).then(res => {
              res.json().then(d => {
                console.log(Object.values(d));

                setChatList(Object.values(d));
              })

            }).catch(r => console.log(r))
          } else {
            toast.error(d.message)
          }
        })
      })
    }
    console.log(e);
  }
  const goto = (e) => {
    console.log(e);
    setChatBox(
      e)
    // setActiveImage(e.sImage);
    // setActiveName(e.sName);
    // setActiveStatus("");
    setActiveUser({
      name: e.sName,
      image: e.sImage,
      status: e.status
    });

  }

  const xxxx = chatBox ?
    (
    <Chat key={chatBox.chatId} data={chatBox}/>
      ) : <Grid container justify="flex-end">
        <Grid item style={{height:'calc(100vh - 142px)'}}>

      <Typography style={{paddingTop:'142px',textAlign:"center"}} variant="h5">
          Welcome to Chatpit Messenger
          Welcome to Chatpit Messenger
          Welcome to Chatpit Messenger
      </Typography>
        </Grid>
  </Grid>

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <ConversationHead user={activeUser} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* //////////////////////////////////////////////////////// */}
          <ChatSet submit={chatSearch} name={name} userImage={userProfile} />

          <IconButton style={{ padding: 10 }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.scroll}>
          {/* ///////////////////////////////////////////////////////////// */}
          <ChatsHeader ChatList={ChatList} goto={goto} />
          <div className={classes.toolbar} />
        </div>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <div className={classes.chatMsg}> */}
        <div>
          {xxxx}
        </div>
      </main>
    </div>
  );

}


const mapState = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapActionToProps = {
  getProfile,

}
MiniDrawer.defaultProps = {
  // user:{}
}
MiniDrawer.propType = {

  getProfile: PropType.func.isRequired,
  user: PropType.object.isRequired,
};
export default connect(mapState, mapActionToProps)(MiniDrawer)

