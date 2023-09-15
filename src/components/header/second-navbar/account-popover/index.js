import React from "react";
import PropTypes from "prop-types";
import { Popover } from "@mui/material";
import { Box } from "@mui/system";
import Menu from "./Menu";

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  return (
    <Popover
      disableScrollLock={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={2}
      {...other}
    >
      <Menu onClose={onClose} />
    </Popover>
  );
};

AccountPopover.propTypes = {};

export default AccountPopover;
