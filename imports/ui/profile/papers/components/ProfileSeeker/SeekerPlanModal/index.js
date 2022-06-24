import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import SeekerCollection from "/imports/api/Seeker";
import SeekerPlanCollection from "/imports/api/SeekerPlan";

import Button from "../../../../../common/Button";
import { EntryDate, EntrySelect, EntryText } from "../../../../../common/Entry";
import Modal from "../../../../../common/Modal";
import Typography from "../../../../../common/Typography";

const SeekerPlanModal = ({
  open,
  data,
  onPlanChange,
  onCloseModel,
  isLoading,
}) => {
  const [form, setForm] = useState({
    type: "",
    startDate: null,
    endDate: null,
    programsCurrent: 0,
    connexionsCurrent: 0,
  });
  // ...
  const isSuscription = form.type === "SUBSCRIPTION";
  // ...
  const onInputChange = (inp) => {
    setForm((state) => ({ ...state, ...inp }));
  };
  // ...
  const onSubmitPlan = () => {
    onPlanChange({ ...form, _id: data._id });
  };
  // ...
  useEffect(() => {
    if (isLoading) return;
    setForm((state) => ({ ...state, ...data }));
  }, [data]);
  // ...
  const baseValid =
    !form.type ||
    !form.programsCurrent ||
    parseInt(form.programsCurrent, 10) < 0 ||
    !form.connexionsCurrent ||
    parseInt(form.connexionsCurrent, 10) < 0;
  // ...
  const validForm = !isSuscription
    ? baseValid
    : baseValid || !form.startDate || !form.endDate;
  // ...
  return (
    <Modal
      className="SeekerPlanModal"
      title="Edit Seeker Plan"
      open={open}
      closeModal={onCloseModel}
    >
      <Box className="SeekerPlanModal__body">
        <EntrySelect
          label="Plan Type"
          name="type"
          value={form.type}
          placeholder="Select a plan"
          options={[
            { label: "Subscription", value: "SUBSCRIPTION" },
            { label: "Pay as you go", value: "PAYG" },
          ]}
          onInputChange={onInputChange}
        />

        {isSuscription && (
          <>
            <EntryDate
              startDate
              onInputChange={onInputChange}
              value={form.startDate}
              name="startDate"
              label="Start date *"
              placeholder="Start date"
            />
            <EntryDate
              endDate
              onInputChange={onInputChange}
              value={form.endDate}
              name="endDate"
              label="End date *"
              placeholder="End date"
            />
          </>
        )}

        <EntryText
          onInputChange={onInputChange}
          value={form.programsCurrent}
          type="number"
          name="programsCurrent"
          label="Programs number *"
          placeholder="Programs number"
        />
        <EntryText
          onInputChange={onInputChange}
          value={form.connexionsCurrent}
          type="number"
          name="connexionsCurrent"
          label="Conx number *"
          placeholder="Conx number"
        />
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
          disabled={validForm}
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
