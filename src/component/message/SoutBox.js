import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChevronRight from "@material-ui/icons/ChevronRight";

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
import {sockets} from '../../appBar/appbar'
import SkeletonMsg from "../SkeletonMsg";
const style = (theme) => ({
  msg: {
    borderTopLeftRadius: theme.spacing(2.5),
    borderBottomRightRadius: theme.spacing(2.5),
    borderTopRightRadius: theme.spacing(2.5),
    backgroundColor:theme.palette.primary.main,
    padding: "5px",
    fontFamily: "monospace",
    color: theme.palette.common.white,
    marginTop: "12px",
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
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
});

class Soutbox extends Component {
  constructor() {
    super();
    this.state={
      msg:'',
      rMsg:[]
    }
  }
  componentDidMount(){
    sockets.on('msg',(msg)=>{
      this.setState({rMsg:[...this.state.rMsg,msg]})
      console.log(this.state.rMsg);
      
    })
  }
  handleChange=(e)=>{
  this.setState({[e.target.id]:e.target.value})
  }
  Send=()=>{
    var msg =this.state.msg
    var uid ='k'
    sockets.emit('soutBox',{msg,uid})
  }
  render() {
    const { classes,hight } = this.props;
    console.log(hight);
    
    const { msg,rMsg } = this.state
    const SoutMessage =rMsg !==""?rMsg.map(p=>{
      return (
        <div className={classes.msg}>
          <Grid container spacing={1} justify="flex-start" alignItems='center'>
            <Grid item>
              <Avatar className={classes.avatar}>R</Avatar>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: "15px", fontWeight: " 600" }}>
                ParthRex
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{fontSize:'11px' ,color:'#aaa'}} variant='subtitle2'>fri,5:35 PM 
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Typography style={{ fontFamily: "monospace",color:'#555' }}>
              {p.msg}
            </Typography>
          </Grid>
        </div>
      )}):<SkeletonMsg/>
    
    return (
      <Paper className={classes.soutbox}>
        <ListItemText
          primary="Chatpit Shout Box"
          secondary="Whatever you write here will be seen by all members of Chatpit..."
        />
        <Divider />
        <div style={{ overflow: "auto", height: hight }}>
            {SoutMessage}
          
        </div>
        <Grid item>
          <InputBase
            className={classes.input}
              onChange={this.handleChange}
            value={msg}
            multiline
            fullWidth
            rowsMax={4}
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
