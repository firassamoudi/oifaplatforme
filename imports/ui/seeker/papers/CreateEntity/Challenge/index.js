import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import ProgramChallengeCard from "../../../components/ProgramChallangeCard";
import store from "../../../store";
import EditChallenge from "./EditChallenge";

const ProgramChallenge = ({ data = {}, onInputChange, challengeModal }) => {
  const sectors = data?.sector.map((sec) => sec.value);
  const challenges = data?.challenges.map((chl) => {
    const isNotIn = [...sectors, ""].indexOf(chl.sector) === -1;
    return { ...chl, selected: isNotIn ? false : chl.selected };
  });
  // - On Check
  const onCheckHandler = ({ id, challenge }) => {
    const isSelected = challenge.selected;
    const chls = challenges.map((ch, index) => ({
      ...ch,
      selected: id === index ? !isSelected : ch.selected,
    }));
    // ...
    onInputChange({ challenges: chls });
  };
  // - On Edit
  const onEditHandler = ({ id }) => {
    store.set("challenge", { open: true, id });
  };
  // ...
  const onUpdateChallenge = ({ id, challenge }) => {
    const chls = challenges.map((ch, index) => {
      if (id === index) return { ...challenge };
      return { ...ch };
    });
    // ...
    onInputChange({ challenges: chls });
  };
  // ...
  // useEffect(() => {
  //   onInputChange({ challenges });
  // }, []);
  // ...
  return (
    <Box className="Program ProgramChallange">
      {!challengeModal.open && (
        <>
          <Typography
            size="1.6rem"
            color="#9ca3af"
            face="Book"
            style={{ width: "80%", margin: "0 0 2.2rem 0" }}
          >
            In order to help you choosing one or many challenges for your
            program, we are suggesting for you few challenges that you can
            choose and modify. You can as well create yours.
          </Typography>
          <Box component="ul" p="0" style={{ listStyle: "none" }}>
            {challenges.map((challenge, index) => {
              const isIn = [...sectors, ""].indexOf(challenge.sector) > -1;
              if (!isIn) return null;
              return (
                <Box key={index} mb="1.4rem">
                  <ProgramChallengeCard
                    id={index}
                    data={challenge}
                    onCheckHandler={onCheckHandler}
                    onEditHandler={onEditHandler}
                  />
                </Box>
              );
            })}
          </Box>
          {!challenges.filter(
            (chl) => [...sectors, ""].indexOf(chl.sector) > -1
          ).length && (
            <Box className="ProgramChallange__empty">
              <EmptyView search />
            </Box>
          )}
        </>
      )}
      {challengeModal.open && (
        <EditChallenge
          data={data.challenges}
          sectors={data.sector}
          onUpdateChallenge={onUpdateChallenge}
        />
      )}
    </Box>
  );
};

export default withTracker(({ data, onInputChange }) => {
  const challengeModal = store.get("challenge");
  // ...
  return { data, onInputChange, challengeModal };
})(ProgramChallenge);
