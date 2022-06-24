import "./style.scss";

import Box from "@material-ui/core/Box";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React, { useState } from "react";

import Button from "../../../../../common/Button";
import { EntryText } from "../../../../../common/Entry";
import Typography from "../../../../../common/Typography";

const Title = ({ title, mt }) => {
  return (
    <>
      <Box style={{ clear: "both" }} />
      <Typography
        face="Medium"
        size="1.8rem"
        height="2rem"
        color="#1E2E41"
        style={{
          padding: "1.5rem 0",
          borderBottom: "1px solid #d4d9e2",
          margin: "0 0 3rem 0",
          marginTop: mt,
          clear: "both",
        }}
      >
        {title}
      </Typography>
    </>
  );
};

const SolverTrackRecords = ({
  solverType,
  data,
  onInputChange,
  onUploadFiles,
  onDeleteFile,
}) => {
  const [files, setFiles] = useState([]);
  const isStartup = solverType.toLowerCase() === "startup";
  // - Add File
  const onAddFile = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
    onUploadFiles({ files });
  };
  const onDeleteFileHandler = (id) => {
    const _files = files.filter((f, i) => {
      return i !== id;
    });
    // ...
    setFiles(_files);
    onDeleteFile(id);
  };
  // ...
  return (
    <Box className="SolverTrackRecords">
      <Box className="__form">
        {isStartup && (
          <>
            <Title title="Track records" />
            <EntryText
              onInputChange={onInputChange}
              value={data.trackRecordNbClient}
              name="trackRecordNbClient"
              label="Number of clients *"
              placeholder="Number of clients"
              error={
                data.trackRecordNbClientDirty && data.trackRecordNbClientError
              }
            />
            <EntryText
              multiline
              onInputChange={onInputChange}
              value={data.trackRecordClientsPartners}
              name="trackRecordClientsPartners"
              label="Clients & partners *"
              placeholder="Clients & partners"
              rows={4}
              error={
                data.trackRecordClientsPartnersDirty &&
                data.trackRecordClientsPartnersError
              }
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.trackRecordCommunitySize}
              name="trackRecordCommunitySize"
              label="Size of the community *"
              placeholder="How many users?"
              error={
                data.trackRecordCommunitySizeDirty &&
                data.trackRecordCommunitySizeError
              }
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.trackRecordRevenue}
              name="trackRecordRevenue"
              label="Revenue *"
              placeholder="Annual revenue in euros"
              error={
                data.trackRecordRevenueDirty && data.trackRecordRevenueError
              }
            />
            <Title title="Ressources" mt="2rem" />
            <EntryText
              onInputChange={onInputChange}
              value={data.pitchDeck}
              name="pitchDeck"
              label="Pitch Deck Link *"
              placeholder="Pitch Deck Link"
              error={data.pitchDeckDirty && data.pitchDeckError}
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.demoLink}
              name="demoLink"
              label="Demo Link *"
              placeholder="Demo Link"
              error={data.demoLinkDirty && data.demoLinkError}
            />
          </>
        )}
        {!isStartup && (
          <>
            <Title title="Track records" />
            <EntryText
              onInputChange={onInputChange}
              value={data.portfolioLink}
              name="portfolioLink"
              label="Portfolio Link *"
              placeholder="Your portfolio link"
              error={data.portfolioLinkDirty && data.portfolioLinkError}
            />
            <EntryText
              multiline
              onInputChange={onInputChange}
              value={data.trackRecord}
              name="trackRecord"
              label="Track record *"
              placeholder="Tell us more about track records"
              rows={6}
              error={data.trackRecordDirty && data.trackRecordError}
            />
            <Box className="SolverTrackRecords__custom-title">
              <Title title="Ressources" mt="2rem" />
              <Box className="SolverTrackRecords__custom-title__file">
                <Button
                  onClick={null}
                  style={{ height: "4rem", padding: "0 2.8rem" }}
                >
                  Add
                </Button>
                <input type="file" onChange={onAddFile} multiple />
              </Box>
            </Box>

            {files.map((file, index) => (
              <Box className="SolverTrackRecords__file" key={index}>
                {/* <Box className="__file__icon">Icon</Box> */}
                <Box className="__file__name">{file.name}</Box>
                <Box
                  className="__file__close"
                  onClick={() => onDeleteFileHandler(index)}
                >
                  <HighlightOffIcon
                    style={{ color: "#B3B9CE", width: "2rem", height: "2rem" }}
                  />
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
export default SolverTrackRecords;
