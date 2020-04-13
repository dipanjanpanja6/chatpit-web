import React, { Component } from "react";
import './home.css'
import {
  LinearProgress,
  Tab,
  Tabs,
  Grid,
  AppBar,
  Paper,
  TabPanel,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import PropType from "prop-types";
import { token ,checkAuthenticated} from "../redux/action/authaction";
import { getPosts } from "../redux/action/postAction";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeChat from "./unAuthChat/homeChat";
import NewPost from "../component/posts/newPost";
import PostCard from "../component/posts/postCard";
import CopyRight from "../component/copyright";
import Layout from "../profile/index";
import Messenger from '../home/massegenger/masenger'
import Loading from '../loading/loading'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      auth: false, ///
      completed: 2,
      buffer: 10,
      value: 0,
      posts: [],
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const deviceKEY = localStorage.getItem("device");
    this.props.checkAuthenticated()
    // this.props.token();
    // if(!token && !deviceKEY){
    //   window.location='/auth';
    // }
    this.props.getPosts();

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.auth.auth);
    if (nextProps.auth.auth) {

      this.setState({
        auth: nextProps.auth.auth,
      });
    }
    if (nextProps.post.posts) {
      nextProps.post.posts.map((p) => {
        this.state.posts.push(p);
      });
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };
  render() {
    const { auth, completed, buffer, value, posts } = this.state;
    const { classes } = this.props;
    // console.log(auth);

    const postsList = posts.map((p) => {
      return (
        <PostCard
          
          key={p.post_id}
          isImg={p.isImage}
          avatar={p.post_by_image}
          userName={p.post_by_name}
          postDate={p.createdAt}
          postImgSrc={p.image_link}
          postText={p.post}
          likeCount={p.likeCount}
        />
      );
    });
    function TabContainer(props) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
        </Typography>
      );
    }
    
    return (
      <div>
        {!auth && (
          // <LinearProgress color="primary" className={classes.loadingPage} />
          <Loading/>
        )}
        {auth && (
          <Grid>
            <AppBar position='sticky' color='primary'>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor='inherit'
                centered
              >
                <Tab icon={<HomeIcon />} />
                <Tab icon={<ForumOutlinedIcon />} />
                <Tab icon={<AccountCircleIcon />} />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>
              <Grid container spacing={2} className={classes.root}>
                  
                  <Grid item className={classes.msgList} xs={12} lg={3}>
                    <Paper><Grid>
                      <Typography variant='subtitle2'>This Paper is on working space</Typography></Grid></Paper>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <NewPost />
                    {postsList}
                    <hr/>
                  </Grid>

                  <Grid item xs={12} lg={3}>
                     <CopyRight /> 
                  </Grid>
                </Grid>


              </TabContainer>}
            {value === 1 && <TabContainer>
              <Messenger/>
              </TabContainer>}
            {value === 2 && <TabContainer>
              <Layout/>
              </TabContainer>}
            
          </Grid>
        )}
      </div>
    );
  }
}
const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  msgList: {},
});

Home.propType = {
  token: PropType.func.isRequired,
  auth: PropType.object.isRequired,
  getPosts: PropType.func.isRequired,
  checkAuthenticated:PropType.func.isRequired,

};
const mapState = (state) => ({
  auth: state.auth,
  post: state.post,
});
const mapActionToProps = {
  checkAuthenticated,
  getPosts,

};

export default connect(mapState, mapActionToProps)(withStyles(style)(Home));
