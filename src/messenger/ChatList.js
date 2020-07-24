
import React from 'react';
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
// import ChatListItem from './ChatListItem';
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar, Grid, List } from '@material-ui/core';

function _extends() {
  _extends = Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      } return target;
    }; return _extends.apply(this, arguments);
}
const data = [{
  avatar: 'https://i.pravatar.cc/300?img=11',
  name: 'Jordyn Frank',
  info: 'You sent a photo • 2:04 PM',
  responded: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=12',
  name: 'Marwan Combs',
  info: 'Where r u? • 1:54 PM',
  bold: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=13',
  name: 'Imaad Casey',
  info: 'You: Good to see u • SAT',
  active: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=14',
  name: 'Philip Rhodes',
  info: 'You: Lorem ipsum • THU',
  responded: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=15',
  name: 'Chardonnay Raymond',
  info: 'Chardonnay called you • THU'
}, {
  avatar: 'https://i.pravatar.cc/300?img=16',
  name: 'Akram Farmer',
  info: 'You: still look forw... • THU',
  responded: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=17',
  name: 'Nichola Mackie',
  info: 'You: https://mui... • DEC 10'
}, {
  avatar: 'https://i.pravatar.cc/300?img=18',
  name: 'Ines Page',
  info: 'You called Ines • DEC 9'
}, {
  avatar: 'https://i.pravatar.cc/300?img=19',
  name: 'Ephraim Gonzalez',
  info: 'I think you can d... • DEC 9',
  responded: true
}, {
  avatar: 'https://i.pravatar.cc/300?img=20',
  name: 'Tyrell Stark',
  info: 'Okay, I think... • DEC 6'
}, {
  avatar: 'https://i.pravatar.cc/300?img=21',
  name: 'Tasha Whitmore',
  info: 'You sent an attach... • NOV 30'
}, {
  avatar: 'https://i.pravatar.cc/300?img=22',
  name: 'Hawwa Davenport',
  info: 'okay kub • NOV 28'
}];
const useStyles = makeStyles(({ palette }) => ({
  root: ({ active }) =>
    _extends(
      {
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
      },
      active && {
        backgroundColor: "rgba(0, 0, 0, .05)",
      }
    ),
  rootHover: {
    "&:hover": {
      "& $dot": {
        display: "none",
      },
      "& $responded": {
        display: "none",
      },
      "& $more": {
        visibility: "visible",
      },
    },
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  primary: ({ bold }) =>
    _extends(
      {},
      bold && {
        fontWeight: "bold",
      }
    ),
  secondary: ({ bold }) =>
    _extends(
      {
        fontSize: 13,
        color: "#999",
      },
      bold && {
        fontWeight: "bold",
        color: palette.text.primary,
      }
    ),
  float: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: "#09f",
    borderRadius: "50%",
  },
  more: {
    visibility: "hidden",
    fontSize: 20,
  },
  responded: {
    width: 16,
    height: 16,
  },
}));

const ChatList = (props) => {
  var bold=props.bold
  // var active=props.active
  // var active=true
  const [active,setActive]=React.useState(false)


  const styles = useStyles({ bold, active, });
  const data = props.ChatList
  
  
  // console.log(data);
  
  return data ? data.map(item => {
    return(
    
      <List style={{padding:"2px 8px"}}  key={item.chatId}>
      <ListItem button onClick={()=>{props.goto(item)
      // setActive(true)
      }} className={cx(styles.root, styles.rootHover)}>
        <Avatar src={item.sImage} className={styles.avatar}></Avatar>
        <ListItemText
          primary={item.sName}
          secondary={item.resentMessage}
          primaryTypographyProps={{ noWrap: true }}
          secondaryTypographyProps={{ noWrap: true }}
          classes={
            { primary: styles.primary },
            { secondary: styles.secondary }
          }
        />
        <Box position='relative'>
          <MoreHoriz className={styles.more} />

          {bold && <div className={cx(styles.float, styles.dot)} >
          </div>
          }
          {props.responded &&
            <Avatar src={item.sImage}
              className={cx(styles.float, styles.responded)} />
          }
        </Box>
      </ListItem>
      </List>
)
  })
    :
    <>
      {/* <Grid container> */}
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation="wave"
        variant="circle"
        width={60} height={60}
      />
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation='pulse'
        variant="circle"
        width={60} height={60}
      />
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation="wave"
        variant="circle"
        width={60} height={60}
      />
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation="wave"
        variant="circle"
        width={60} height={60}
      />
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation="wave"
        variant="circle"
        width={60} height={60}
      />
      <Skeleton style={{ marginLeft: "9px", marginBottom: '9px' }}
        animation='pulse'
        variant="circle"
        width={60} height={60}
      />

      {/* </Grid> */}

    </>
};

export default ChatList;