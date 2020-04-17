import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import Image from 'material-ui-image';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import withStyles from "@material-ui/core/styles/withStyles";
import { post } from "../../redux/action/postAction";
import PropType from "prop-types";
import { connect } from "react-redux";
import DialogFile from "../Dialog File";
import { keys } from "@material-ui/core/styles/createBreakpoints";

class NewPost extends Component { 
  constructor() {
    super();
    this.state = {
      postText: "",
      postImage: "",
      isImg: false,
    };
  }
  componentDidMount() {}
  handlePost = async () => {
    const data = {
      post_image: this.state.postImage,
      post: this.state.postText,
      isImage: this.state.isImg,
      files: null,
    };
    // console.log(this.state.postText);

    this.props.post(data);
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  k = async (e) => {
    let i = await e.target.files[0];
    await this.setState({
      files: URL.createObjectURL(i),
      postImage: i,
      isImg: true,
    });
    console.log(this.state);
    // console.log(i);
  };

  addPicture = () => {
    let i = this.refs.iii;
    i.click();
  };
  render() {
    const { classes } = this.props;
    const { postText, isImg, files } = this.state;
    return (
      <Paper className={classes.postPaper}>
        {isImg && (
        <Image
          src={files          }
          imageStyle={{'object-fit': 'cover'}}
          aspectRatio={16/9}
        />
         )} 
        <Typography variant="h6">For new post</Typography>
        <TextField
          id="postText"
          onChange={this.handleChange}
          value={postText}
          variant="outlined"
          fullWidth
          multiline
          rowsMax={4}
          className={classes.postInput}
        />
        <br />

        <Button onClick={this.handlePost} variant="contained" color="primary">
          submit
        </Button>
        <IconButton onClick={this.addPicture}>
          <AddPhotoAlternateIcon />
        </IconButton>
        {React.createElement("input", {
          type: "file",
          ref: "iii",
          hidden: "true",
          onChange: this.k,
        })}
      </Paper>
    );
  }
}

const style = (theme) => ({
  postPaper: {
    padding: "12px",
  },
  postInput: {
    //   width:"90%",
    overflow: "hidden",
    margin: "12px 12px 12px 0",
  },
});

NewPost.propType = {
  post: PropType.func.isRequired,
};
const mapState = (state) => ({});
const mapActionToProps = {
  post,
};

export default connect(mapState, mapActionToProps)(withStyles(style)(NewPost));
