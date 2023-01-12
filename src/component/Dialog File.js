import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

export default function FormDialog(props) {
  const [count, setCount] = useState("")
  const handleClose = () => {
    props.handleClose()
    setCount("")
  }
  const handleChange = e => {
    setCount(e.target.files[0])
    // console.log(e.target.files[0].File);
  }
  const Apply = () => {
    props.e(count)
  }
  return (
    <div>
      <Dialog open={props.odf} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
          <TextField accept="image/*" autoFocus fullWidth onChange={handleChange} margin="dense" id={props.label} label={props.label} type="file" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Apply} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
