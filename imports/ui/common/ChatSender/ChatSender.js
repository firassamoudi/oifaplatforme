import "./style.scss";

import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import React from "react";

const ChatSender = () => {
  return (
    <Box className="ChatSender">
      <Box className="ChatSender__input">
        <InputBase
          placeholder="Enter your message..."
          fullWidth
          startAdornment={
            <AttachFileIcon
              style={{
                color: "#ffc857",
                fontSize: "3rem",
                transform: "rotateZ(45deg)",
                margin: "0 2.8rem 0 3.6rem",
              }}
            />
          }
          endAdornment={
            <Box className="ChatSender__btn">
              <SendIcon
                style={{
                  color: "#ffffff",
                  transform: "rotateZ(-45deg) translate(7%, -66%)",
                  fontSize: "2.3rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              />
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default ChatSender;
