import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import { DialogTitle, ListItemIcon, ListItemText, ListItem, ListItemSecondaryAction, Switch, Divider,List } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import blue from '@material-ui/core/colors/blue';





const useStyles = makeStyles((theme) => ({
    listText: {

    }
}))
export default function ResponsiveDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  

    const handleClose = () => {
        props.settingsClosed()
    };

    return (
        <div>
       
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={handleClose}

            >
                <DialogTitle >{"Chatpit Settings"}</DialogTitle>
                <DialogContent dividers>
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <SpeakerNotesOffIcon color='disabled' />
                            </ListItemIcon>
                            <ListItemText className={classes.listText} primary="Anonymous Message" secondary='Receive Anonymous message with Profile link '/>
                            <ListItemSecondaryAction>
                                <Switch
                                disabled 
                                checked
                                    edge="end"
                                    // checked={state.checked}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemIcon>
                                <ShuffleIcon color='secondary' />
                            </ListItemIcon>
                            <ListItemText className={classes.listText} primary="Random Shout Box Username" secondary='Set your Username to Shout Box Username'/>
                            <ListItemSecondaryAction>
                                <Switch
                                disabled 
                                    edge="end"
                                    // checked={state.checked}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsActiveIcon style={{ color:blue[500] }}/>
                                {false && <NotificationsPausedIcon/>}
                            </ListItemIcon>
                            <ListItemText className={classes.listText} primary="Push Notification" secondary='Stop receiving live notifications'/>
                            <ListItemSecondaryAction>
                                <Switch
                                disabled 
                                    edge="end"
                                    // checked={state.checked}
                                    // onChange={handleChange}
                                    name="checkedA"
                                />
                            </ListItemSecondaryAction>
                        </ListItem >
                        <Divider variant="inset" component="li" />
                        <ListItem button disabled>
                            <ListItemIcon>
                                <DeleteForeverIcon color='error'/>
                            </ListItemIcon>
                            <ListItemText className={classes.listText} primary="Delete Profile" secondary='Delete Post, Comment, Like, everything. This can not be undone'/>
                            
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
    );
}
