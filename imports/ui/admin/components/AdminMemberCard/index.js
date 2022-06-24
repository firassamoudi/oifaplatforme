import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import Avatar from "../../../common/Avatar";
import Button from "../../../common/Button";
import Menu from "../../../common/Menu";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const AdminMemberCard = ({ data, open, onInviteMember }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onDeleteModalHandler = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setIsLoading(false);
    setOpenModal(false);
  };
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // ...
  const isOwner = Roles.userIsInRole(
    data._id,
    ["ADMIN_ADMIN"],
    Roles.GLOBAL_GROUP
  );
  const isActive = data.accepted;
  const firstName = data.profile.firstName;
  const lastName = data.profile.lastName;
  const label = `${firstName} ${lastName}`;
  // ...
  const onDeleteMember = ({ member }) => {
    Meteor.call("user.member.delete", { memberId: member._id }, (err) => {
      setIsLoading(true);
      setOpenModal(false);
    });
  };
  // ...
  const onDeleteHandler = () => {
    return onDeleteMember({ member: data });
  };
  // ...
  return (
    <>
      <Box className="AdminMemberCard">
        <Box className="AdminMemberCard__username">
          <Avatar label={label} />
          <Typography
            size="1.4rem"
            face="Medium"
            fontWeight="900"
            m="0 0 0 1.6rem"
          >
            {`${firstName} ${lastName}`}
          </Typography>
        </Box>
        <Box className="AdminMemberCard__auth">
          <Typography size="1.4rem" color="#23252c" face="Book">
            {isOwner ? "Owner" : "Member"}
          </Typography>
        </Box>
        <Box className="AdminMemberCard__status">
          <Typography size="1.4rem" color="#23252c" face="Book">
            {isOwner ? "Active" : isActive ? "Active" : "Inactive"}
          </Typography>
        </Box>
        <Box className="AdminMemberCard__actions">
          {!isOwner && (
            <>
              <div data-tip data-for="Edit" onClick={() => open({ ...data })}>
                <img src="/assets/view member.svg" alt="edit" />
              </div>
              <ReactTooltip id="Edit" {...tooltipStyles}>
                <Typography
                  name="span"
                  size="1.4rem"
                  color="#CDCFD4"
                  face="Book"
                >
                  Edit member
                </Typography>
              </ReactTooltip>
              <div
                data-tip
                data-for="Resend"
                onClick={() => onInviteMember({ member: data })}
              >
                <img src="/assets/Resend.svg" alt="Resend" />
              </div>
              <ReactTooltip id="Resend" {...tooltipStyles}>
                <Typography
                  name="span"
                  size="1.4rem"
                  color="#CDCFD4"
                  face="Book"
                >
                  Resend
                </Typography>
              </ReactTooltip>
              <div data-tip data-for="del" onClick={onDeleteModalHandler}>
                <img src="/assets/Delete member.svg" alt="delete" />
              </div>
              <ReactTooltip id="del" {...tooltipStyles}>
                <Typography
                  name="span"
                  size="1.4rem"
                  color="#CDCFD4"
                  face="Book"
                >
                  Delete member
                </Typography>
              </ReactTooltip>
            </>
            // <Menu
            //   selectOpen={selectOpen}
            //   setselectOpen={setselectOpen}
            //   handleClickAway={handleClickAway}
            //   options={[
            //     {
            //       name: "Edit member",
            //       handler: () => open({ ...data }),
            //     },
            //     {
            //       hasCond: true,
            //       cond: !isActive,
            //       name: "Resend invitation",
            //       handler: () => onInviteMember({ member: data }),
            //     },
            //     {
            //       name: "Delete member",
            //       handler: onDeleteModalHandler,
            //     },
            //   ]}
            // />
          )}
        </Box>
      </Box>
      <Modal title="Delete member" open={openModal} closeModal={onCloseModal}>
        <Box style={{ padding: "3rem 24px" }}>
          <Typography size="1.4rem" face="Medium" fontWeight="500">
            Are you sure to delete this member? this action is not reversable.
          </Typography>
        </Box>

        <Box
          className="ModalFooter MemberModal__footer"
          style={{ border: "none" }}
        >
          <Button small ghost onClick={onCloseModal}>
            Cancel
          </Button>
          <Button
            small
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              onDeleteHandler();
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AdminMemberCard;
