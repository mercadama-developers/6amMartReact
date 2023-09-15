import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import { ButtonLeft, ButtonRight } from "./index";
import { alpha, styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import PrevIcon from "../../icons/PrevIcon";
import NextIcon from "../../icons/NextIcon";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import Slider from "react-slick";
import FeaturedItemCard from "./card";
import PharmacyCategoryCard from "../../cards/PharmacyCategoryCard";
import { WhiteNext, WhitePrev } from "../visit-again/SliderSettings";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";

const ButtonContainer = styled(Box)(({ theme, right, isdisabled }) => ({
  top: 0,
  height: "100%",
  width: "73px",
  background:
    right === "true"
      ? theme.direction === "ltr"
        ? `linear-gradient(270deg, ${theme.palette.neutral[100]} 0%, rgba(255, 255, 255, 0) 100%)`
        : `linear-gradient(270deg,  rgba(255, 255, 255, 0) 0%, ${theme.palette.neutral[100]} 100%)`
      : theme.direction === "ltr"
      ? `linear-gradient(to right, ${theme.palette.neutral[100]} 0%, rgba(255, 255, 255, 0) 100%)`
      : `linear-gradient(to left, rgba(255, 255, 255, 0) 0%, ${theme.palette.neutral[100]} 100%)`,

  zIndex: 1,
  right: right === "true" && 0,
  left: right !== "true" && 0,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  display: isdisabled ? "none" : "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const PrevWrapper = styled(Box)(({ theme, isdisabled }) => ({
  zIndex: 1,
  top: "50%",
  left: 0,
  display: isdisabled && "none",
  background: (theme) =>
    `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 54.03%, ${theme.palette.primary.main} 100%)`,
}));
const NextWrapper = styled(Box)(({ theme, isdisabled }) => ({
  top: "50%",
  zIndex: 1,
  right: 8,
  display: isdisabled && "none",
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 54.03%, ${alpha(
    theme.palette.primary.main,
    0.3
  )} 100%)`,
  borderRadius: "50%",
}));
const Next = ({ onClick, className, displayNoneOnMobile }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
      right="true"
    >
      <NextWrapper
        className={`client-nav client-next ${className}`}
        onClick={onClick}
        isdisabled={className?.includes("slick-disabled")}
      >
        {getLanguage() === "rtl" ? <PrevIcon /> : <NextIcon />}
      </NextWrapper>
    </ButtonContainer>
  );
};
const Prev = ({ onClick, className, displayNoneOnMobile }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const displayNone = isSmall ? (displayNoneOnMobile ? true : false) : false;
  return (
    <ButtonContainer
      isdisabled={displayNone || className?.includes("slick-disabled")}
    >
      <PrevWrapper
        className={`client-nav client-prev ${className}`}
        onClick={onClick}
        isdisabled={className?.includes("slick-disabled")}
      >
        {getLanguage() === "rtl" ? <NextIcon /> : <PrevIcon />}
      </PrevWrapper>
    </ButtonContainer>
  );
};

const moduleWiseNext = () => {
  switch (getCurrentModuleType()) {
    case ModuleTypes.GROCERY:
      return <Next displayNoneOnMobile />;
    case ModuleTypes.PHARMACY:
      return <WhiteNext noboxshadow displayNoneOnMobile />;
    case ModuleTypes.ECOMMERCE:
      return <Next displayNoneOnMobile />;
    case ModuleTypes.FOOD:
      return <WhiteNext noboxshadow displayNoneOnMobile />;
  }
};
const moduleWisePrev = () => {
  switch (getCurrentModuleType()) {
    case ModuleTypes.GROCERY:
      return <Prev displayNoneOnMobile />;
    case ModuleTypes.PHARMACY:
      return <WhitePrev noboxshadow />;
    case ModuleTypes.ECOMMERCE:
      return <Prev displayNoneOnMobile />;
    case ModuleTypes.FOOD:
      return <WhitePrev displayNoneOnMobile noboxshadow />;
  }
};

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,

  slidesToShow: 8,
  slidesToScroll: 1,
  nextArrow: moduleWiseNext(),
  prevArrow: moduleWisePrev(),
  currentSlide: 0,
  rtl: true,

  responsive: [
    {
      breakpoint: 1650,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 6.5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5.2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2.8,
        slidesToScroll: 1,
      },
    },
  ],
};

export const shopCategorySliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: moduleWiseNext(),
  prevArrow: moduleWisePrev(),

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1210,
      settings: {
        slidesToShow: 4.5,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3.8,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 785,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 730,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 630,
      settings: {
        slidesToShow: 2.3,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.8,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 1.6,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 374,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const foodCategorySliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 3,
  // autoplay: true,
  nextArrow: moduleWiseNext(),
  prevArrow: moduleWisePrev(),
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        // dots: true
      },
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 4.5,
        slidesToScroll: 3,
        infinite: true,
      },
    },

    {
      breakpoint: 600,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
      },
    },
  ],
};
