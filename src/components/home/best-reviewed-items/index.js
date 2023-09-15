import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGetMostReviewed from "../../../api-manage/hooks/react-query/useGetMostReviewed";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";
import { setBestReviewedItems } from "../../../redux/slices/storedData";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import ProductCard from "../../cards/ProductCard";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import Menus from "./Menus";
import {
  bestReviewedSliderSettings,
  foodBestReviewedSliderSettings,
} from "./SliderSettings";
import { IconButtonGray, LeftArrowStyle, RightArrowStyle } from "./brt.style";
import { ScrollBox } from "../module-wise-components/ecommerce/NewArrivals";
import { Stack } from "@mui/system";

const BestReviewedItems = (props) => {
  const { title, leftImage } = props;
  const [menu, setMenu] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.up("sm"));
  const SliderRef = useRef(null);
  const { data, refetch } = useGetMostReviewed({ type: "all" });
  const { bestReviewedItems } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();

  const getCategoryIds = () => {
    const categoryIds = [];
    if (bestReviewedItems && bestReviewedItems.products) {
      bestReviewedItems.products.forEach((product) => {
        if (product.category_ids) {
          product.category_ids.forEach((categoryId) => {
            categoryIds.push(categoryId);
          });
        }
      });
    }

    return categoryIds;
  };
  const uniqueCategories = [
    ...new Set(getCategoryIds().map((item) => JSON.stringify(item))),
  ].map(JSON.parse);

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
  useEffect(() => {
    if (data) {
      setMenu(["All", ...uniqueCategories?.map((item) => item.name)]);
      setFilteredData(bestReviewedItems.products);
    }
  }, [bestReviewedItems.products]);

  useEffect(() => {
    if (selectedMenuIndex == 0) {
      setFilteredData(bestReviewedItems.products);
      setReRender(true);
    } else {
      const categoryWiseData = bestReviewedItems?.products?.filter((item) => {
        return item?.category_ids?.some((categoryId) => {
          return uniqueCategories[selectedMenuIndex - 1]?.id === categoryId?.id;
        });
      });

      setFilteredData(categoryWiseData);
      setReRender(true);
    }
  }, [selectedMenuIndex]);

  const slides = () =>
    filteredData?.map((product) => (
      <ProductCard
        key={product?.id}
        item={product}
        cardheight="365px"
        cardFor="vertical"
        // cardFor="popular items"
      />
    ));

  return (
    <>
      {getCurrentModuleType() === ModuleTypes.FOOD ? (
        <HomeComponentsWrapper>
          {bestReviewedItems && bestReviewedItems?.products?.length > 0 && (
            <>
              <CustomStackFullWidth
                alignItems={isSmall ? "center" : "flex-start"}
                justyfyContent="center"
                mt="30px"
                spacing={1}
              >
                <H2 text={title} textAlign="left" />
                <CustomBoxFullWidth>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <SliderCustom
                        nopadding="true"
                        sx={{
                          "& .slick-slide": {
                            marginRight: {
                              xs: "0px",
                              md: "-25px",
                            } /* Adjust the right margin to control the row space */,
                          },
                        }}
                      >
                        <Slider {...foodBestReviewedSliderSettings}>
                          {bestReviewedItems?.products?.map((item, index) => {
                            return (
                              <ProductCard
                                key={index}
                                item={item}
                                cardheight="150px"
                                horizontalcard="true"
                                cardFor="food horizontal card"
                              />
                            );
                          })}
                        </Slider>
                      </SliderCustom>
                    </Grid>
                  </Grid>
                </CustomBoxFullWidth>
              </CustomStackFullWidth>
            </>
          )}
        </HomeComponentsWrapper>
      ) : (
        <>
          {bestReviewedItems && filteredData.length > 0 && (
            <HomeComponentsWrapper sx={{ paddingTop: "1rem" }}>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <H2 text={title} />
                <Stack maxWidth="960px" width={isSmall ? "initial" : "100%"}>
                  {menu?.length > 0 && (
                    <Menus
                      selectedMenuIndex={selectedMenuIndex}
                      setSelectedMenuIndex={setSelectedMenuIndex}
                      menus={menu}
                    />
                  )}
                </Stack>
              </CustomStackFullWidth>
              <Grid container spacing={{ xs: 1, md: 1, lg: 1 }}>
                {/* <Grid item xs={0} sm={12} md={2.5} lg={2.5}>
										<CustomBoxFullWidth
											sx={{
												position: "relative",
												height: {
													xs: "200px",
													sm: "300px",
													md: "370px",
												},
												marginY: "10px",
												display: { xs: "none", sm: "inherit" },
											}}
										>
											<CustomImageContainer
												src={leftImage.src}
												height="100%"
												width="100%"
												borderRadius=".7rem"
												objectfit="cover"
											/>
										</CustomBoxFullWidth>
									</Grid> */}
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <Grid item md={12} container position="relative">
                    <CustomStackFullWidth justifyContent="right" key={reRender}>
                      {isMedium && filteredData.length > 3 && (
                        <LeftArrowStyle top="45%" left={0}>
                          <IconButtonGray
                            onClick={() => SliderRef.current.slickPrev()}
                          >
                            {getLanguage() === "rtl" ? (
                              <ArrowForwardIosIcon fontSize="small" />
                            ) : (
                              <ArrowBackIosNewIcon fontSize="small" />
                            )}
                          </IconButtonGray>
                        </LeftArrowStyle>
                      )}
                      {isSmall && filteredData.length > 2 && (
                        <LeftArrowStyle left={0}>
                          <IconButtonGray
                            onClick={() => SliderRef.current.slickPrev()}
                          >
                            {getLanguage() === "rtl" ? (
                              <ArrowForwardIosIcon fontSize="small" />
                            ) : (
                              <ArrowBackIosNewIcon fontSize="small" />
                            )}
                          </IconButtonGray>
                        </LeftArrowStyle>
                      )}

                      {isMedium && filteredData.length > 3 && (
                        <RightArrowStyle top="45%" right={0}>
                          <IconButtonGray
                            onClick={() => SliderRef.current.slickNext()}
                          >
                            {getLanguage() === "rtl" ? (
                              <ArrowBackIosNewIcon fontSize="small" />
                            ) : (
                              <ArrowForwardIosIcon fontSize="small" />
                            )}
                          </IconButtonGray>
                        </RightArrowStyle>
                      )}
                      {isSmall && filteredData.length > 2 && (
                        <RightArrowStyle right={0}>
                          <IconButtonGray
                            onClick={() => SliderRef.current.slickNext()}
                          >
                            {getLanguage() === "rtl" ? (
                              <ArrowBackIosNewIcon fontSize="small" />
                            ) : (
                              <ArrowForwardIosIcon fontSize="small" />
                            )}
                          </IconButtonGray>
                        </RightArrowStyle>
                      )}
                      <SliderCustom>
                        <Slider ref={SliderRef} {...bestReviewedSliderSettings}>
                          {slides()}
                        </Slider>
                      </SliderCustom>
                    </CustomStackFullWidth>
                  </Grid>
                </Grid>
              </Grid>
            </HomeComponentsWrapper>
          )}
        </>
      )}
    </>
  );
};

BestReviewedItems.propTypes = {};

export default BestReviewedItems;
