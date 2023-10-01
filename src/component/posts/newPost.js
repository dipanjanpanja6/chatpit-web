import { Button, IconButton, Paper, TextField, Typography } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import Image from "material-ui-image"
import PropType from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { post, postNull } from "../../redux/action/postAction"

class NewPost extends Component {
  constructor() {
    super()
    this.state = {
      postText: "",
      postImage: "",
      isImg: false,
    }
  }
  componentDidMount() {
    // console.log("newPost");
  }
  componentWillReceiveProps(p) {
    // console.log(p.posts.post);
    if (p.posts.post.newPost) {
      p.posts.post.newPost.error && toast.error(p.posts.post.newPost.message)
      p.posts.post.newPost.success && toast.success(p.posts.post.newPost.message)
      p.posts.post.newPost.success && this.setState({ postText: "" })
      p.posts.post.newPost.success && this.setState({ postImage: "" })
      p.posts.post.newPost.success && this.setState({ isImg: false })
      p.posts.post.newPost.success && this.props.postNull()
    }
  }
  handlePost = () => {
    const data = {
      post_image: this.state.postImage,
      post: this.state.postText,
      isImage: this.state.isImg,
      files: null,
    }
    // console.log(this.state.postText);

    this.props.post(data)
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  k = async e => {
    let i = await e.target.files[0]
    await this.setState({
      files: URL.createObjectURL(i),
      postImage: i,
      isImg: true,
    })
    // console.log(this.state);
    // console.log(i);
  }

  addPicture = () => {
    let i = this.refs.iii
    i.click()
  }
  render() {
    const { classes } = this.props
    const { postText, isImg, files } = this.state
    return (
      <>
        <Paper className={classes.postPaper}>
          <Typography variant="h6">For new post</Typography>
          {isImg && <Image src={files} imageStyle={{ objectFit: "cover" }} aspectRatio={16 / 9} />}

          <TextField id="postText" onChange={this.handleChange} value={postText} variant="outlined" fullWidth multiline maxRows={4} className={classes.postInput} />
          <br />

          <Button onClick={this.handlePost} variant="contained" color="secondary">
            submit
          </Button>
          <IconButton onClick={this.addPicture}>
            <AddPhotoAlternateIcon />
          </IconButton>
          {React.createElement("input", {
            type: "file",
            ref: "iii",
            hidden: true,
            onChange: this.k,
          })}
        </Paper>
      </>
    )
  }
}

const style = theme => ({
  postPaper: {
    padding: "12px",
  },
  postInput: {
    //   width:"90%",
    overflow: "hidden",
    margin: "12px 12px 12px 0",
  },
})

NewPost.propType = {
  post: PropType.func.isRequired,
  postNull: PropType.func.isRequired,
  posts: PropType.object.isRequired,
}
const mapState = state => ({
  posts: state,
})
const mapActionToProps = {
  post,
  postNull,
}

export default connect(mapState, mapActionToProps)(withStyles(style)(NewPost))
