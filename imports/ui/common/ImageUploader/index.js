import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import FilesCollection from "/imports/api/File";

const ImageUploader = ({ name, src, onInputChange, Component }) => {
  // - Upload Local img
  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    // setLocalSrc(img);
    // ...
    if (!file) return;
    // ...
    FilesCollection.insert({
      file,
      streams: "dynamic",
      chunkSize: "dynamic",
      onStart() {},
      onUploaded(error, fileObj) {
        onInputChange({ [name]: fileObj._id });
      },
    });
  };
  // ...
  // ...
  return (
    <Box className="ImageUploader">
      {!src ? (
        <Box className="ImageUploader__entry">
          <input
            className="ImageUploader__entry__input"
            type="file"
            onChange={onChangeHandler}
          />
          <Component className="ImageUploader__entry__Component" />
        </Box>
      ) : (
        <Box
          className="ImageUploader__preview"
          component="img"
          src={src}
          alt=""
        />
      )}
    </Box>
  );
};

export default withTracker(({ name, value, onInputChange, Component }) => {
  let src = null;
  const handler = Meteor.subscribe("files.all", {
    imgId: value,
  });
  if (!handler.ready()) {
    return { name, src, onInputChange, Component };
  }
  const srcRaw = FilesCollection.findOne(value);
  if (srcRaw) {
    src = srcRaw.link();
  }

  // ...
  return {
    name,
    src,
    onInputChange,
    Component,
  };
})(ImageUploader);
