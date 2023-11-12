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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PrevIcon from "../../icons/PrevIcon";
import NextIcon from "../../icons/NextIcon";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularItemsNearby]);

  useEffect(() => {
    if (data) {
      dispatch(setPopularItemsNearby(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <Swiper
                    modules={[Navigation]}
                    className="mySwiper"
                    spaceBetween={0}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },

                      420: {
                        slidesPerView: 1,
                      },
                      510: {
                        slidesPerView: 1.5,
                      },
                      750: {
                        slidesPerView: 1.7,
                      },
                      870: {
                        slidesPerView: 1.7,
                      },

                      1060: {
                        slidesPerView: 2.5,
                      },
                      1250: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    <div className="swiper-button-prev">
                      <PrevIcon />
                    </div>
                    <div className="swiper-button-next">
                      <NextIcon />
                    </div>
                    {popularItemsNearby?.products?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductCard
                          item={item}
                          cardheight="160px"
                          horizontalcard="true"
                          cardFor="popular items"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>
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
