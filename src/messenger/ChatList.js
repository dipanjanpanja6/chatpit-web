import { Avatar, List } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import MoreHoriz from "@material-ui/icons/MoreHoriz"
import Skeleton from "@material-ui/lab/Skeleton"
import cx from "clsx"
import React from "react"

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends.apply(this, arguments)
}

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
}))

const ChatList = props => {
  var bold = props.bold

  const [active, setActive] = React.useState(false)
  const styles = useStyles({ bold, active })
  const data = props.ChatList

  if (data)
    return data.map(item => (
      <List style={{ padding: "2px 8px" }} key={item.chatId}>
        <ListItem
          button
          onClick={() => {
            props.goto(item)
          }}
          className={cx(styles.root, styles.rootHover)}>
          <Avatar src={item.sImage} className={styles.avatar}></Avatar>
          <ListItemText
            primary={item.sName}
            secondary={item.resentMessage}
            primaryTypographyProps={{ noWrap: true }}
            secondaryTypographyProps={{ noWrap: true }}
            classes={({ primary: styles.primary }, { secondary: styles.secondary })}
          />
          <Box position="relative">
            <MoreHoriz className={styles.more} />

            {bold && <div className={cx(styles.float, styles.dot)}></div>}
            {props.responded && <Avatar src={item.sImage} className={cx(styles.float, styles.responded)} />}
          </Box>
        </ListItem>
      </List>
    ))

  return (
    <>
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="wave" variant="circle" width={60} height={60} />
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="pulse" variant="circle" width={60} height={60} />
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="wave" variant="circle" width={60} height={60} />
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="wave" variant="circle" width={60} height={60} />
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="wave" variant="circle" width={60} height={60} />
      <Skeleton style={{ marginLeft: "9px", marginBottom: "9px" }} animation="pulse" variant="circle" width={60} height={60} />
    </>
  )
}

export default ChatList
