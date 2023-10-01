import { DialogTitle, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from "@material-ui/core/"
import Button from "@material-ui/core/Button"
import blue from "@material-ui/core/colors/blue"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive"
import NotificationsPausedIcon from "@material-ui/icons/NotificationsPaused"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff"
import React from "react"

export default function ResponsiveDialog(props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClose = () => {
    props.settingsClosed()
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={props.open} onClose={handleClose}>
        <DialogTitle>{"Chatpit Settings"}</DialogTitle>
        <DialogContent dividers>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <SpeakerNotesOffIcon color="disabled" />
              </ListItemIcon>
              <ListItemText primary="Anonymous Message" secondary="Receive Anonymous message with Profile link " />
              <ListItemSecondaryAction>
                <Switch disabled checked edge="end" name="checkedA" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <ShuffleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Random Shout Box Username" secondary="Set your Username to Shout Box Username" />
              <ListItemSecondaryAction>
                <Switch disabled edge="end" name="checkedA" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <NotificationsActiveIcon style={{ color: blue[500] }} />
                {false && <NotificationsPausedIcon />}
              </ListItemIcon>
              <ListItemText primary="Push Notification" secondary="Stop receiving live notifications" />
              <ListItemSecondaryAction>
                <Switch disabled edge="end" name="checkedA" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button disabled>
              <ListItemIcon>
                <DeleteForeverIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Delete Profile" secondary="Delete Post, Comment, Like, everything. This can not be undone" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
