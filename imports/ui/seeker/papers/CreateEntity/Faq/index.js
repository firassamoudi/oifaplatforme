import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Typography from "../../../../common/Typography";
import FaqModal from "../../../components/FaqModal";
import ProgramFaqCard from "../../../components/ProgramFaqCard";
import store from "../../../store";

const ProgramFaq = ({ isCFA, faqModal, data = {}, onInputChange }) => {
  const type = isCFA ? "CFA" : "program";
  // ...
  const onAddFaq = ({ faqItem }) => {
    const faq = [...data.faq, faqItem];
    if (faq.length > 13) return; // max questions
    onInputChange({ faq });
  };
  const onEditFaq = ({ id, faqItem }) => {
    const faq = data.faq.map((item, index) => {
      if (id === index) return faqItem;
      return item;
    });
    if (faq.length > 13) return; // max questions
    onInputChange({ faq });
  };
  const onDeleteFaq = ({ id }) => {
    const faq = data.faq.filter((item, index) => {
      return id !== index;
    });
    onInputChange({ faq });
  };
  // ...
  return (
    <Box className="ProgramFaq">
      <Typography
        face="Book"
        size="1.6rem"
        height="2.2rem"
        color="#9ca3af"
        style={{ maxWidth: "70%", margin: "0 0 2rem 0" }}
      >
        {`The FAQ are the questions & answers people need the most about your
        ${type}, feel free to add the most relevant faq in order to help people
        have all information they need.`}
      </Typography>

      {data.faq.map((item, index) => (
        <ProgramFaqCard
          key={index}
          index={index}
          data={item}
          onDeleteFaq={onDeleteFaq}
        />
      ))}

      <FaqModal
        open={faqModal.open}
        onAddFaq={onAddFaq}
        onEditFaq={onEditFaq}
        faqData={data.faq}
        closeModal={() => {
          store.set("faq", { ...faqModal, open: false, id: null });
        }}
      />
    </Box>
  );
};

export default withTracker(({ isCFA, data, onInputChange }) => {
  const faqModal = store.get("faq");
  // ...
  return { isCFA, data, onInputChange, faqModal };
})(ProgramFaq);
