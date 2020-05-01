import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle';
import ThumbUp from '@material-ui/icons/ThumbUp';
import TagFaces from '@material-ui/icons/TagFaces';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => (console.log(theme),{  
  root:{alignItems: 'center',
  width: '100%',
  display: 'inline-flex',
  backgroundColor: theme.palette.background.paper,
  position:'fixed',
  paddingLeft:'80px',
  bottom:0,
  right:0
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

const ChatBar = ({
  concise
}) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <AddCircle className={styles.icon} />
      <InputBase className={styles.input} placeholder='Type a message...'
       endAdornment={<InputAdornment position='end'>
         <TagFaces className={styles.icon}/>
       </InputAdornment>}>

      </InputBase>

      <ThumbUp className={styles.icon} />

    </div>

  )
  }
  export default ChatBar