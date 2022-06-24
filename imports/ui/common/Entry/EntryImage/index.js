import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import FilesCollection from "/imports/api/File";

const EntryImage = ({ name, value, src, onImgChange, Component }) => {
  // - Upload Local img
  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // - Delete Old Img
    if (value) {
      FilesCollection.remove({ _id: value });
    }
    // - Upload Img
    FilesCollection.insert({
      file,
      streams: "dynamic",
      chunkSize: "dynamic",
      onStart() {},
      onUploaded(error, fileObj) {
        onImgChange({ [name]: fileObj._id });
      },
    });
  };
  // ...
  // ...
  return (
    <Box className="Entry EntryImage">
      <input
        className="EntryImage__input"
        type="file"
        onChange={onChangeHandler}
      />
      {!!src && (
        <Box className="EntryImage__preview">
          <Box component="img" src={src} alt="" />
        </Box>
      )}
      <div className="EntryImage__inner" style={{ opacity: src ? 0 : 1 }}>
        <Component />
      </div>
    </Box>
  );
};

export default withTracker(({ name, value, onImgChange, Component }) => {
  let src = null;
  const handler = Meteor.subscribe("files.all", {
    imgId: value,
  });
  if (!handler.ready()) {
    return { name, src, onImgChange, Component };
  }
  const srcRaw = FilesCollection.findOne(value);
  if (srcRaw) {
    src = srcRaw.link();
  }

  // ...
  return {
    name,
    value,
    src,
    onImgChange,
    Component,
  };
})(EntryImage);
