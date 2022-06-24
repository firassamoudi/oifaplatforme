import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import FilesCollection from "/imports/api/File";

const Image = ({ src }) => {
  return <Box component="img" src={src} alt="" />;
};

export default withTracker(({ data }) => {
  let src = null;
  const handler = Meteor.subscribe("files.all", {
    imgId: data,
  });
  if (!handler.ready()) {
    return { src };
  }
  const srcRaw = FilesCollection.findOne({ _id: data });
  if (srcRaw) {
    src = srcRaw.link();
  }
  // ...
  return {
    src,
  };
})(Image);
