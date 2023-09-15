import React from "react";
import PropTypes from "prop-types";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));
const CustomLinearProgressbar = (props) => {
  return <BorderLinearProgress variant="determinate" value={20} />;
};

CustomLinearProgressbar.propTypes = {};

export default CustomLinearProgressbar;
