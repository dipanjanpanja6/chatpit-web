import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Edit from '@material-ui/icons/Edit';
const useStyles = makeStyles(() => ({
  middle: {
    flex: 'auto',
    marginLeft: 16
  },
  iconBtn: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, .04)',
    '&:not(:last-child)': {
      marginRight: 16
    }
  }
}));

const ChatsHeader = () => {
  const styles = useStyles();
  return React.createElement(Box, {
    py: '10px',
    px: 2,
    display: 'flex',
    alignItems: 'center'
  }, React.createElement(Avatar, {
    alt: 'me',
    src: 'https://i.pravatar.cc/300?img=10'
  }), React.createElement(Typography, {
    variant: 'h5',
    className: styles.middle
  }, React.createElement("b", null, "Chats")), React.createElement(IconButton, {
    className: styles.iconBtn
  }, React.createElement(SettingsApplications, null)), React.createElement(IconButton, {
    className: styles.iconBtn
  }, React.createElement(Edit, null)));
};

export default ChatsHeader;