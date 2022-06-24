import "./style.scss";

import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import FilesCollection from "/imports/api/File";

const FileBill = ({
  fileId,
  fileRaw,
  fileSrc,
  startDate,
  endDate,
  deletable,
  onDelete,
}) => {
  const name = fileRaw?._fileRef.name ?? "";
  // ...
  const onDownloadFile = () => {
    window.open(fileSrc);
  };
  // ...
  return (
    <Box className="FileBill">
      <Box className="FileBill__name" title={name} onClick={onDownloadFile}>
        {moment(startDate).format("MMM Do, YYYY")}
        {" - "}
        {moment(endDate).format("MMM Do, YYYY")}
      </Box>
      <Box className="FileBill__actions">
        <Box className="FileBill__action" onClick={onDownloadFile}>
          <GetAppIcon
            style={{
              color: "#f9bf58",
              width: "2.1rem",
              height: "2.1rem",
              cursor: "pointer",
            }}
          />
        </Box>
        {deletable && (
          <Box className="FileBill__action" onClick={() => onDelete(fileId)}>
            <HighlightOffIcon
              style={{
                width: "2.1rem",
                height: "2.1rem",
                color: "#03256c",
              }}
            />
          </Box>
        )}
      </Box>
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
})(FileBill);
