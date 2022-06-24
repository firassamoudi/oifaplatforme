import "./style.scss";

import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";

import { EntryDate } from "../../../../common/Entry";
import Typography from "../../../../common/Typography";

const isValidDate = (d) => {
  return new Date(d).toString() !== "Invalid Date";
};

const AddCustomSection = ({ index, handler }) => {
  return (
    <Box className="ProgramTimeLine__custom" onClick={() => handler(index)}>
      <AddIcon
        style={{
          color: "#f9bf58",
          fontSize: "2rem",
          margin: "0 0.4rem 0 0",
        }}
      />
      <span>Add Section</span>
    </Box>
  );
};

const TimelineEntry = ({
  index,
  data,
  lastData,
  onChange,
  onTimelineAdd,
  onTimelineDelete,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  // ...
  const onInputChange = (inp) => {
    const phase = { ...data, ...inp };
    onChange({ phase, index });
  };
  // ...
  const lastDateEnd = new Date(lastData.end);
  const minStart = lastDateEnd || null;
  const minEnd = data.start;
  // ...
  return (
    <>
      <AddCustomSection index={index} handler={onTimelineAdd} />
      <Box className="ProgramTimeLine__section">
        <Box
          className="ProgramTimeLine__section__label"
          onClick={() => setIsEdit(true)}
        >
          {isEdit && (
            <input
              id={`${data.label}`}
              type="text"
              value={data.label}
              onBlur={() => setIsEdit(false)}
              autoFocus
              onChange={(e) => {
                const value = e.target.value;
                onInputChange({ label: value });
              }}
            />
          )}
          {!isEdit && (
            <>
              {data.label}
              <EditIcon
                style={{
                  color: "#03256c",
                  fontSize: "2rem",
                  margin: "0 0 0 1rem",
                }}
              />
            </>
          )}
        </Box>
        <EntryDate
          startDate
          onInputChange={onInputChange}
          name="start"
          value={data.start}
          minDate={
            isValidDate(minStart)
              ? minStart.setDate(minStart.getDate() + 1)
              : new Date("December 17, 1995 00:00:00")
          }
        />
        <EntryDate
          endDate
          onInputChange={onInputChange}
          name="end"
          value={data.end}
          minDate={minEnd}
        />

        {!data.required && (
          <Box
            className="ProgramTimeLine__section__delete"
            onClick={() => onTimelineDelete(index)}
          >
            <CancelIcon
              style={{
                color: "#f9bf58",
                fontSize: "2.6rem",
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

const ProgramTimeLine = ({ isCFA, data, onInputChange }) => {
  const type = isCFA ? "CFA" : "program";
  const timeline = data.timeline;
  // - Manage Timeline
  const onTimelineAdd = (index) => {
    const updatedData = [...timeline];
    updatedData.splice(index, 0, {
      label: "Custom Section",
      start: null,
      end: null,
    });
    onInputChange({ timeline: updatedData });
  };
  const onTimelineDelete = (index) => {
    const updatedData = [...timeline];
    updatedData.splice(index, 1);
    onInputChange({ timeline: updatedData });
  };
  const onTimelineChange = ({ phase, index }) => {
    const updatedData = [...timeline];
    updatedData[index] = phase;
    onInputChange({ timeline: updatedData });
  };
  // ...
  return (
    <Box className="Program ProgramTimeLine">
      <Typography size="1.6rem" color="#9ca3af" face="Medium" m="0 0 5.1rem 0">
        {`This is the different steps we suggest you for your ${type}. 
        You can add other steps if you think it's necessary. 
        Please note that you also have the possibility to edit it before and after publishing your ${type}.`}
      </Typography>
      {timeline.map((phase, index) => {
        return (
          <TimelineEntry
            key={index}
            index={index}
            data={phase}
            lastData={!!index && timeline[index - 1]}
            onChange={onTimelineChange}
            onTimelineAdd={onTimelineAdd}
            onTimelineDelete={onTimelineDelete}
          />
        );
      })}
      <AddCustomSection index={timeline.length} handler={onTimelineAdd} />
    </Box>
  );
};

export default ProgramTimeLine;
