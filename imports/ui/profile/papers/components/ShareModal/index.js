import "./style.scss";

import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import cx from "classnames";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import ReactTooltip from "react-tooltip";

import Modal from "/imports/ui/common/Modal";
import SVG from "/imports/ui/common/Svg";
import Typography from "/imports/ui/common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const ShareModal = ({ title, data, open, closeModal }) => {
  let url = "";
  const [copied, setcopied] = React.useState(false);
  if (typeof window !== "undefined") {
    url = window.location;
  }
  React.useEffect(() => {
    if (!open) {
      setcopied(false);
    }
  }, [open]);
  // ...
  const onCopyLink = () => {
    const el = document.querySelector(".ShareModal__challenge__inp");
    el.select();
    document.execCommand("copy");
    setcopied(true);
  };
  // ...
  return (
    <Modal
      className="ShareModal"
      title={title}
      open={open}
      closeModal={closeModal}
    >
      <Box className="ShareModal__body">
        <Typography
          color="#8993A8"
          size="1.4rem"
          face="Medium"
          m="0 0 1.1rem 0"
        >
          Copy link
        </Typography>

        <Box className="ShareModal__challenge">
          <Box className="ShareModal__challenge__logo">
            <SVG
              src="/oifa_icon_challenge.svg"
              style={{ width: "3.8rem", height: "3.8rem" }}
            />
          </Box>

          <Box className="ShareModal__challenge__content">
            <Typography
              color="#2C303B"
              size="1.4rem"
              height="1.4rem"
              face="Medium"
            >
              {data?.title}
            </Typography>
            <Typography
              color="#838FA7"
              size="1.4rem"
              height="1.4rem"
              face="Medium"
            >
              {url?.href || ""}
            </Typography>
            <input
              className="ShareModal__challenge__inp"
              value={url?.href || ""}
              type="text"
              readOnly
            />
          </Box>

          <Box
            className={cx("ShareModal__challenge__copy")}
            onClick={onCopyLink}
            data-tip
            data-for="Copy"
          >
            <Box className="ShareModal__challenge__copy__inner">
              <SVG
                src="/copylink.svg"
                style={{
                  width: "1.4rem",
                  height: "1.4rem",
                  color: "#FBCA66",
                }}
              />
            </Box>
          </Box>

          <ReactTooltip id="Copy" {...tooltipStyles}>
            <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
              {copied ? "Copied" : "Copy"}
            </Typography>
          </ReactTooltip>
        </Box>
        <div />

        <Box className="ShareModal__challenge__links">
          <FacebookShareButton url={url}>
            <FacebookIcon />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedInIcon />
          </LinkedinShareButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
