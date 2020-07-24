import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import PropType from "prop-types";

import { getPosts } from "../redux/action/postAction";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

import NewPost from "../component/posts/newPost";
import PostCard from "../component/posts/postCard";
import Skeleton from "../component/posts/sceleton";
import CopyRight from "../component/copyright";
import ImageSlider from "../component/posts/imageSlider";
import SoutBox from "../component/message/SoutBox";
import AnonymousToSpecific from "../component/message/AnonymousToSpecific";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: null,
    };
  }
  componentDidMount() {
    document.title = "Chatpit"
    this.props.getPosts();
    // console.log('home');

  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.auth);
    // if (nextProps.post.newPost) {
    //   console.log(nextProps.post.newPost);

    //   this.props.getPosts();
    // }
    if (nextProps.post.posts) {
      this.setState({
        posts: nextProps.post.posts,
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
    const { posts } = this.state;
    const { classes } = this.props;

    const postsList = posts ? (
      posts.map((p) => {
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
      })
    ) : (
        <Skeleton />
      );
    // function TabContainer(props) {
    //   return (
    //     <Typography component="div" style={{ padding: 8 * 3 }}>
    //       {props.children}
    //     </Typography>
    //   );
    // }

    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item className={classes.msgList} xs={12} md={5} lg={3}>

          <SoutBox key=' home_shoutBox' hight='67vh' />
        </Grid>

        <Grid className={classes.postGrid} item xs={12} md={7} lg={6}>
          <NewPost key='home_newPost' />
          {postsList}
          <hr />
        </Grid>

        <Grid item xs={12} md={12} lg={3} >
          {/* <AnonymousToSpecific  key = 'home_anonymous' hight='50vh' /> */}

          <CopyRight key='home_copyright' />
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
  postGrid: {
    // height: 'calc(100vh - 70px)',
    // overflow: 'auto',
    'scrollbar-width': 'none', /* Firefox */
    '-ms-overflow-style': ' none',  /* IE 10+ */
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */
    }
  }
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
