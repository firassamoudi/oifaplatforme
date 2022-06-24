import "./style.scss";

import React from "react";

import EmptyView from "../../../../../../common/EmptyView";
import ChallengesCard from "../ChallengesCard/ChallengesCard";

const ChallengesList = (props) => {
  if (!props.list.length) {
    return (
      <div className="ChallengesList--empty">
        <EmptyView label={props.emptyLabel} />
      </div>
    );
  }
  return (
    <div className="ChallengesList">
      {props.list.map((item, index) => {
        return (
          <div className="ChallengesList__item" key={index}>
            <ChallengesCard
              title={item.title}
              _id={item._id}
              accepted={item.accepted}
              timeline={item.timeline}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChallengesList;
