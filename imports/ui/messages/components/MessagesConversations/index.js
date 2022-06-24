import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import cx from "classnames";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import EmptyView from "../../../common/EmptyView";
import Typography from "../../../common/Typography";
import MessagerCard from "../MessagerCard";

const hasMatch = (room, searchFor) => {
  const org = room.theOther();
  if (!room || !org) return 1;
  const orgName = org.getOrgName();
  // ...
  const search = searchFor.toLowerCase();
  const name = orgName.toLowerCase();
  // ...
  return name.indexOf(search) > -1;
};

const MessagesConversations = ({ roomId, data, handler }) => {
  const [searchFor, setSearchFor] = useState("");
  const onInputChange = (e) => {
    setSearchFor(e.target.value);
  };
  // ...
  return (
    <Box component="aside" className="Messages__conversation">
      <Box className="Messages__conversation__head">
        <Typography size="1.6rem" color="#333760" face="Medium">
          All Messages
        </Typography>
      </Box>

      <InputBase
        className="Messages__conversation__search"
        placeholder="Search for a solver"
        value={searchFor}
        onChange={onInputChange}
        startAdornment={
          <SearchIcon
            style={{
              fontSize: "2.3rem",
              color: "#7c8799",
              margin: "0 1.1rem 0 2.8rem",
            }}
          />
        }
      />

      <Box component="ul" className="Messages__conversation__list">
        {!!data.length && (
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            {data
              .filter((room) => hasMatch(room, searchFor))
              .map((room) => {
                return (
                  <Box
                    key={room._id}
                    component="li"
                    className={cx("Messages__conversation__list__item", {
                      __active: room._id === roomId,
                    })}
                  >
                    <MessagerCard data={room} handler={handler} />
                  </Box>
                );
              })}
          </ScrollArea>
        )}
        {/* {!data.length && (
          <Box className="Messages__conversation__empty">
            <EmptyView search />
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default MessagesConversations;
