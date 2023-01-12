import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import Info from "@material-ui/icons/Info"
import React from "react"

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "inline-flex",
  },
  root: {
    padding: "8px 8px 8px 4px",
  },
  primary: {
    fontWeight: "bold",
    fontSize: 12,
  },
  secondary: {
    fontSize: 12,
  },
  iconBtn: {
    "& svg": {
      // color: '#000'
    },
  },
}))

const ConversationHead = props => {
  // console.log(props);
  const styles = useStyles()
  return (
    <ListItem ContainerComponent="div" ContainerProps={{ className: styles.container }} className={styles.root}>
      {props.user.image && (
        <ListItemAvatar>
          <Avatar src={props.user.image} />
        </ListItemAvatar>
      )}
      <ListItemText
        secondaryTypographyProps={{ style: { fontSize: "12px" } }}
        primaryTypographyProps={{ style: { fontSize: "14px" } }}
        primary={props.user.name}
        secondary={props.user.status ? props.user.status : "Loading..."}
      />
      <ListItemSecondaryAction style={{ display: "contents" }}>
        {/* <IconButton disabled className={styles.iconBtn}>
          <Phone />
        </IconButton>
        <IconButton disabled className={styles.iconBtn}>
          <Videocam />
        </IconButton> */}
        <IconButton disabled className={styles.iconBtn}>
          <Info />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default ConversationHead
