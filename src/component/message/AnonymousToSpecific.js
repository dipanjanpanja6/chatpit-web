import { Divider, Grid, IconButton, ListItemText, Paper } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputBase from "@material-ui/core/InputBase"
import { withStyles } from "@material-ui/core/styles"
import ChevronRight from "@material-ui/icons/ChevronRight"
import React, { Component } from "react"

const style = theme => ({
  msg: {
    borderTopLeftRadius: theme.spacing(2.5),
    borderBottomRightRadius: theme.spacing(2.5),
    borderTopRightRadius: theme.spacing(2.5),
    backgroundColor: theme.palette.primary.main,
    padding: "5px",
    fontFamily: "monospace",
    color: theme.palette.common.white,
    marginTop: "12px",
  },
  soutbox: {
    padding: "12px",
  },
  input: {
    flex: "auto",
    borderRadius: 30,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginTop: "12px",
    fontSize: 13,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
})

class AnonymousToSpecific extends Component {
  constructor() {
    super()
    this.state = {
      rMsg: [],
    }
  }
  componentDidMount() {
    // console.log('kk');
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  Send = () => {}
  render() {
    const { classes, hight } = this.props
    const { msg, userID } = this.state

    return (
      <Paper className={classes.soutbox}>
        <ListItemText
          primary="Send anonymous message to Chatpit member"
          secondary="Whatever you write here will be sent anonymously,
          they will not find your identity"
        />
        <Divider />
        <Grid item>
          <InputBase
            className={classes.input}
            onChange={this.handleChange}
            value={userID}
            fullWidth
            id="userID"
            placeholder="Type user ID"
            endAdornment={React.createElement(
              InputAdornment,
              { position: "end" },
              React.createElement(
                IconButton,
                {
                  onClick: this.Send,
                  style: { padding: 0 },
                  button: "true",
                },
                React.createElement(ChevronRight, {
                  className: classes.icon,
                  color: "secondary",
                })
              )
            )}></InputBase>
        </Grid>
        <br />
        <Divider />
        <div style={{ overflow: "auto", height: hight }}>{/* {SoutMessage} */}</div>
        <Grid item>
          <InputBase
            className={classes.input}
            onChange={this.handleChange}
            value={msg}
            multiline
            fullWidth
            maxRows={4}
            id="msg"
            placeholder="Type a message..."
            endAdornment={React.createElement(
              InputAdornment,
              { position: "end" },
              React.createElement(
                IconButton,
                {
                  onClick: this.Send,
                  style: { padding: 0 },
                  button: "true",
                },
                React.createElement(ChevronRight, {
                  className: classes.icon,
                  color: "secondary",
                })
              )
            )}></InputBase>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(style)(AnonymousToSpecific)
