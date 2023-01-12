import { Divider, Grid, IconButton, ListItemText, Paper, Typography } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputBase from "@material-ui/core/InputBase"
import { withStyles } from "@material-ui/core/styles"
import ChevronRight from "@material-ui/icons/ChevronRight"
import moment from "moment"
import React, { Component } from "react"
import io from "socket.io-client"
import { names, uniqueNamesGenerator } from "unique-names-generator"
import { url } from "../../config/config"

const style = theme => ({
  msg: {
    // borderTopLeftRadius: theme.spacing(2.5),
    // borderBottomRightRadius: theme.spacing(2.5),
    // borderTopRightRadius: theme.spacing(2.5),
    // backgroundColor: theme.palette.primary.main,
    padding: "5px",
    // fontFamily: "monospace",
    // color: theme.palette.common.white,
    // marginTop: 12,
  },
  soutbox: {
    padding: 12,
    // width:theme.spacing(15)*3
  },
  input: {
    flex: "auto",
    borderRadius: 30,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginTop: 12,
    fontSize: 13,
  },
  msgList: {
    "scrollbar-width": "none" /* Firefox */,
    "-ms-overflow-style": " none" /* IE 10+ */,
    "&::-webkit-scrollbar": {
      width: "0px",
      background: "transparent" /* Chrome/Safari/Webkit */,
    },
  },
})

const config = {
  dictionaries: [names],
  length: 1,
}
const nam = uniqueNamesGenerator(config)
const BoxServer = io(`${url}/shoutBox`, { transports: ["websocket"] })

class Soutbox extends Component {
  constructor() {
    super()
    this.state = {
      msg: "",
      rMsg: [],
    }
  }
  componentWillUnmount = () => {
    // BoxServer.disconnect()
  }
  componentDidMount = () => {
    // console.log(localStorage.getItem("shout_name"));

    if (localStorage.getItem("shout_name") == null) {
      localStorage.setItem("shout_name", nam)
    }

    // console.log("mount");
    BoxServer.on("io", d => {
      console.log(d)
    })
    BoxServer.on("em", d => {
      console.log(d)
    })
    BoxServer.on("br", d => {
      console.log(d)
    })
    BoxServer.emit("login", "login success")
    BoxServer.on("message", d => {
      this.setState({ rMsg: [...this.state.rMsg, d] })
    })
    BoxServer.on("shouts", d => {
      this.setState({ rMsg: [...d] })
    })
    BoxServer.on("shoutsb", d => {
      console.log(d)
    })

    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  keyDown = e => {
    if (e.keyCode == 13) {
      this.setState({ [e.target.id]: e.target.value })
      this.Send()
    }
  }
  Send = e => {
    var message = this.state.msg
    var name = localStorage.getItem("shout_name") || nam

    message && BoxServer.emit("send_shout", { message, name })

    this.setState({ msg: "" })
  }
  scrollToBottom = () => {
    const { messageList } = this.refs
    messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight
    // messageList.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  render() {
    const { classes, hight } = this.props
    const { msg, rMsg } = this.state
    return (
      <Paper className={classes.soutbox}>
        <ListItemText primary="Chatpit Shout Box" secondary="Whatever you write here will be seen by all members of Chatpit..." />
        <Divider />
        <div ref="messageList" className={classes.msgList} style={{ overflow: "auto", height: hight }}>
          {rMsg?.map(p => (
            <div key={Math.random() * 5} className={classes.msg}>
              <Grid container spacing={1} justify="flex-start" alignItems="center">
                <Grid item style={{ textAlign: "left" }}>
                  <Typography style={{ fontSize: "11px", color: "#03f" }} variant="subtitle2" component="span">
                    {`[${moment(p.created_at).format("DD, MMM YY")}] `}
                  </Typography>
                  <Typography style={{ fontSize: 14, fontWeight: "600" }} component="span">
                    {p.name}{" "}
                  </Typography>
                  <Typography style={{ fontFamily: "monospace" }} component="span">
                    {p.message}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
        <Grid item>
          <InputBase
            className={classes.input}
            onKeyDown={this.keyDown}
            onChange={this.handleChange}
            value={msg} 
            fullWidth 
            id="msg"
            placeholder="Type a message..."
            endAdornment={React.createElement(
              InputAdornment,
              { position: "end" },
              React.createElement(
                IconButton,
                {
                  onClick: this.Send,
                  style: { padding: 5 },
                  button: "true",
                },
                React.createElement(ChevronRight, { className: classes.icon, color: "secondary" })
              )
            )}
          />
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(style)(Soutbox)
