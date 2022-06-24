import "./style.scss";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";

import Typography from "../../../../../common/Typography";

const Icon = ({ I }) => (
  <I
    style={{
      color: "#000",
      fontSize: "2rem",
    }}
  />
);

const FaqHeader = ({ expanded, index, title }) => {
  const isExpended = expanded === `panel${index}`;
  // ...
  return (
    <AccordionSummary
      expandIcon={isExpended ? <Icon I={RemoveIcon} /> : <Icon I={AddIcon} />}
    >
      <Typography
        size="1.8rem"
        height="2.3rem"
        color="#051438"
        face="Medium"
        style={{
          transition: "all .3s",
        }}
      >
        {title}
      </Typography>
    </AccordionSummary>
  );
};

const FAQ = ({ id, data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (!data.faq) {
    return <Box id={id} className="FAQ" />;
  }
  // ...
  return (
    <Box id={id} className="FAQ">
      <Typography size="2rem" color="#051438" face="Bold" m="0 0 2.4rem 0">
        FAQ
      </Typography>
      {(data.faq || []).map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <FaqHeader index={index} expanded={expanded} title={item.question} />
          <AccordionDetails>
            <Box>
              <Typography
                size="1.8rem"
                color="#828da4"
                face="Book"
                height="24px"
              >
                {item.response}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
