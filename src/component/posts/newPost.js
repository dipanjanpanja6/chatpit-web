import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import withStyles from "@material-ui/core/styles/withStyles";
import { post } from "../../redux/action/postAction";
import PropType from "prop-types";
import { connect } from "react-redux";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      postText: "",
    };
  }
  componentDidMount() {}
  handlePost=()=> {
    
    const data = {
      post: this.state.postText,
    };
    this.props.post(data);
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log
    (this.state.postText);
  };
  render() {
    const { classes } = this.props;
    const { postText } = this.state;
    return (
      <Paper className={classes.postPaper}>
        <Typography variant="h6">For new post</Typography>
        <TextField
          id="postText"
          onChange={this.handleChange}
          value={postText}
          variant="outlined"
          fullWidth
          className={classes.postInput}
        />
        <br />
        <image src="#" />
        <Button onClick={this.handlePost} variant="contained" color="primary">
          submit
        </Button>
        <IconButton>
          <AddPhotoAlternateIcon />
        </IconButton>
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

export default connect(mapState,mapActionToProps) (withStyles(style)(NewPost));
