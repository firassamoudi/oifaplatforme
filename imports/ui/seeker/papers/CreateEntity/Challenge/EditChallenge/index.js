import "../style.scss";

import Box from "@material-ui/core/Box";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import { sectorsOptions } from "/imports/libs/inputs";

import {
  EntryImage,
  EntrySelect,
  EntryText,
} from "../../../../../common/Entry";
import Typography from "../../../../../common/Typography";
import store from "../../../../store";

const UploadPreviewPlaceholder = () => (
  <Box className="EditChallenge__preview__placeholder">
    <Typography
      face="Medium"
      size="1.5rem"
      height="1.5rem"
      style={{ margin: "0 0 1.4rem 0" }}
    >
      <span style={{ color: "#f9bf58", margin: "0 0.6rem 0 0" }}>Upload</span>
      or drop an image right here
    </Typography>
    <Typography face="Book" size="1.4rem" height="1.4rem" color="#838aab">
      It works for JPG, PNG formats —max size 5MB
    </Typography>
  </Box>
);

const EditChallenge = ({
  challengeModal,
  data,
  sectors,
  onUpdateChallenge,
}) => {
  const id = challengeModal.id;
  const challenge = data[id];
  // ...
  const onInputChange = (inp) => {
    onUpdateChallenge({
      id,
      challenge: { ...challenge, ...inp },
    });
  };
  // ...
  const onGoBack = () => {
    store.set("challenge", { open: false, id: null });
  };
  // ...
  return (
    <Box className="EditChallenge">
      <Box className="EditChallenge__back" onClick={onGoBack}>
        <Box className="EditChallenge__back__inner">
          <KeyboardArrowLeftIcon />
          <Typography face="Medium" size="1.5rem" height="2rem" color="#fff">
            Back to all challenges list
          </Typography>
        </Box>
      </Box>
      <Box className="EditChallenge__preview">
        <Box
          className={cx("EditChallenge__preview__inner", {
            __hide: !!challenge.imgId,
          })}
        >
          <EntryImage
            name="imgId"
            value={challenge.imgId}
            onImgChange={onInputChange}
            Component={() => <UploadPreviewPlaceholder />}
          />
        </Box>
      </Box>
      <Box className="EditChallenge__form">
        <EntryText
          label="Challenge title *"
          name="title"
          placeholder="Your challenge title"
          value={challenge.title}
          onInputChange={onInputChange}
        />
        <EntrySelect
          label="Challenge sector *"
          name="sector"
          placeholder="Your challenge sectors"
          value={challenge.sector}
          options={[...sectors]}
          onInputChange={onInputChange}
        />
        <EntryText
          name="context"
          label="Challenge context *"
          placeholder="Why are you launching this challenge? What are you trying to achieve for your organisation?"
          multiline
          rows={7}
          value={challenge.context}
          onInputChange={onInputChange}
        />
        <EntryText
          name="contextVideo"
          label="Challenge context video *"
          placeholder="Ex : youtube.com/watch?v=jNQXAC9IVRw"
          value={challenge.contextVideo}
          onInputChange={onInputChange}
        />
      </Box>
    </Box>
  );
};

export default withTracker(({ data, onUpdateChallenge }) => {
  const challengeModal = store.get("challenge");
  // ...
  return { challengeModal, data, onUpdateChallenge };
})(EditChallenge);
