import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import MoreHoriz from "@material-ui/icons/MoreHoriz"
import Reply from "@material-ui/icons/Reply"
import TagFaces from "@material-ui/icons/TagFaces"
import cx from "clsx"
import PropTypes from "prop-types"
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
const useStyles = makeStyles(({ palette, spacing }) => {
  const radius = spacing(2.5)
  const size = 30
  const rightBgColor = palette.primary.main // if you want the same as facebook messenger, use this color '#09f'

  return {
    avatar: {
      width: size,
      height: size,
    },
    rightRow: {
      marginLeft: "auto",
    },
    msgBox: {
      display: "flex",
      alignItems: "center",
      marginBottom: 4,
      "&:hover $iconBtn": {
        opacity: 1,
      },
    },
    leftMsgBox: {
      textAlign: "left",
    },
    rightMsgBox: {
      textAlign: "right",
      flexDirection: "row-reverse",
    },
    msg: {
      maxWidth: "70%",
      padding: spacing(1, 2),
      borderRadius: 4,
      display: "inline-block",
      wordBreak: "break-word",
      // eslint-disable-next-line max-len
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "14px",
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.background.paper,
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.black,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
    iconBtn: {
      opacity: 0,
      padding: 6,
      color: palette.action.disabled,
      "&:hover": {
        color: palette.action.active,
      },
      margin: "0 4px",
      "& svg": {
        fontSize: 20,
      },
    },
    image: {
      maxWidth: 120,
      maxHeight: 120,
    },
  }
})

const ChatMsg = ({ avatar, messages, side }) => {
  const styles = useStyles()

  const attachClass = index => {
    if (index === 0) {
      return styles[`${side}First`]
    }

    if (index === messages.length - 1) {
      return styles[`${side}Last`]
    }

    return ""
  }

  return React.createElement(
    Grid,
    {
      container: true,
      spacing: 2,
      justify: side === "right" ? "flex-end" : "flex-start",
    },
    side === "left" &&
      React.createElement(
        Grid,
        {
          item: true,
        },
        React.createElement(Avatar, {
          src: avatar,
          className: cx(styles.avatar),
        })
      ),
    React.createElement(
      Grid,
      {
        item: true,
        xs: true,
      },
      messages.map((msg, i) => {
        return React.createElement(
          "div",
          {
            key: msg.id || i,
            className: cx(styles.row, styles[`${side}Row`]),
          },
          React.createElement(
            "div",
            {
              className: cx(styles.msgBox, styles[`${side}MsgBox`]),
            },
            typeof msg === "string" &&
              React.createElement(
                Typography,
                {
                  align: "left",
                  className: cx(styles.msg, styles[side], attachClass(i)),
                },
                msg
              ),
            typeof msg === "object" &&
              msg.type === "image" &&
              React.createElement(
                "img",
                _extends(
                  {
                    className: styles.image,
                    alt: msg.alt,
                  },
                  msg
                )
              ),
            React.createElement(
              IconButton,
              {
                className: styles.iconBtn,
              },
              React.createElement(TagFaces, null)
            ),
            React.createElement(
              IconButton,
              {
                className: styles.iconBtn,
              },
              React.createElement(Reply, null)
            ),
            React.createElement(
              IconButton,
              {
                className: styles.iconBtn,
              },
              React.createElement(MoreHoriz, null)
            )
          )
        )
      })
    )
  )
}

ChatMsg.propTypes = {
  avatar: PropTypes.string,
  // messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(["left", "right"]),
}
ChatMsg.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
}
export default ChatMsg
