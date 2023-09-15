import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  CustomBoxFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";

import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { useGetFeaturedCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setFeaturedCategories } from "../../../redux/slices/storedData";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import FoodCategoryCard from "../../cards/FoodCategoryCard";
import PharmacyCategoryCard from "../../cards/PharmacyCategoryCard";
import ShopCategoryCard from "../../cards/ShopCategoryCard";
import { HomeComponentsWrapper } from "../HomePageComponents";
import FeaturedItemCard from "./card";
import {
  foodCategorySliderSettings,
  settings,
  shopCategorySliderSettings,
} from "./sliderSettings";
import { getLanguage } from "../../../helper-functions/getLanguage";

export const ButtonLeft = styled(CustomButtonPrimary)(
  ({ theme, language_direction }) => ({
    minWidth: "20px",
    width: "10px",
    height: "30px",
    borderRadius: "50%",
    transform: language_direction === "rtl" && "rotate(180deg)",
  })
);
export const ButtonRight = styled(CustomButtonPrimary)(({ theme }) => ({
  minWidth: "20px",
  width: "10px",
  height: "30px",
  borderRadius: "50%",
  color: "black",
  background: theme.palette.neutral[200],
  "&:hover": {
    background: theme.palette.neutral[400],
  },
}));

const FeaturedCategories = ({ configData }) => {
  const { featuredCategories } = useSelector((state) => state.storedData);
  const slider = useRef(null);
  const { data, refetch, isFetched, isFetching, isLoading, isRefetching } =
    useGetFeaturedCategories();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (featuredCategories.length === 0) {
    //   refetch();
    // }
    refetch();
  }, [featuredCategories]);

  useEffect(() => {
    if (data) {
      dispatch(setFeaturedCategories(data?.data));
    }
  }, [data]);

  const moduleWiseCard = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return (
          <CustomBoxFullWidth
            sx={{
              "& .slick-slider": {
                paddingY: "30px",
              },
            }}
          >
            <Slider {...settings} ref={slider}>
              {featuredCategories?.map((item, index) => {
                return (
                  <FeaturedItemCard
                    key={index}
                    image={`${configData?.base_urls?.category_image_url}/${item?.image}`}
                    title={item?.name}
                    id={item?.id}
                    slug={item?.slug}
                  />
                );
              })}
            </Slider>
          </CustomBoxFullWidth>
        );
      case ModuleTypes.PHARMACY:
        return (
          <Slider {...settings} ref={slider}>
            {featuredCategories?.map((item, index) => {
              return (
                <PharmacyCategoryCard
                  key={index}
                  image={`${configData?.base_urls?.category_image_url}/${item?.image}`}
                  title={item?.name}
                  slug={item?.slug}
                  id={item?.id}
                />
              );
            })}
          </Slider>
        );
      case ModuleTypes.ECOMMERCE:
        return (
          <Slider {...shopCategorySliderSettings} ref={slider}>
            {featuredCategories?.map((item, index) => {
              return (
                <ShopCategoryCard
                  key={index}
                  imageUrl={configData?.base_urls?.category_image_url}
                  item={item}
                />
              );
            })}
          </Slider>
        );
      case ModuleTypes.FOOD:
        return (
          <Slider {...foodCategorySliderSettings} ref={slider}>
            {featuredCategories?.map((item, index) => {
              return (
                <FoodCategoryCard
                  key={item?.id}
                  id={item?.id}
                  categoryImage={item?.image}
                  name={item?.name}
                  slug={item?.slug}
                  categoryImageUrl={configData?.base_urls?.category_image_url}
                  height="40px"
                />
              );
            })}
          </Slider>
        );
    }
  };
  const moduleWiseCardShimmer = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return (
          <Slider {...settings} ref={slider}>
            {[...Array(5)]?.map((item, index) => {
              return <FeaturedItemCard key={index} onlyshimmer />;
            })}
          </Slider>
        );

      case ModuleTypes.PHARMACY:
        return (
          <Slider {...settings} ref={slider}>
            {[...Array(5)]?.map((item, index) => {
              return <PharmacyCategoryCard key={index} onlyshimmer />;
            })}
          </Slider>
        );
      case ModuleTypes.ECOMMERCE:
        return (
          <Slider {...shopCategorySliderSettings} ref={slider}>
            {[...Array(5)]?.map((item, index) => {
              return <ShopCategoryCard key={index} onlyshimmer />;
            })}
          </Slider>
        );
      case ModuleTypes.FOOD:
        return (
          <Slider {...foodCategorySliderSettings} ref={slider}>
            {[...Array(15)]?.map((item, index) => {
              return <FoodCategoryCard key={index} onlyshimmer />;
            })}
          </Slider>
        );
    }
  };

  return (
    <CustomBoxFullWidth sx={{ mt: "20px" }}>
      {isFetching ? (
        <HomeComponentsWrapper>
          <SliderCustom nopadding="true">
            {moduleWiseCardShimmer()}
          </SliderCustom>
        </HomeComponentsWrapper>
      ) : (
        featuredCategories &&
        featuredCategories.length > 0 && (
          <HomeComponentsWrapper>
            {featuredCategories && featuredCategories.length > 0 && (
              <SliderCustom
                sx={{
                  "& .slick-slider": {
                    "& .slick-slide": {
                      padding: { xs: "0px", md: "6px" },
                    },
                  },
                }}
              >
                {moduleWiseCard()}
              </SliderCustom>
            )}
          </HomeComponentsWrapper>
        )
      )}
    </CustomBoxFullWidth>
  );
};

export default FeaturedCategories;
