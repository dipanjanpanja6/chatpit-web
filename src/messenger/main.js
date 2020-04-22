import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ChatMsg from "./ChatMsg";
import ConversationHead from "./ConversationHead";
import ChatsHeader from "./ChatList";
import ChatBar from "./ChatBar";
import ChatSet from "./ChatsHeader";

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
    top: "48px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    top: "48px",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    top: "48px",

    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    top: "48px",

    width: drawerWidth,
    // top:theme.mixins.toolbar,

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...theme.mixins.toolbar,
  },
  drawerClose: {
    top: "48px",

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
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    bottom: 0,
    right: 0,
    left:'80px',
    position: "fixed",

    height: 52,
    width:`calc(100vw - ${theme.spacing(13)}px )`,
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: "0 8px",
    background: "white",
  },
  chatMsg: {
    marginBottom: "40px",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <ConversationHead />
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
          <ChatSet />
          <IconButton style={{padding:5}} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ChatsHeader />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <div className={classes.chatMsg}>
          <Typography className={classes.date}>fri 1:46 PM</Typography>
          <ChatMsg
            avatar={""}
            messages={[
              "Im good.",
              "See u later.",
              {
                type: "image",
                alt: "sticker",
                src:
                  "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B",
              },
            ]}
          />
          <ChatMsg messages={["hello", "hi", "how r u?"]} side={"right"} />
          <ChatMsg messages={["hello", "hi", "how r u?"]} side={"right"} />
          <ChatMsg messages={["hello", "hi", "how r u?"]} side={"right"} />
        </div>

        <div className={classes.footer}>
          <ChatBar />
        </div>
      </main>
    </div>
  );
}
