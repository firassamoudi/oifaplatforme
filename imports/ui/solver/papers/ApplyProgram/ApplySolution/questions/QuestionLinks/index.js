import "./style.scss";

import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";

import { EntryText } from "../../../../../../common/Entry";
import Typography from "../../../../../../common/Typography";

const QuestionLinks = ({ data, question, onQuestionResponse }) => {
  const id = question.id;
  const value = data?.[id] ?? [""];
  // ...
  const onAddLink = () => {
    onQuestionResponse({ [id]: [...value, ""] });
  };
  const onDeleteLink = (index) => {
    onQuestionResponse({
      [id]: [...value.filter((l, indx) => indx !== index)],
    });
  };
  const onUpdateLink = ({ inp, index }) => {
    value[index] = inp.link;
    onQuestionResponse({ [id]: value });
  };
  // ...
  return (
    <Box className="QuestionLinks">
      <Typography
        face="Medium"
        size="13px"
        height="2rem"
        style={{ margin: "0 0 2rem 0", color: "#434c5e" }}
      >
        {question.label}
      </Typography>

      {value.map((link, index) => (
        <Box className="QuestionLinks__link" key={index}>
          <EntryText
            onInputChange={(inp) => onUpdateLink({ inp, index })}
            value={link}
            placeholder="Link"
            name="link"
          />
          {!!index && (
            <Box
              className="QuestionLinks__link__remove"
              onClick={() => onDeleteLink(index)}
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
      ))}

      <Box className="QuestionLinks__add" onClick={onAddLink}>
        + Add link
      </Box>
    </Box>
  );
};

export default QuestionLinks;
