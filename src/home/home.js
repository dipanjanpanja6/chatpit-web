import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import PropType from "prop-types";

import { getPosts } from "../redux/action/postAction";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

import NewPost from "../component/posts/newPost";
import PostCard from "../component/posts/postCard";
import Skeleton from "../component/posts/sceleton";
import CopyRight from "../component/copyright";
import ImageSlider from "../component/posts/imageSlider";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: null,
    };
  }
  componentDidMount() {
    this.props.getPosts();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.auth);
    // if (nextProps.post.newPost) {
    //   console.log(nextProps.post.newPost);
      
    //   this.props.getPosts();
    // }
    if (nextProps.post.posts) {
      this.setState({
        posts:nextProps.post.posts
      })
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const { posts } = this.state;
    const { classes } = this.props;

    const postsList =posts? posts.map((p) => {
      return (
        <PostCard
        post_uid={p.post_by_uid}
          postID={p.post_id}
          key={p.post_id}
          isImg={p.isImage}
          avatar={p.post_by_image}
          userName={p.post_by_name}
          postDate={`${p.date} ${p.time}`}
          postImgSrc={p.image_link}
          postText={p.post}
          likeCount={p.likeCount}
        />
      );
    }):<Skeleton/>
    function TabContainer(props) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
        </Typography>
      );
    }

    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item className={classes.msgList} xs={12} md={5} lg={3}>
          <Paper>
            <ImageSlider />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={6}>
          <NewPost />
          {postsList}
          <hr />
        </Grid>

        <Grid item xs={12} md={12} lg={3}>
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
  msgList: {},
});

Home.propType = {
  post: PropType.object.isRequired,
  getPosts: PropType.func.isRequired,
};
const mapState = (state) => ({
  post: state.post,
});
const mapActionToProps = {
  getPosts,
};

export default connect(mapState, mapActionToProps)(withStyles(style)(Home));
