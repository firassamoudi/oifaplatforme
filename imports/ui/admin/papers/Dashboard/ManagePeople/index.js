import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import Button from "../../../../common/Button";
import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import AdminMemberCard from "../../../components/AdminMemberCard";
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

const ManagePeople = ({ members }) => {
  const [isLoading, setIsLoading] = useState(false);
  // ...
  const [edit, setEdit] = useState(false);
  // ...
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
  // ...
  const onAddMember = () => {
    const member = { ...data };
    if (!member.email) {
      onInputChange({ emailError: "Invalid email" });
      return setIsLoading(false);
    }
    // ...
    Meteor.call("user.verify", { email: member.email }, (err, res) => {
      if (err) return;
      // ...
      if (res.user) {
        onInputChange({ emailError: "Email has been used" });
      } else {
        Meteor.call("user.admin.member.add", { member }, (err) => {
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
  return (
    <Box className="ManagePeople">
      <Box className="ManagePeople__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Manage members
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
        {!!members.length && (
          <Box className="ManagePeople__table__cols">
            {cols.map((col, index) => (
              <Box key={index} component="span" className={col.className}>
                {col.label}
              </Box>
            ))}
          </Box>
        )}

        {!members.length && (
          <Box className="ManagePeople__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="ManagePeople__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Programs__table__body__inner">
              {members.map((member, index) => {
                return (
                  <AdminMemberCard
                    key={index}
                    data={member}
                    onInviteMember={onInviteMember}
                    open={(data) => {
                      const _id = data._id;
                      const firstName = data.profile.firstName;
                      const lastName = data.profile.lastName;
                      const email = data.emails[0].address;
                      // ....
                      setEdit(true);
                      setModalMember(true);
                      setData({ _id, firstName, lastName, email });
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
        // ...
        onInputChange={onInputChange}
        onAddMember={onAddMember}
        onEditMember={onEditMember}
        // ...
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
  let members = [];
  const handle = Meteor.subscribe("admin-members");
  if (!handle.ready()) {
    return { user, userId, members };
  }

  members = Meteor.users.find({}).fetch();

  // ...
  return {
    user,
    userId,
    members,
  };
})(ManagePeople);
