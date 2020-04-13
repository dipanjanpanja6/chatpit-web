import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import {getProfile} from '../redux/action/userAction'
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CopyRight from "../component/copyright";


class Layout extends Component {
  constructor() {
    super();
    this.state = {
      userProfile:""
    };
  }
  componentDidMount(){
this.props.getProfile()
  }
  componentWillReceiveProps(nextProps){
if(nextProps.user.userProfile.success){
  this.setState({
    userProfile:nextProps.user.userProfile.user
  })
  console.log(nextProps.user.userProfile.user);
}
console.log(this.state.userProfile);


  }
  signOut=()=>{
    localStorage.clear();
    window.location='/auth'
  }
  render() {
    const { classes } = this.props;
    const { userProfile } = this.state;

    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid className={classes.msgList} xs={12} lg={3}>
            <List>
              <ListItem onClick={this.signOut} button>Sign out</ListItem>
              <ListItem button>Dark mode</ListItem>
              <ListItem button>Change user name</ListItem>
              <ListItem button>New profile picture</ListItem>
              <ListItem button>Add details</ListItem>
              <ListItem button>Settings</ListItem>
            </List>
          </Grid>

        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper}>
          <Avatar src={userProfile.userImage} className={classes.avatar}/>
          <Grid item>
    <Typography align='center' className={classes.title} variant='h4'>{userProfile.name}</Typography>
            <Typography align='center' color='textSecondary' className={classes.subTitle} variant='subtitle1'>I'm 20 years old</Typography>
    <Typography align='center' color='textSecondary' className={classes.subTitle} variant='subtitle2'>{userProfile.email}</Typography>
         
          </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={3}>
          <CopyRight />
        </Grid>

      </Grid>
    );
  }
}
const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper:{
    marginTop:'100px',
    paddingTop:'200px'
  },
  title:{
    paddingTop:'20px'
  },
  subTitle:{
    
  },
  avatar:{
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginLeft:`calc(50% - ${theme.spacing(13)}px)`,
    // marginLeft:'50%',
    marginTop:'-300px'
  }
});

Layout.propType = {
  token: PropType.func.isRequired,
  auth: PropType.object.isRequired,
  getProfile: PropType.func.isRequired,
  user:PropType.object.isRequired
};
const mapState = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapActionToProps = {
 getProfile
};

export default connect(mapState,mapActionToProps) (withStyles(style)(Layout));
