import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import RoomCollection from "/imports/api/Room";

import Avatar from "../../../common/Avatar";
import EmptyView from "../../../common/EmptyView";
import Typography from "../../../common/Typography";
import MessageCard from "../MessageCard";
import LocalFile from "./LocalFile";

const MessagesMain = ({
  roomId,
  data,
  onAddNewMessage,
  handler,
  isLoading,
}) => {
  const room = RoomCollection.findOne(roomId);
  const theOther = room?.theOther?.();
  const avatar = theOther?.getAvatar();
  const orgName = theOther?.getOrgName();
  const theOtherImgId = theOther?.imgId;
  // ...
  const [scrollIns, setScrollIns] = useState(null);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  // ...
  const onSetContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };
  // - Update room
  const onUpdateRoom = () => {
    handler({ roomId });
  };
  // ...
  const onAddFiles = (e) => {
    const files = Array.from(e.target.files);
    setFiles((state) => [...state, ...files]);
    // - Clear input
    e.target.value = "";
  };
  const onDeleteFile = (id) => {
    const fls = [...files].filter((file, index) => index !== id);
    setFiles(fls);
  };
  // ...
  const addNewMessage = () => {
    const msg = content.trim();
    if (!msg && !files.length) return;
    onAddNewMessage({ content: msg, files });
    // ...
    setContent("");
    setFiles([]);
  };
  // - Keep scolling to bottom
  useEffect(() => {
    if (scrollIns) {
      scrollIns.scrollToBottom();
    }
  }, [data]);
  // ...
  return (
    <Box component="main" className="Messages__main">
      <Box className="Messages__main__head">
        <Box display="flex" alignItems="center">
          <Box width="3.3rem" height="3.3rem">
            <Avatar small label={avatar ?? ""} imgId={theOtherImgId} />
          </Box>
          <Typography
            face="Medium"
            size="1.4rem"
            color="#282d58"
            m="0 0 0 .7rem"
          >
            {orgName ?? ""}
          </Typography>
        </Box>
      </Box>

      {!roomId && (
        <Box
          className="Messages__main__noroom"
          style={{ backgroundColor: "#F2F4F6" }}
        >
          <Box className="Messages__main__noroom__inner">
            <EmptyView label="" />
          </Box>
        </Box>
      )}

      {!!roomId && (
        <>
          <Box component="ul" className="Messages__main__history">
            <ScrollArea
              momentum
              ref={(ref) => setScrollIns(ref)}
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <Box component="ul" className="Messages__main__history__inner">
                {data.map((message) => {
                  return (
                    <Box key={message._id} component="li">
                      <MessageCard data={message} />
                    </Box>
                  );
                })}
              </Box>
            </ScrollArea>
          </Box>
          <Box className="Messages__main__input">
            {!!files.length && (
              <Box className="Messages__main__input__files">
                {files.map((file, index) => (
                  <Box
                    className="Messages__main__input__files__file"
                    key={index}
                  >
                    <LocalFile
                      data={file}
                      onDelete={() => onDeleteFile(index)}
                    />
                  </Box>
                ))}
              </Box>
            )}

            <InputBase
              onClick={onUpdateRoom}
              placeholder="Enter your message..."
              fullWidth
              value={content}
              onChange={onSetContent}
              multiline
              rows="3"
              startAdornment={
                <Box className="__SVG __FILE">
                  <input type="file" onChange={onAddFiles} multiple />
                  <AttachFileIcon />
                </Box>
              }
              endAdornment={
                <Box
                  className={cx("__SVG __BTN __loading", {
                    __loading: isLoading,
                  })}
                  onClick={addNewMessage}
                >
                  {isLoading && (
                    <CircularProgress
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                  {!isLoading && <SendIcon />}
                </Box>
              }
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MessagesMain;
