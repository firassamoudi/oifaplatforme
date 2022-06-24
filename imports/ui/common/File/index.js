import "./style.scss";

import Box from "@material-ui/core/Box";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import FilesCollection from "/imports/api/File";

const FileComponent = ({ fileId, fileRaw, fileSrc, deletable, onDelete }) => {
  const name = fileRaw?._fileRef.name ?? "";
  let type = "";
  if (fileRaw?.isImage) {
    type = "isImage";
  } else if (fileRaw?.isVideo) {
    type = "isVideo";
  } else if (fileRaw?.isPDF) {
    type = "isPDF";
  } else if (fileRaw?.isText) {
    type = "isText";
  } else if (fileRaw?.extension?.includes("ppt")) {
    type = "isPPT";
  } else if (fileRaw?.extension?.includes("doc")) {
    type = "isWORD";
  } else if (fileRaw?.extension?.includes("xl")) {
    type = "isXLX";
  } else {
    type = "isOther";
  }
  // ...
  const onDownloadFile = () => {
    window.open(fileSrc);
  };
  // ...
  return (
    <Box className="FileComponent">
      <Box className={`FileComponent__type ${type}`} onClick={onDownloadFile} />
      <Box
        className="FileComponent__name"
        title={name}
        onClick={onDownloadFile}
      >
        {name}
      </Box>
      {deletable && (
        <Box className="FileComponent__delete" onClick={() => onDelete(fileId)}>
          <HighlightOffIcon
            style={{
              width: "2rem",
              height: "2rem",
              fontSize: "2rem",
              color: "#03256c",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default withTracker(({ fileId, ...props }) => {
  Meteor.subscribe("files.all", {
    imgId: fileId,
  });
  // ...
  const fileRaw = FilesCollection.findOne(fileId);
  const fileSrc = fileRaw?.link();
  // ...
  return {
    fileId,
    fileRaw,
    fileSrc,
    ...props,
  };
})(FileComponent);
