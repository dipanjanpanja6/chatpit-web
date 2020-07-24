import React, { Component } from "react";
import { url } from "../../config/config";
import { toast } from 'react-toastify';
import {
  withStyles,
  ListItemText,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Grid,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropType from "prop-types";
import clsx from "clsx";
import SkeletonC from "./SkeletonCmnt";

const token = sessionStorage.getItem("token");

class postCard extends Component {
  constructor() {
    super();
    this.uid = sessionStorage.getItem("uid");
    this.state = {
      expanded: false,
      anchorEl: null,
      cmnt: "",
      deletepost: false,
      liked: false,
      likeCount: 0,
      allCmnt: null,
    };
  }
  componentWillUnmount=()=>{
    
  }
  componentDidMount = () => {
    this.setState({ likeCount: this.props.likeCount });
    const postID = this.props.postID;
    fetch(`${url}/post/${postID}/check/like`, {
      method: "GET",
      headers: { AUTHORIZATION: token },
    })
      .then((res) => {
        res.json().then((d) => {
          this.setState(d);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getComment = () => {
    const postID = this.props.postID;
    fetch(`${url}/post/${postID}/comments`, {
      method: "GET",
      headers: { AUTHORIZATION: token },
    })
      .then((res) => {
        res.json().then((d) => {
          console.log(d);
          d.success && this.setState({ allCmnt: d.data });
          d.error && this.setState({ allCmnt: [] });
        });
      })
      .catch((err) => console.log(err));
  };
  handleExpandClick = () => {
    this.setState({ ...this.state, expanded: !this.state.expanded });
    !this.state.expanded && this.getComment();
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  deletePost = () => {

    const token = sessionStorage.getItem("token");
    const postID = this.props.postID;
    fetch(`${url}/post/${postID}/delete`, {
      method: "DELETE",
      headers: { Authorization: token },
    })
      .then((res) => {
        res.json().then((d) => {
          d.success && toast.warn("Post deleted successfully")
          d.success && this.setState({ deletepost: true });
          d.error && toast.warn(d.message)
          console.log(d);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  reportPost=()=>{
    toast.warn("Report currently not working")
    this.handleClose()

  }
  handleCmntChnge = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  like = () => {
    if (this.state.liked) {
      this.setState({ likeCount: this.state.likeCount - 1 });
    }
    if (!this.state.liked) {
      this.setState({ likeCount: this.state.likeCount + 1 });
    }
    this.setState({ liked: !this.state.liked });
    const postID = this.props.postID;

    fetch(`${url}/post/${postID}/like`, {
      method: "POST",
      headers: { AUTHORIZATION: token },
    }).then((res) => {
      res.json().then((d) => {
        console.log(d);
        d.error && this.setState({ liked: false });
        d.error && toast.warn(d.message)
      });
    });
  };
  cmntSend = () => {
    var data = {
      comment: this.state.cmnt,
    };
    const postID = this.props.postID;

    fetch(`${url}/post/${postID}/comment`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          this.setState({ cmnt: "" });
          this.getComment();
  }
  result.error && toast.warn(result.message)
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const {
      classes,
      userName,
      postDate,
      postImgSrc,
      postText,
      avatar,
      isImg,
      post_uid,
    } = this.props;
    const {
      expanded,
      anchorEl,
      deletepost,
      cmnt,
      liked,
      likeCount,
      allCmnt,
    } = this.state;
    const AllCmnt = allCmnt ? (
      allCmnt.map((p) => {
        return (
          <Grid key={p.comment_id} className={classes.commentG} container justify="flex-start">
            <Avatar className={classes.small} src={p.comment_by_userImage} />
            <Paper className={classes.commentP}>
              <ListItemText
                primary={p.comment_by_userName}
                secondary={p.comment}
              />
            </Paper>
          </Grid>
        );
      })
    ) : (
      <SkeletonC />
    );
    return (
      <>
        {!deletepost && (
          <Card className={classes.card}>
            <CardHeader
              avatar={<Avatar src={avatar} className={classes.avatar}></Avatar>}
              action={
                <>
                  <IconButton onClick={this.handleClick} aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.reportPost}>Report</MenuItem>
                    {this.uid === post_uid && (
                      <MenuItem onClick={this.deletePost}>Delete Post</MenuItem>
                    )}
                  </Menu>
                </>
              }
              title={userName}
              subheader={postDate}
            />
            {isImg && (
              <CardMedia
                className={classes.media}
                image={postImgSrc}
                title="#"
              />
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {postText}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Typography>{likeCount}</Typography>
              <IconButton onClick={this.like}>
                {liked && <FavoriteIcon color="error" />}
                {!liked && <FavoriteIcon />}
              </IconButton>
              {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={this.handleExpandClick}
                
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Comments</Typography>
                {AllCmnt}
                <InputBase
                  className={classes.input}
                  onChange={this.handleCmntChnge}
                  onKeyDown={(e)=>{
                    if(e.keyCode===13){
                      this.cmntSend()
                    }
                  }}
                  value={cmnt}
                  multiline={true}
                  fullWidth={true}
                  rowsMax={4}
                  id="cmnt"
                  placeholder="Type a message..."
                  endAdornment={React.createElement(
                    InputAdornment,
                    { position: "end" },
                    React.createElement(
                      IconButton,
                      {
                        onClick: this.cmntSend,
                        style: { padding: 0 },
                        button:"true",
                      },
                      React.createElement(SendIcon, { className: classes.icon ,color:'secondary',})
                    )
                  )}
                ></InputBase>
              </CardContent>
            </Collapse>
          </Card>
        )}
      </>
    );
  }
}
const style = (theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginBottom: "12px",
  },
  commentG: {
    margin: "12px",
  },
  commentP: {
    padding: "1px 12px",
    marginLeft: "12px",
    marginRight: "12px",
  },
  card: {
    // padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardHolder: {
    padding: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    // backgroundColor: red[500],
  },
  grpAvatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  icon: {
    padding: 6,
    "&:not(:first-child)": {
      marginLeft: 4,
    },
  },
  input: {
    flex: "auto",
    borderRadius: 30,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    margin: "0 8px",
    // height: 36,
    fontSize: 13,
  },
});
postCard.propType = {
  userName: PropType.any.isRequired,
  postDate: PropType.any.isRequired,
  postImgSrc: PropType.any.isRequired,
  postText: PropType.any.isRequired,
};
export default withStyles(style)(postCard);
