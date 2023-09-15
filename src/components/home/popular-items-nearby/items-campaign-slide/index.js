import React from "react";
import PropTypes from "prop-types";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../styled-components/CustomStyles.style";
import { alpha } from "@mui/material";
import CustomImageContainer from "../../../CustomImageContainer";
import bg from "./assets/bg.png";
import Slide from "./Slide";
import Slider from "react-slick";
import { settings } from "./Settings";
import CustomSlider from "../../../search/CustomSlider";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const StyledCustomSlider = styled(SliderCustom)(({ theme }) => ({
  "& .slick-dots": {
    top: "510px",

    "& li": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      width: "8px",
      height: "3px",
      "& button::before": {
        color: "transparent",
      },
    },
    "& li.slick-active button::before": {
      backgroundColor: theme.palette.primary.main,
      width: "8px",
      height: "3px",
      borderRadius: "100px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .slick-dots": {
      bottom: 0,
    },
  },
}));
const ItemsCampaign = (props) => {
  return (
    <CustomStackFullWidth
      height="100%"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.neutral[400], 0.1),
        padding: "4px",
        // margin: { xs: "none", md: "10px 15px" },
        borderRadius: "10px",
      }}
    >
      <StyledCustomSlider>
        <Slider {...settings}>
          {[...Array(3)].map((item, index) => {
            return (
              <Box key={index}>
                <Slide />
              </Box>
            );
          })}
        </Slider>
      </StyledCustomSlider>
    </CustomStackFullWidth>
  );
};

ItemsCampaign.propTypes = {};

export default ItemsCampaign;
