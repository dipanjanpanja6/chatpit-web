import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Phone from '@material-ui/icons/Phone';
import Videocam from '@material-ui/icons/Videocam';
import Info from '@material-ui/icons/Info';
const useStyles = makeStyles(() => ({
  container: {
    width: '100%'
  },
  root: {
    padding: '8px 8px 8px 16px'
  },
  primary: {
    fontWeight: 'bold'
  },
  secondary: {
    fontSize: 12
  },
  iconBtn: {
    '& svg': {
      // color: '#000'
    }
  }
}));

const ConversationHead = () => {
  const styles = useStyles();
  return(
  
    <ListItem ContainerComponent='div' ContainerProps={{className: styles.container}} className= {styles.root}>
  <ListItemAvatar>
    <Avatar src='https://i.pravatar.cc/300?img=13'/>
  </ListItemAvatar>
  <ListItemText primary='Rex3to' secondary='online'/>
  <ListItemSecondaryAction>
<IconButton className={styles.iconBtn}>
  <Phone/>
</IconButton>
<IconButton className={styles.iconBtn}>
  <Videocam/>
</IconButton>
<IconButton className={styles.iconBtn}>
  <Info/>
</IconButton>
  </ListItemSecondaryAction>
</ListItem>
    
  )
  return React.createElement(ListItem, {
    ContainerComponent: 'div',
    ContainerProps: {
      className: styles.container
    },
    className: styles.root
  }, React.createElement(ListItemAvatar, null, React.createElement(Avatar, {
    src: 'https://i.pravatar.cc/300?img=13'
  })), React.createElement(ListItemText, {
    primary: 'Imaad Casey',
    secondary: 'active 17m ago',
    classes: {
      primary: styles.primary,
      secondary: styles.secondary
    }
  }), React.createElement(ListItemSecondaryAction, null, React.createElement(IconButton, {
    className: styles.iconBtn
  }, React.createElement(Phone, null)), React.createElement(IconButton, {
    className: styles.iconBtn
  }, React.createElement(Videocam, null)), React.createElement(IconButton, {
    className: styles.iconBtn
  }, React.createElement(Info, null))));
};

export default ConversationHead;