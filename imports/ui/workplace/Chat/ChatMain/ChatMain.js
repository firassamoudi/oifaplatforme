import "./style.scss";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import FilesCollection from "/imports/api/File";
import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";
import TeamCollection from "/imports/api/Team";
import File from "/imports/ui/common/File";

import LocalFile from "./LocalFile";
import MessageCard from "./MessageCard";

const ChatMain = ({ teamId, workplaceId, ownerId, team, messages }) => {
  // ...
  const [isLoading, setIsLoading] = useState(false);
  const [scrollIns, setScrollIns] = useState(null);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  // ...
  const onSetContent = (e) => {
    const content = e.target.value;
    setContent(content);
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
  const sendedFiles = [];
  const onAfterUploadFiles = ({ files, content, ownerId }) => {
    if (files.length === sendedFiles.length) {
      Meteor.call(
        "workplace.team.message.insert",
        {
          workplaceId,
          teamId,
          data: { files: [...sendedFiles], content, ownerId },
        },
        () => {
          setIsLoading(false);
          setContent("");
          setFiles([]);
        }
      );
    }
  };
  const addNewMessage = () => {
    const msg = content.trim();
    if (!msg && !files.length) return;
    setIsLoading(true);
    if (!files.length) {
      onAfterUploadFiles({ content: msg, files, ownerId });
    } else {
      files.forEach((file) => {
        FilesCollection.insert({
          file,
          streams: "dynamic",
          chunkSize: "dynamic",
          onStart() {},
          onUploaded(error, fileObj) {
            const id = fileObj._id;
            sendedFiles.push(id);
            onAfterUploadFiles({ content: msg, files, ownerId });
          },
        });
      });
    }
  };
  // - Keep scolling to bottom
  useEffect(() => {
    if (scrollIns) {
      scrollIns.scrollToBottom();
    }
  }, [messages]);
  // ...
  return (
    <Box className="WorkplaceChatMain">
      <Box component="ul" className="WorkplaceChatMain__history">
        <ScrollArea
          momentum
          ref={(ref) => setScrollIns(ref)}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <Box component="ul" className="WorkplaceChatMain__history__inner">
            {messages.map((message) => {
              return (
                <Box key={message._id} component="li">
                  <MessageCard data={message} />
                </Box>
              );
            })}
          </Box>
        </ScrollArea>
      </Box>
      <Box className="WorkplaceChatMain__input">
        {!!files.length && (
          <Box className="WorkplaceChatMain__input__files">
            {files.map((file, index) => (
              <Box
                className="WorkplaceChatMain__input__files__file"
                key={index}
              >
                <LocalFile data={file} onDelete={() => onDeleteFile(index)} />
              </Box>
            ))}
          </Box>
        )}

        <InputBase
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
    </Box>
  );
};

export default withTracker(({ teamId, workplaceId }) => {
  const user = Meteor.user();
  const seeker = SeekerCollection.findOne({ _id: user?.seekerId });
  const solver = SolverCollection.findOne({ _id: user?.solverId });
  const ownerId = seeker?._id ?? solver?._id;
  // ...
  const team = TeamCollection.findOne({ _id: teamId });
  const messages = team?.messages ?? [];
  // ...
  return { teamId, workplaceId, ownerId, team, messages };
})(ChatMain);
