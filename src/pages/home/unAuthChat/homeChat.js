import React from "react"
import ChatMessages from "../massegenger/ChatMassage"

const Demo = () => {
  const AVATAR = "https://i.pinimg.com/originals/0a/dd/87/0add874e1ea0676c4365b2dd7ddd32e3.jpg"
  return (
    <div>
      <ChatMessages
        avatar={AVATAR}
        messages={[
          "Hi Jenny, How r u today?",
          "Did you train yesterday",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
        ]}
      />
      <ChatMessages side={"right"} messages={["Great! What's about you?", "Of course I did. Speaking of which check this out"]} />
      <ChatMessages avatar={AVATAR} messages={["Im good.", "See u later."]} />
    </div>
  )
}

export default Demo
