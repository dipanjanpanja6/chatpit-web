import React from "react"
import cx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import Search from "@material-ui/icons/Search"
import Edit from "@material-ui/icons/Edit"
import ThumbUp from "@material-ui/icons/ThumbUp"
import FormatPaint from "@material-ui/icons/FormatPaint"
const useStyles = makeStyles(() => ({
  avatar: {
    width: 100,
    height: 100,
    margin: "auto",
  },
  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "bold",
  },
  settingHeader: {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.08)",
    },
  },
  settingHead: {
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.34)",
    fontWeight: "bold",
    fontSize: 13,
    "& + *": {
      color: "rgba(0,0,0,0.34)",
      fontSize: 28,
    },
  },
  settingLabel: {
    fontSize: 13,
  },
  settingIcon: {
    padding: 6,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.04)",
    width: 32,
    height: 32,
  },
  blue: {
    color: "rgb(0, 153, 255)",
    background: "none",
  },
}))

const SettingHeader = ({ children, opened }) => {
  const styles = useStyles()
  return React.createElement(
    Box,
    {
      p: "14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      className: styles.settingHeader,
    },
    React.createElement(
      Typography,
      {
        className: styles.settingHead,
      },
      children
    ),
    opened ? React.createElement(KeyboardArrowDown, null) : React.createElement(KeyboardArrowLeft, null)
  )
}

const Setting = ({ label, icon, blue }) => {
  const styles = useStyles()
  return React.createElement(
    Box,
    {
      height: "44px",
      pl: "14px",
      pr: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    React.createElement(
      Typography,
      {
        variant: "body2",
      },
      label
    ),
    React.cloneElement(icon, {
      className: cx(styles.settingIcon, blue && styles.blue),
    })
  )
}

const ChatSettings = () => {
  const styles = useStyles()
  return React.createElement(
    "div",
    null,
    React.createElement(
      Box,
      {
        p: "14px 14px 16px 14px",
        textAlign: "center",
      },
      React.createElement(Avatar, {
        className: styles.avatar,
        src: "https://i.pravatar.cc/300?img=13",
      }),
      React.createElement(
        Typography,
        {
          className: styles.name,
          variant: "h1",
          align: "center",
        },
        "Imaad Casey"
      )
    ),
    React.createElement(Divider, null),
    React.createElement(
      SettingHeader,
      {
        opened: true,
      },
      "Options"
    ),
    React.createElement(
      Box,
      {
        pb: 2,
      },
      React.createElement(Setting, {
        label: "Search in Conversation",
        icon: React.createElement(Search, null),
      }),
      React.createElement(Setting, {
        label: "Edit Nicknames",
        icon: React.createElement(Edit, null),
      }),
      React.createElement(Setting, {
        label: "Change Theme",
        icon: React.createElement(FormatPaint, null),
        blue: true,
      }),
      React.createElement(Setting, {
        label: "Change Emoji",
        icon: React.createElement(ThumbUp, null),
        blue: true,
      })
    ),
    React.createElement(Divider, null),
    React.createElement(SettingHeader, null, "Privacy & Support"),
    React.createElement(Divider, null),
    React.createElement(SettingHeader, null, "Shared files"),
    React.createElement(Divider, null),
    React.createElement(SettingHeader, null, "Shared Photos")
  )
}

export default ChatSettings
