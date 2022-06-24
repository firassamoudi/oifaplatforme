/* eslint-disable sonarjs/no-duplicate-string */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import FilesCollection from "/imports/api/File";
import SolverCollection from "/imports/api/Solver";

import Button from "../../../common/Button";
import { EntryText } from "../../../common/Entry";
import File from "../../../common/File";
import Typography from "../../../common/Typography";

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

const AccountSolver = ({ user, solver }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ...
  const solverType = solver?.type ?? "";
  const isStartup = solverType.toLowerCase() === "startup";
  // ...
  const [form, setForm] = useState({
    trackRecordNbClient: "",
    trackRecordClientsPartners: "",
    trackRecordCommunitySize: "",
    trackRecordRevenue: "",
    pitchDeck: "",
    demoLink: "",
    // ...
    portfolioLink: "",
    trackRecord: "",
    trackRecordFiles: [],
  });
  // ...
  const onPostData = () => {
    const data = { ...form };
    setIsLoading(true);
    // ...
    Meteor.call("solver.update", { data }, (err) => {
      if (err) return;
      // ...
      setIsLoading(false);
      setIsSuccess(true);
    });
  };
  // ...
  onUploadFiles = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = "";
    // ...
    setIsLoading(true);
    // ...
    files.forEach((file) => {
      FilesCollection.insert({
        file,
        streams: "dynamic",
        chunkSize: "dynamic",
        onStart() {},
        onUploaded(error, fileObj) {
          const id = fileObj._id;
          // ...
          const trackRecordFiles = [...form.trackRecordFiles, id];
          // ...
          Meteor.call("solver.update", { data: { trackRecordFiles } }, () => {
            setIsLoading(false);
            setIsSuccess(true);
          });
        },
      });
    });
  };

  onDeleteFile = (id) => {
    setIsLoading(true);
    // ...
    FilesCollection.remove(id);
    // ...
    const trackRecordFiles = [...form.trackRecordFiles.filter((i) => i !== id)];
    // ...
    Meteor.call("solver.update", { data: { trackRecordFiles } }, () => {
      setIsLoading(false);
      setIsSuccess(true);
    });
  };
  // ...
  const onInputChange = (inp) => {
    setIsSuccess(false);
    setForm((state) => ({ ...state, ...inp }));
  };
  // ...
  useEffect(() => {
    if (solver) {
      setForm({ ...solver });
    }
  }, [user, solver]);
  // ...
  return (
    <Box className="Settings__AccountSolver">
      {isStartup && (
        <>
          <Title title="Track records" />
          <EntryText
            onInputChange={onInputChange}
            value={form.trackRecordNbClient}
            name="trackRecordNbClient"
            label="Number of clients"
            placeholder="Number of clients"
          />
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={form.trackRecordClientsPartners}
            name="trackRecordClientsPartners"
            label="Clients & partners"
            placeholder="Clients & partners"
            rows={4}
          />
          <EntryText
            onInputChange={onInputChange}
            value={form.trackRecordCommunitySize}
            name="trackRecordCommunitySize"
            label="Size of the community"
            placeholder="How many users?"
          />
          <EntryText
            onInputChange={onInputChange}
            value={form.trackRecordRevenue}
            name="trackRecordRevenue"
            label="Revenue"
            placeholder="Annual revenue in euros"
          />
          <Title title="Ressources" mt="2rem" />
          <EntryText
            onInputChange={onInputChange}
            value={form.pitchDeck}
            name="pitchDeck"
            label="Pitch Deck Link"
            placeholder="Pitch Deck Link"
          />
          <EntryText
            onInputChange={onInputChange}
            value={form.demoLink}
            name="demoLink"
            label="Demo Link"
            placeholder="Demo Link"
          />
        </>
      )}
      {!isStartup && (
        <>
          <Title title="Track records" />
          <EntryText
            onInputChange={onInputChange}
            value={form.portfolioLink}
            name="portfolioLink"
            label="Portfolio Link"
            placeholder="Your portfolio link"
          />
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={form.trackRecord}
            name="trackRecord"
            label="Track record"
            placeholder="Tell us more about track records"
            rows={6}
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
              <input type="file" onChange={onUploadFiles} />
            </Box>
          </Box>

          {form?.trackRecordFiles?.map((id) => (
            <File key={id} fileId={id} deletable onDelete={onDeleteFile} />
          ))}
        </>
      )}

      <Box className="Settings__footer">
        <Box className="Settings__footer__inner">
          {!!isSuccess && (
            <Typography
              face="Medium"
              size="1.4rem"
              height="1.6rem"
              style={{
                color: "#ffc857",
                minHeight: "1.6rem",
              }}
            >
              You account has been changed successfully
            </Typography>
          )}
          <Button
            isLoading={isLoading}
            disabled={false}
            onClick={onPostData}
            style={{ height: "5rem" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("_roles");
  if (!handle.ready()) return { user, userId };
  // ...
  const solver = SolverCollection.findOne({ _id: user?.solverId });
  // ...
  return {
    user,
    solver,
  };
})(AccountSolver);
