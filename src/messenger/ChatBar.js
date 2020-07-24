import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle';
import ThumbUp from '@material-ui/icons/ThumbUp';
import TagFaces from '@material-ui/icons/TagFaces';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => (
  // console.log(theme),
  {
    root: {
      alignItems: 'center',
      width: '100%',
      display: 'inline-flex',
      backgroundColor: theme.palette.background.paper,
      position: 'fixed',
      paddingLeft: '80px',
      bottom: 0,
      right: 0
    },
    icon: {
      color: theme.palette.secondary.main,
      width: 44,
      height: 44,
      padding: 6,
      '&:not(:first-child)': {
        marginLeft: 4
      }
    },
    input: {
      flex: 'auto',
      borderRadius: 40,
      paddingLeft: 16,
      backgroundColor: 'rgba(0,0,0,0.04)',
      margin: '0 8px',
      height: 36,
      fontSize: 13
    }
  }));

const ChatBar = (props) => {
  // console.log(props);
  const styles = useStyles();
  const [msg, set_msg] = React.useState('')

  const onChangeHandler = (e) => {
    set_msg(e.target.value)
  }
  const send2 = () => {
    if (msg !== '') {
      props.send(msg);

    } if (msg == '') {
      props.send({
        type: "image",
        alt: "sticker",
        src: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B",
      })
    }
    set_msg('')
  }
  return (
    <div className={styles.root}>
      <IconButton disabled className={styles.icon}>
        <AddCircle color="secondary" />
      </IconButton>
      <InputBase
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            send2();
          }
        }}
        autoFocus
        onChange={onChangeHandler} value={msg} className={styles.input} placeholder='Type a message...'

        endAdornment={
          <InputAdornment position='end'>
            <IconButton disabled className={styles.icon}>
              <TagFaces color="secondary" />
            </IconButton>
          </InputAdornment>}>

      </InputBase>

      {/* <ThumbUp className={styles.icon} /> */}

      <IconButton onClick={send2} className={styles.icon} >
        {msg ? <SendIcon color="secondary" />
          : <FavoriteIcon color="error" />}
      </IconButton>

    </div>

  )
}
export default ChatBar