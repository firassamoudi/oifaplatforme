/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import EvaluatorCollection from "/imports/api/Evaluator";
import SeekerCollection from "/imports/api/Seeker";

import Button from "../../../../common/Button";
import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import ManagePeopleCard from "../../../components/ManagePeopleCard";
import MemberModal from "../../../components/MemberModal";

const cols = [
  {
    label: "NAME",
    className: "__col __col--name",
  },
  {
    label: "Authorization",
    className: "__col __col--authorization",
  },
  {
    label: "Status",
    className: "__col __col--status",
  },
];

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const ManagePeople = ({ members, evaluators, seeker }) => {
  const [isLoading, setIsLoading] = useState(false);
  // ...
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    roleError: "",
    email: "",
    emailError: "",
  });
  const [modalMember, setModalMember] = useState(false);
  // ...
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // ...
  const onClearModal = () => {
    setEdit(false);
    setModalMember(false);
    setIsLoading(false);
    setData({});
  };
  // Seeker Member
  const onAddMember = () => {
    const member = { ...data };
    if (!member.role || !member.email || !isValidEmail(member.email)) {
      if (!member.role) onInputChange({ roleError: "Select role" });
      if (!member.email) onInputChange({ emailError: "Email is required" });
      if (!isValidEmail(member.email)) {
        onInputChange({ emailError: "Email error" });
      }
      return setIsLoading(false);
    }
    // ...
    Meteor.call("user.verify", { email: member.email }, (err, res) => {
      if (err) return;
      // ...
      if (res.user) {
        onInputChange({ emailError: "Email has been used" });
      } else {
        Meteor.call("user.seeker.member.add", { member }, (err) => {
          if (err) return;
          onClearModal();
        });
      }
    });
  };
  const onEditMember = () => {
    const member = { ...data };
    Meteor.call("user.seeker.member.edit", { member }, (err) => {
      if (err) return;
      onClearModal();
    });
  };
  // ...
  const onInviteMember = ({ member }) => {
    Meteor.call("user.member.invite", { member }, (err) => {
      if (err) return 0;
    });
  };
  // ...
  const onToggleMember = ({ memberId, toggle }) => {
    Meteor.call("user.member.toggle", { memberId, toggle }, (err) => {
      if (err) return 0;
    });
  };
  // Seeker Evaluator
  const onAddEvaluator = () => {
    const member = { ...data };
    if (!member.role || !member.email || !isValidEmail(member.email)) {
      if (!member.role) onInputChange({ roleError: "Select role" });
      if (!member.email) onInputChange({ emailError: "Email is required" });
      if (!isValidEmail(member.email)) {
        onInputChange({ emailError: "Email error" });
      }
      return 0;
    }
    // ...
    Meteor.call("user.seeker.evaluator.add", { member }, (err) => {
      if (err) return;
      onClearModal();
    });
  };
  // ...
  const onEditEvaluator = () => {
    onClearModal();
  };
  // - Manage Evaluators
  const evalMembers = evaluators.map((e) => e.owner());
  // ...
  return (
    <Box className="ManagePeople">
      <Box className="ManagePeople__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Manage Team
        </Typography>
        <Button
          onClick={() => {
            setEdit(false);
            setModalMember(true);
          }}
        >
          Invite member
        </Button>
      </Box>
      <Box className="ManagePeople__table">
        {!![...members, ...evalMembers].length && (
          <Box className="ManagePeople__table__cols">
            {cols.map((col, index) => (
              <Box key={index} component="span" className={col.className}>
                {col.label}
              </Box>
            ))}
          </Box>
        )}

        {![...members, ...evalMembers].length && (
          <Box className="Programs__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="ManagePeople__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Programs__table__body__inner">
              {[...members, ...evalMembers].map((member, index) => {
                return (
                  <ManagePeopleCard
                    key={index}
                    seeker={seeker}
                    data={member}
                    onInviteMember={onInviteMember}
                    onToggleMember={onToggleMember}
                    open={(data) => {
                      const _id = data._id;
                      const firstName = data.profile.firstName;
                      const lastName = data.profile.lastName;
                      const email = data.emails[0].address;
                      const role = data.role;
                      // ...
                      setEdit(true);
                      setModalMember(true);
                      setData({ _id, firstName, lastName, email, role });
                    }}
                  />
                );
              })}
            </Box>
          </ScrollArea>
        </Box>
      </Box>

      <MemberModal
        open={modalMember}
        data={data}
        isEdit={edit}
        onInputChange={onInputChange}
        // ...
        onAddMember={onAddMember}
        onEditMember={onEditMember}
        // ...
        onAddEvaluator={onAddEvaluator}
        onEditEvaluator={onEditEvaluator}
        // ...
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        closeModal={() => {
          onClearModal();
        }}
      />
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  if (!user) {
    return {
      user,
      userId,
      seeker: {},
      members: [],
      evaluators: [],
    };
  }
  // ...
  const seekerId = user.seekerId;
  const seeker = SeekerCollection.findOne(seekerId);
  const members = Meteor.users.find({ seekerId }).fetch();
  const evaluators = EvaluatorCollection.find({
    seekersId: { $eq: seekerId },
  }).fetch();
  // ...
  return {
    user,
    userId,
    seeker,
    members,
    evaluators,
  };
})(ManagePeople);
