import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import Avatar from "../../../common/Avatar";
import Button from "../../../common/Button";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const ManagePeopleCard = ({ data, seeker, open, onInviteMember }) => {
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

  // ...
  const isOwner = data._id === seeker.ownerId;
  const isCreator = Roles.userIsInRole(data._id, ["SEEKER_CREATOR"]);
  const isEvaluator = Roles.userIsInRole(data._id, ["EVALUATOR_OWNER"]);
  const isSearcher = Roles.userIsInRole(data._id, ["SEEKER_SEARCHER"]);
  const isActive = data.accepted;
  let role = null;
  if (isCreator) role = "SEEKER_CREATOR";
  if (isSearcher) role = "SEEKER_SEARCHER";
  if (isEvaluator) role = "EVALUATOR_OWNER";
  // ...
  const firstName = data.profile.firstName;
  const lastName = data.profile.lastName;
  // - Actions
  const onDeleteMember = ({ member }) => {
    Meteor.call("user.member.delete", { memberId: member._id }, (err) => {
      setIsLoading(true);
      setOpenModal(false);
    });
  };
  const onDeleteEvaluator = ({ member }) => {
    const evaluatorId = member.evaluatorId;
    Meteor.call("user.seeker.evaluator.delete", { evaluatorId }, (err) => {
      setIsLoading(true);
      setOpenModal(false);
    });
  };
  // ...
  const onDeleteHandler = () => {
    return isEvaluator
      ? onDeleteEvaluator({ member: data })
      : onDeleteMember({ member: data });
  };
  // ...
  return (
    <>
      <Box className="ManagePeopleCard">
        <Box className="ManagePeopleCard__username">
          <Avatar label={`${firstName} ${lastName}`} />
          <Typography
            size="1.4rem"
            face="Medium"
            fontWeight="500"
            m="0 0 0 1.6rem"
          >
            {`${firstName} ${lastName}`}
          </Typography>
        </Box>
        <Box className="ManagePeopleCard__auth">
          <Typography size="1.4rem" color="#23252c" face="Book">
            {isOwner && "Owner"}
            {isCreator && "Creator"}
            {isEvaluator && "Evaluator"}
            {isSearcher && "Searcher"}
          </Typography>
        </Box>
        <Box className="ManagePeopleCard__status">
          <Typography size="1.4rem" color="#23252c" face="Book">
            {isActive ? "Active" : "Inactive"}
          </Typography>
        </Box>
        <Box className="ManagePeopleCard__actions">
          {!isOwner && (
            <>
              <div
                data-tip
                data-for="View"
                onClick={() => open({ ...data, role })}
              >
                <img src="/assets/view member.svg" alt="view" />
              </div>
              <ReactTooltip id="View" {...tooltipStyles}>
                <Typography
                  name="span"
                  size="1.4rem"
                  color="#CDCFD4"
                  face="Book"
                >
                  View member
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
            //       name: "View member",
            //       handler: () => open({ ...data, role }),
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

export default ManagePeopleCard;
