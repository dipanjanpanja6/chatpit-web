import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import ChatMsg from "./ChatMsg"
const AVATAR = "https://i.pravatar.cc/300?img=13"
const useStyles = makeStyles(() => ({
  date: {
    fontWeight: 500,
    color: "rgba(0,0,0,0.4)",
    margin: "12px 0",
    fontSize: 12,
    textAlign: "center",
  },
}))

const ChatDialog = () => {
  const styles = useStyles()

  return React.createElement(
    Box,
    {
      p: "16px 30px 12px 10px",
    },
    React.createElement(ChatMsg, {
      avatar: AVATAR,
      messages: [
        "Hi Jenny, How r u today?",
        "Did you train yesterday",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
      ],
    }),
    React.createElement(
      Typography,
      {
        className: styles.date,
      },
      "FRI 1:46 PM"
    ),
    React.createElement(ChatMsg, {
      side: "right",
      messages: [
        "Great! What's about you?",
        "Of course I did. Speaking of which check this out",
        {
          type: "image",
          alt: "sticker",
          src: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47236319_2150120948374011_4041608446519279616_n.png?_nc_cat=1&_nc_eui2=AeFis6Ozie5kjvkroSrDVnNAgqObZIvcuVVgXzfeKcO4DwwScziUGg6fw_1q8iRI49LMJ2ZJj037zvV3NqoMnVmqCtt9rWUwtLN2RENWfYPQYg&_nc_ohc=KE5rZeqFyBIAQkojKlvtrWdxe2rdAYR6Ps69ry7-0ahej4-YPP8Dyub_g&_nc_ht=scontent.fbkk12-3.fna&oh=95c38213f29607e0a82c34d1a427b2b1&oe=5E9E92B3",
        },
        "Commodo ullamcorper a lacus vestibulum sed arcu. Sed faucibus turpis in eu mi bibendum neque egestas. Maecenas volutpat blandit aliquam etiam erat velit. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Suspendisse sed nisi lacus sed viverra.",
      ],
    }),
    React.createElement(
      Typography,
      {
        className: styles.date,
      },
      "FRI 4:18 PM"
    ),
    React.createElement(ChatMsg, {
      avatar: AVATAR,
      messages: [
        "Im good.",
        "See u later.",
        {
          type: "image",
          alt: "sticker",
          src: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B",
        },
      ],
    })
  )
}

export default ChatDialog
