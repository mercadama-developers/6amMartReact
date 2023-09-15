import { Grid, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";
import { setPopularItemsNearby } from "../../../redux/slices/storedData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import ProductCard, { CardWrapper } from "../../cards/ProductCard";
import ProductCardShimmer from "../../search/ProductCardShimmer";
import H2 from "../../typographies/H2";
import Subtitle1 from "../../typographies/Subtitle1";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { settings } from "./SliderSettings";
import { getLanguage } from "../../../helper-functions/getLanguage";

export const Shimmer = () => {
  return (
    <CardWrapper>
      <Skeleton variant="rectangle" height="100%" width="100%" />
    </CardWrapper>
  );
};
const PopularItemsNearby = ({ title, subTitle }) => {
  const { popularItemsNearby } = useSelector((state) => state.storedData);
  const { t } = useTranslation();
  const { data, refetch, isFetching } = useGetPopularItemsNearby({
    offset: 1,
    type: "all",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularItemsNearby.products.length === 0) {
      refetch();
    }
  }, [popularItemsNearby]);

  useEffect(() => {
    if (data) {
      dispatch(setPopularItemsNearby(data));
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <HomeComponentsWrapper>
      {popularItemsNearby && popularItemsNearby?.products?.length > 0 && (
        <>
          <CustomStackFullWidth
            alignItems="center"
            justyfyContent="center"
            mt="30px"
            spacing={1}
          >
            <H2 text={title} />
            <Subtitle1 text={t(subTitle)} />
            <CustomBoxFullWidth>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} container>
                  <SliderCustom
                    nopadding="true"
                    sx={{
                      "& .slick-slide": {
                        marginY: "-15px",
                      },
                    }}
                  >
                    <Slider {...settings}>
                      {popularItemsNearby?.products?.map((item, index) => {
                        return (
                          <ProductCard
                            key={index}
                            item={item}
                            cardheight="160px"
                            horizontalcard="true"
                            cardFor="popular items"
                          />
                        );
                      })}
                    </Slider>
                  </SliderCustom>
                </Grid>
                {/*<Grid item xs={12} sm={5} md={3}>*/}
                {/*  <ItemsCampaign />*/}
                {/*</Grid>*/}
              </Grid>
            </CustomBoxFullWidth>
          </CustomStackFullWidth>
        </>
      )}

      {isFetching && (
        <Grid container>
          <ProductCardShimmer />
        </Grid>
      )}
    </HomeComponentsWrapper>
  );
};

export default PopularItemsNearby;
