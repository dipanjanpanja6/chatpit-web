import React, { Component } from "react";
import { Grid, Drawer,AppBar,Typography,Toolbar,Divider } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
class Messenger extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='relative' color='transparent' className={classes.appBar}>
          <Toolbar>
              
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
        </Drawer>
      </div>
    );
  }
}
const drawerWidth = "300px";
const style = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});
export default withStyles(style)(Messenger);
