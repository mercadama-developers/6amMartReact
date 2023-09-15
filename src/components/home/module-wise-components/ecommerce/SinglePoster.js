import React from "react";
import PropTypes from "prop-types";
import CustomImageContainer from "../../../CustomImageContainer";
import { styled } from "@mui/material";
import { CustomBoxFullWidth } from "../../../../styled-components/CustomStyles.style";
import banner from "./assets/banner.png";
const ImageWrapper = styled(CustomBoxFullWidth)(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  height: "318px",
  [theme.breakpoints.down("sm")]: {
    height: "110px",
  },
}));
const SinglePoster = (props) => {
  return (
    <ImageWrapper>
      <CustomImageContainer
        height="100%"
        width="100%"
        src={banner.src}
        objectfit="cover"
      />
    </ImageWrapper>
  );
};

SinglePoster.propTypes = {};

export default SinglePoster;
