import React, { useState, useEffect,useRef } from 'react';
import { Typography, Grid } from "@material-ui/core/";
import ChatBar from "./ChatBar";
import ChatMsg from "./ChatMsg";
import { makeStyles, useTheme } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
    date: {
        fontWeight: 500,
        color: "rgba(0,0,0,0.4)",
        margin: "12px 0",
        fontSize: 12,
        textAlign: "center",
        textTransform: "uppercase",
    },
}))

const Chat = (props) => {
    const classes = useStyles();
    var [msgArray, set_msgArray] = React.useState(null);
    var [msg, set_msg] = React.useState(null);
    // console.log(props);
    useEffect(()=>{
        scrollToBottom()
    })
    useEffect(() => {

        scrollToBottom()
        return function cleanup() {
            set_msg(null)
            set_msgArray(null)
        }
    }, [props.chatId])
    useEffect(() => {
        console.log(msg);
        if (msg !== null) {
            if (msgArray !== null) {
                set_msgArray([...msgArray, msg])
            } else {
                set_msgArray([msg])
            }
        }
        scrollToBottom()
    }, [msg])

    
   

    const send = (msg) => {
        // console.log(msg);
        if (msg !== '') {
            set_msg(msg)
        }
        // scrollToBottom()
    }
    const refContainer = useRef()
    const scrollToBottom = () => {
        console.log(refContainer);
        // refContainer.current.scrollTop = refContainer.current.scrollHeight - refContainer.current.clientHeight;
        refContainer.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }
    return (
        <>
            <Typography className={classes.date}>fri 1:46 PM</Typography>
            
            {/* <ChatMsg
                avatar={""}
                messages={[
                    "Im good.",
                    "See u later.",
                    {
                        type: "image",
                        alt: "sticker",
                        src: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B",
                    },
                ]}
            />
            
            <ChatMsg messages={["hello", "hi", "how r u?"]} side={"right"} />
            <ChatMsg messages={["hello", "i am fine bro", "how r u?"]} />
            <ChatMsg messages={["good"]} side={"right"} /> */}
            {
                msgArray ? msgArray.map((i) => {
                    // console.log(msgArray);
                    return (<ChatMsg key={Math.random() * 5} messages={[i]} side={"right"} />)
                }) : ""
            }

            
<div style={{height:"48px"}}/>

            <div ref={refContainer}/>
            <ChatBar send={send} />
</>
    )
}
export default Chat