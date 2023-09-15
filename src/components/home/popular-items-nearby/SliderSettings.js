import React from "react";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NextFood, PrevFood } from "../best-reviewed-items/SliderSettings";

const IconWrapper = styled(Box)(({ theme, isdisabled, left }) => ({
  zIndex: 1,
  right: left !== "true" && 0,
  left: left == "true" && 0,
  background: "rgba(255, 255, 255, 0.6)",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  color: theme.palette.neutral[800],
  display: isdisabled ? "none" : "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.neutral[800],
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export const Next = ({ onClick, className }) => {
  return (
    <IconWrapper
      className={`client-nav client-next ${className}`}
      onClick={onClick}
      isdisabled={className?.includes("slick-disabled")}
    >
      {getLanguage() === "rtl" ? (
        <ChevronLeftIcon />
      ) : (
        <KeyboardArrowRightIcon />
      )}
    </IconWrapper>
  );
};
export const Prev = ({ onClick, className }) => {
  return (
    <IconWrapper
      className={`client-nav client-prev ${className}`}
      onClick={onClick}
      isdisabled={className?.includes("slick-disabled")}
      left="true"
    >
      {getLanguage() === "rtl" ? (
        <KeyboardArrowRightIcon />
      ) : (
        <ChevronLeftIcon />
      )}
    </IconWrapper>
  );
};
export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesPerRow: 1,
  rows: 3,
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: "linear",

  responsive: [
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.1,
        slidesPerRow: 1,
        rows: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1.5,
        slidesPerRow: 2,
        rows: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesPerRow: 2,
        rows: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 2,
        rows: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 2,
        rows: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        slidesPerRow: 3,
        rows: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesPerRow: 3,
        rows: 3,
        slidesToScroll: 1,
      },
    },
  ],
  prevArrow: <PrevFood noBackground />,
  nextArrow: <NextFood noBackground rightSpace="-45px" />,
};
