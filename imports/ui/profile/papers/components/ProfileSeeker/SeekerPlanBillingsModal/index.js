import "./style.scss";

import Box from "@material-ui/core/Box";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import FilesCollection from "/imports/api/File";
import SeekerCollection from "/imports/api/Seeker";
import SeekerPlanCollection from "/imports/api/SeekerPlan";

import Button from "../../../../../common/Button";
import { EntryDate } from "../../../../../common/Entry";
import Modal from "../../../../../common/Modal";
import Typography from "../../../../../common/Typography";

const SeekerPlanModal = ({
  open,
  data,
  onPlanChange,
  onCloseModel,
  isLoading,
}) => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    startDate: null,
    endDate: null,
  });
  // ...
  const onInputChange = (inp) => {
    setForm((state) => ({ ...state, ...inp }));
  };
  const onInputFileChange = (e) => {
    const file = e.target.files[0];
    e.target.vallue = "";
    // ...
    setFile(file);
  };
  // ...
  const onSubmitPlan = () => {
    // - Upload Bill
    FilesCollection.insert({
      file,
      streams: "dynamic",
      chunkSize: "dynamic",
      onStart() {},
      onUploaded(error, fileObj) {
        const id = fileObj._id;
        const billings = [
          ...data.billings,
          {
            startDate: form.startDate,
            endDate: form.endDate,
            fileId: id,
          },
        ];
        // ...
        onPlanChange({ billings, _id: data._id });
      },
    });
  };
  // ...
  return (
    <Modal
      className="SeekerPlanModal"
      title="Edit Seeker Plan"
      open={open}
      closeModal={onCloseModel}
    >
      <Box className="SeekerPlanModal__body">
        <EntryDate
          onInputChange={onInputChange}
          value={form.startDate}
          name="startDate"
          label="Billing start date *"
          placeholder="Start date"
        />
        <EntryDate
          onInputChange={onInputChange}
          value={form.endDate}
          name="endDate"
          label="Billing end date *"
          placeholder="End date"
        />
        <Box className="SeekerPlanModal__file-inp Entry">
          <Box className="__selector">
            Select a file
            <AttachmentIcon
              style={{ width: "2rem", height: "2rem", color: "#434c5e" }}
            />
            <input type="file" onChange={onInputFileChange} />
          </Box>
          <Box className="__name" title={file?.name ?? ""}>
            {file?.name ?? "No file selected"}
          </Box>
        </Box>
      </Box>
      <Box className="SeekerPlanModal__footer">
        <Button
          small
          ghost
          onClick={onCloseModel}
          style={{ margin: "0 1rem 0 0" }}
        >
          Cancel
        </Button>
        <Button
          small
          onClick={onSubmitPlan}
          isLoading={isLoading}
          disabled={!form.startDate || !form.endDate || !file}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default withTracker(({ seekerId, ...props }) => {
  const seeker = SeekerCollection.findOne({ _id: seekerId });
  const data = SeekerPlanCollection.findOne({ _id: seeker?.planId });
  // ...
  return {
    data,
    ...props,
  };
})(SeekerPlanModal);
