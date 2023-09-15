import React, { useEffect, useState } from "react";
import { HomeComponentsWrapper } from "../../../HomePageComponents";
import H2 from "../../../../typographies/H2";
import {
  CustomBoxFullWidth,
  CustomFullDivider,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../../styled-components/CustomStyles.style";
import { alpha, Grid, styled, Typography } from "@mui/material";
import Slider from "react-slick";
import { settings } from "./SliderSettings";
import { useDispatch, useSelector } from "react-redux";
import { setBestReviewedItems } from "../../../../../redux/slices/storedData";
import ProductCard from "../../../../cards/ProductCard";
import useGetMostReviewed from "../../../../../api-manage/hooks/react-query/useGetMostReviewed";
import { Box } from "@mui/system";

const StyledCustomSlider = styled(SliderCustom)(({ theme, active }) => ({
  color: active === "true" ? theme.palette.primary.main : "inherit",
  cursor: "pointer",
  "& .slick-dots": {
    // marginTop: "100px",
    marginBottom: "-40px",
    "& li": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      "& button::before": {
        color: "transparent",
      },
    },
    "& li.slick-active button::before": {
      top: "-2px",
      backgroundColor: theme.palette.primary.main,
      width: "10px",
      height: "10px",
      borderRadius: "50%",
    },
  },
}));

const menus = [
  "Cough, Cold & Flue",
  "Fever & Pain",
  "Diabetes",
  "Eye & Ear",
  "Digestive Health",
  "Allergy & Asthma",
  "Blood Pressure & Heart Disease",
  "Skin & Hair Condition",
  "Infection",
  "All Medicine",
];

const CommonConditions = (props) => {
  const { title } = props;
  const [selected, setSelected] = useState(0);
  const { bestReviewedItems } = useSelector((state) => state.storedData);
  const { data, refetch } = useGetMostReviewed({ type: "all" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (bestReviewedItems.products.length === 0) {
      refetch();
    }
  }, [bestReviewedItems]);
  useEffect(() => {
    if (data) {
      dispatch(setBestReviewedItems(data));
    }
  }, [data]);

  return (
    <HomeComponentsWrapper sx={{ marginTop: "30px", marginBottom: "20px" }}>
      <H2 text={title} textAlign="flex-start" />
      <CustomFullDivider sx={{ marginY: "10px" }} />
      <Grid container spacing={3}>
        <Grid item xs={0} sm={0} md={3}>
          <CustomStackFullWidth spacing={3}>
            {menus.map((item, index) => {
              return (
                <Typography
                  textAlign="flex-start"
                  variant={selected === index ? "16px" : "subtitle2"}
                  lineHeight="16.59px"
                  fontWeight={selected === index ? "700" : "400"}
                  sx={{
                    color:
                      selected === index ? "primary.main" : "text.secondary",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => setSelected(index)}
                >
                  {item}
                </Typography>
              );
            })}
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <CustomBoxFullWidth>
            <StyledCustomSlider>
              <Slider {...settings}>
                {bestReviewedItems?.products?.length > 0 &&
                  bestReviewedItems?.products?.map((item) => (
                    <Box key={item?.id} sx={{ mt: "12px" }}>
                      <ProductCard
                        item={item}
                        cardheight="365px"
                        cardFor="vertical"
                        cardType="vertical-type"
                        // cardFor="popular items"
                      />
                    </Box>
                  ))}
              </Slider>
            </StyledCustomSlider>
          </CustomBoxFullWidth>
        </Grid>
      </Grid>
    </HomeComponentsWrapper>
  );
};

CommonConditions.propTypes = {};

export default CommonConditions;
