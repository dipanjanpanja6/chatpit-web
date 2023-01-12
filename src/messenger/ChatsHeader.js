import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Edit from "@material-ui/icons/Add"
import ClearIcon from "@material-ui/icons/Clear"
import PropType from "prop-types"
import React from "react"

import { TextField } from "@material-ui/core"
const useStyles = makeStyles(() => ({
  middle: {
    flex: "auto",
    marginLeft: 16,
    marginRight: 16,
    font: "caption",
  },
  iconBtn: {
    padding: 5,
    // backgroundColor: 'rgba(0, 0, 0, .04)',
    "&:not(:last-child)": {
      marginRight: 5,
    },
  },
}))

const ChatsHeader = props => {
  const [x, setx] = React.useState(false)
  const [value, valueSet] = React.useState("")
  const styles = useStyles()
  return (
    <Box py="1px" display="flex" alignItems="center">
      {!x && (
        <>
          {" "}
          <Avatar alt="me" src={props.userImage} />
          <Typography variant="h5" noWrap className={styles.middle}>
            {props.name}
          </Typography>
          {/* <IconButton className={styles.iconBtn}> */}
          {/* <SettingsApplications /> */}
          {/* </IconButton> */}
        </>
      )}
      {x && (
        <TextField
          onKeyDown={e => {
            if (e.keyCode === 13) {
              props.submit(value)
              valueSet("")
              setx(!x)
            }
          }}
          value={value}
          onChange={e => {
            valueSet(e.target.value)
          }}
        />
      )}
      <IconButton
        onClick={() => {
          setx(!x)
          valueSet("")
        }}
        className={styles.iconBtn}
      >
        {x && <ClearIcon />}
        {!x && <Edit />}
      </IconButton>
    </Box>
  )
}
ChatsHeader.defaultProps = {
  userImage: "",
  name: "",
}
ChatsHeader.propType = {
  userImage: PropType.string.isRequired,
  name: PropType.string.isRequired,
}
export default ChatsHeader
