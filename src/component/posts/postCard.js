import React, { Component } from "react";
import { url } from "../../config/config";

import {
  withStyles,
  TextField,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import TagFaces from "@material-ui/icons/TagFaces";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropType from "prop-types";
import clsx from "clsx"; 

class postCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      anchorEl:null
    };
  }
  handleExpandClick = () => {
    this.setState({ ...this.state, expanded: !this.state.expanded });
  };
  handleClose = ()=>{

  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  };
  
  handleClose = () => {
    this.setState({anchorEl:null});
  };
  deletePost = ()=>{
    const token =localStorage.getItem('token');
   const postID = this.props.postID;
    fetch(`${url}/post/${postID}/delete`,{
      method:'DELETE',
      headers:{'Authorization':token,},
    }).then(res=>{res.json().then(d=>{
     d.success && alert(d.message);
      
    })}).catch(error=>{console.log(error);
    })
    
  }
  render() {
    const {
      classes,
      userName,
      postDate,
      postImgSrc,
      postText,
      avatar,
      isImg,
    } = this.props;
    const { expanded,anchorEl } = this.state;
    return (
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
            <MenuItem onClick={this.handleClose}>Report</MenuItem>
            <MenuItem onClick={this.deletePost}>Delete Post</MenuItem>

          </Menu>
            </>
          }
          title={userName}
          subheader={postDate}
        />
        {isImg && (
          <CardMedia className={classes.media} image={postImgSrc} title="#" />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {postText}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <AvatarGroup classes={{ avatar: classes.grpAvatar }} max={3}>
            <Avatar
              className={classes.grpAvatar}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              className={classes.grpAvatar}
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              className={classes.grpAvatar}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
            <Avatar
              className={classes.grpAvatar}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
          </AvatarGroup>
          <IconButton aria-label="share">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            // aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comment</Typography>
            {React.createElement(InputBase, {
              className: classes.input,
              multiline: true,
              fullWidth: true,
              rowsMax: 4,
              placeholder: "Type a message...",
              endAdornment: React.createElement(
                InputAdornment,
                { position: "end" },
                React.createElement(
                  IconButton,
                  {
                    // button: true
                  },
                  React.createElement(SendIcon, { className: classes.icon })
                )
              ),
            })}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
const style = (theme) => ({
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
    color: "rgb(0, 153, 255)",
    // width: 35,
    // height: 35,
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
