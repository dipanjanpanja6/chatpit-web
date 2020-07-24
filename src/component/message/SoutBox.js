import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { uniqueNamesGenerator, Config, adjectives, colors, names, starWars, animals } from 'unique-names-generator';

import {
  Grid,
  Paper,
  Typography,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { sockets } from '../../appBar/appbar'
// import SkeletonMsg from "../SkeletonMsg";

import { url } from '../../config/config'
import io from 'socket.io-client'



const style = (theme) => ({
  msg: {
    // borderTopLeftRadius: theme.spacing(2.5),
    // borderBottomRightRadius: theme.spacing(2.5),
    // borderTopRightRadius: theme.spacing(2.5),
    // backgroundColor: theme.palette.primary.main,
    padding: "5px",
    // fontFamily: "monospace",
    // color: theme.palette.common.white,
    // marginTop: "12px",
  },
  soutbox: {
    padding: "12px",
    // width:theme.spacing(15)*3
  },
  input: {
    flex: "auto",
    borderRadius: 30,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginTop: "12px",
    fontSize: 13,
  },
  msgList: {
    'scrollbar-width': 'none', /* Firefox */
    '-ms-overflow-style': ' none',  /* IE 10+ */
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */
    }
  }
});
const ke = Math.random() * 21;
const config: Config = {
  dictionaries: [names], length: 1
}
const nam = uniqueNamesGenerator(config)
const BoxServer = io(`${url}/shoutBox`)

class Soutbox extends Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      rMsg: []
    }
  }
  componentWillUnmount = () => {
    // BoxServer.disconnect()
  }
  componentDidMount = () => {
    // console.log(localStorage.getItem("shout_name"));

    if (localStorage.getItem("shout_name") == null) {
      localStorage.setItem("shout_name", nam);

    }

    // console.log("mount");
    BoxServer.on('io', (d) => { console.log(d) })
    BoxServer.on('em', (d) => { console.log(d) })
    BoxServer.on('br', (d) => { console.log(d) })
    BoxServer.emit('login', 'login success')
    BoxServer.on('message', (d) => {
      // console.log(d);

      this.setState({ rMsg: [...this.state.rMsg, d] })
    })
    BoxServer.on('shouts', (d) => {

      // console.log(d);
      this.setState({ rMsg: [...d] })

    })
    BoxServer.on('shoutsb', (d) => { console.log(d) })

    this.scrollToBottom()
  }

  componentDidUpdate() {
    // console.log('update');
    // shoutBoxServer.on('new user connwcted', (d) => {
    //   console.log(d)
    // });
    this.scrollToBottom();
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }
  keyDown = (e) => {
    if (e.keyCode == 13) {
      this.setState({ [e.target.id]: e.target.value })
      this.Send()
    }
  }
  Send = (e) => {
    var message = this.state.msg
    var uid = ke
    var name = localStorage.getItem("shout_name") ? localStorage.getItem("shout_name") : nam

    // console.log(name);

    message && BoxServer.emit('send_shout', { message, uid, name })

    this.setState({ msg: "" })
  }
  scrollToBottom = () => {
    const { messageList } = this.refs;
    // console.log(messageList);
    messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
    // messageList.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  render() {
    const { classes, hight } = this.props;
    // console.log(hight);

    const { msg, rMsg } = this.state
    // console.log(rMsg);

    const SoutMessage = rMsg ? rMsg.map(p => {
      // console.log(p)

      return (
        <div key={Math.random() * 5} className={classes.msg}>
          <Grid container spacing={1} justify="flex-start" alignItems='center'>
            <Grid item>
              <Typography style={{ fontSize: '11px', color: '#03f' }} variant='subtitle2'>{`[${p.dates},${p.times}]`}
              </Typography>
            </Grid>

            <Grid item>
              <Typography style={{ fontSize: "13px", color: '#0c0', fontWeight: " 600" }}>
                {p.name}
              </Typography>
            </Grid>
            <Grid item >
              <Typography style={{ fontFamily: "monospace", }}>
                {p.message}
              </Typography>
            </Grid>
          </Grid>


        </div>
      )
    }) : ""

    return (
      <Paper className={classes.soutbox}>
        <ListItemText
          primary="Chatpit Shout Box"
          secondary="Whatever you write here will be seen by all members of Chatpit..."
        />
        <Divider />
        <div ref="messageList" className={classes.msgList} style={{ overflow: "auto", height: hight }}>
          {SoutMessage}
        </div>
        <Grid item>
          <InputBase
            className={classes.input}
            onKeyDown={this.keyDown}
            onChange={this.handleChange}
            value={msg}
            // multiline
            fullWidth
            // rowsMax={4}
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
                  button: 'true',
                },
                React.createElement(ChevronRight, {
                  className: classes.icon,
                  color: "secondary",
                })
              )
            )}
          ></InputBase>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(style)(Soutbox);
