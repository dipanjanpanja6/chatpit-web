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

class AnonymousToSpecific extends Component {
  constructor() {
    super();
    this.state={
      rMsg:[]

    }
  }
  componentDidMount(){
// console.log('kk');

  }
  handleChange=(e)=>{
  this.setState({[e.target.id]:e.target.value})
  }
  Send=()=>{

  }
  render() {
    const { classes,hight } = this.props;
    const { msg,rMsg,userID } = this.state
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
      )}):''
    
    return (
      <Paper className={classes.soutbox}>
        <ListItemText
          primary="Send anonymous message to Chatpit member"
          secondary='Whatever you write here will be sent anonymously,
          they will not find your identity'
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
        <br/>
        <Divider/>
        <div style={{ overflow: "auto", height:hight  }}>
            {/* {SoutMessage} */}
          
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

export default withStyles(style)(AnonymousToSpecific);
