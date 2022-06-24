/* eslint-disable simple-import-sort/sort */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import RoomCollection from "/imports/api/Room";
import RoomMessageCollection from "/imports/api/RoomMessage";
import FilesCollection from "/imports/api/File";

import MessagesLayout from "./layout";
import MessagesConversations from "./components/MessagesConversations";
import MessagesMain from "./components/MessagesMain";

import VirtualMessage from "/imports/libs/virtualMessage";

const Messages = ({ currOrgId, roomId, rooms, messages }) => {
  const history = useHistory();
  // - Prep messages
  const [isLoading, setIsLoading] = useState(false);
  const [pMessages, setPMessages] = useState(messages);
  // ...
  const onSelectRoom = ({ data }) => {
    Meteor.call("room.update.lastSeen", { roomId: data._id });
    history.push(`/dashboard/messages/${data._id}`);
  };
  const onUpdateRoom = ({ roomId }) => {
    Meteor.call("room.update.lastSeen", { roomId });
  };
  // Send Message / Files
  const sendedFiles = [];
  // ...
  const onAfterUploadFiles = ({ content, files }) => {
    if (files.length === sendedFiles.length) {
      const vm = new VirtualMessage({
        _id: Date.now(),
        ownerId: currOrgId,
        content,
        files: [],
      });
      // ...
      setPMessages((state) => [...state, vm]);
      // ...
      Meteor.call(
        "message.insert",
        {
          roomId,
          content,
          files: [...sendedFiles],
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  };
  // ...
  const onAddNewMessage = ({ content, files }) => {
    if (!roomId) return;
    setIsLoading(true);
    // - Upload Files
    if (!files.length) {
      onAfterUploadFiles({ content, files });
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
            onAfterUploadFiles({ content, files });
          },
        });
      });
    }
  };
  // - Update Messages
  useEffect(() => {
    setPMessages(messages);
  }, [messages]);
  // ...
  return (
    <MessagesLayout>
      <Box className="Messages">
        {!!rooms.length && (
          <MessagesConversations
            roomId={roomId}
            data={rooms}
            handler={onSelectRoom}
          />
        )}

        <MessagesMain
          isLoading={isLoading}
          roomId={roomId}
          data={pMessages}
          onAddNewMessage={onAddNewMessage}
          handler={onUpdateRoom}
        />
      </Box>
    </MessagesLayout>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  // ...
  const params = useParams();
  const roomId = params.id;
  // ...
  let rooms = [];
  let messages = [];
  // ...
  let currOrgId = null;
  // ...
  const handle = Meteor.subscribe("messages-rooms");
  if (!handle.ready() || !user) {
    return {
      currOrgId,
      roomId,
      rooms,
      messages,
    };
  }
  // ...
  const seekerId = user.seekerId;
  const solverId = user.solverId;
  currOrgId = seekerId || solverId;
  // ...
  rooms = RoomCollection.find({}, { sort: { updatedAt: -1 } }).fetch();
  if (roomId) {
    messages = RoomMessageCollection.find({ roomId }).fetch();
  }
  // ...
  return { currOrgId, roomId, rooms, messages };
})(Messages);
