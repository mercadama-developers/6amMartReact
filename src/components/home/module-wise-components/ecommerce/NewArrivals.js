/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useNewArrivals from "../../../../api-manage/hooks/react-query/product-details/useNewArrivals";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import ProductCard from "../../../cards/ProductCard";
import H2 from "../../../typographies/H2";
import { HomeComponentsWrapper } from "../../HomePageComponents";
import TabMenu from "../../best-reviewed-items/TabMenu";

const NewArrivals = (props) => {
  const [menu, setMenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { data, refetch, isLoading } = useNewArrivals();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.only("sm"));

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setMenu(["All", ...data?.categories?.map((item) => item.name)]);
      setFilteredData(data?.products);
    }
  }, [data]);
  useEffect(() => {
    if (selectedMenuIndex == 0) {
      setFilteredData(data?.products);
    } else {
      setFilteredData(
        data?.products?.filter(
          (item, i) =>
            item.category_id === data.categories[selectedMenuIndex - 1].id
        )
      );
    }
  }, [selectedMenuIndex]);

  const itemArrayManage = (itemArray) => {
    if (isMedium) {
      return itemArray?.slice?.(0, 6);
    } else {
      return itemArray?.slice?.(0, 8);
    }
  };

  const layoutManage = () => {
    if (isSmall) {
      return (
        <HomeComponentsWrapper
          justifyContent="center"
          alignItems="center"
          mt="30px"
        >
          <Grid container spacing={2.5}>
            {/* <Grid item xs={12} sx={{ maxHeight: "600px" }}>
							<CustomImageContainer
								width="100%"
								height="100%"
								objectfit="cover"
								src={dummyImage.src}
								borderRadius="10px"
							/>
						</Grid> */}
            <Grid item xs={12}>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <H2 text="New Arrivals" />
                <ScrollBox>
                  {!isLoading && menu?.length > 0 && (
                    <TabMenu
                      selectedMenuIndex={selectedMenuIndex}
                      setSelectedMenuIndex={setSelectedMenuIndex}
                      menus={menu}
                    />
                  )}
                </ScrollBox>
              </CustomStackFullWidth>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              {filteredData?.length > 0 &&
                filteredData?.map((product, index) => (
                  <Grid item xs={6} key={product?.id}>
                    <ProductCard
                      item={product}
                      cardheight={isSmall ? "240px" : "290px"}
                      cardFor="vertical"
                      noMargin
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </HomeComponentsWrapper>
      );
    } else {
      return (
        <HomeComponentsWrapper
          justifyContent="center"
          alignItems="center"
          mt="30px"
        >
          <H2 text="New Arrivals" />
          <CustomStackFullWidth
            justifyContent="center"
            alignItems="center"
            mt="8px"
          >
            <ScrollBox>
              {!isLoading && menu?.length > 0 && (
                <TabMenu
                  selectedMenuIndex={selectedMenuIndex}
                  setSelectedMenuIndex={setSelectedMenuIndex}
                  menus={menu}
                />
              )}
            </ScrollBox>
          </CustomStackFullWidth>
          <Box
            sx={{
              width: "100%",
              mt: ".3rem",
            }}
          >
            <CustomStackFullWidth>
              <Grid container spacing={2}>
                {/* <Grid item sm={4} md={2.4}>
									<CustomBoxFullWidth
										sx={{
											position: "relative",
											height: "98%",
											// paddingTop: "10px",
										}}
									>
										<CustomImageContainer
											width="100%"
											height="100%"
											objectfit="contain"
											src={dummyImage.src}
										/>
									</CustomBoxFullWidth>
								</Grid> */}
                <Grid item sm={12} md={12} container spacing={2}>
                  {filteredData?.slice(0, 8)?.length > 0 &&
                    itemArrayManage(filteredData).map((product, index) => (
                      <Grid item sm={4} md={3} lg={2.4} key={product?.id}>
                        <ProductCard
                          item={product}
                          cardheight="300px"
                          cardFor="vertical"
                          noMargin
                          // cardFor="popular items"
                        />
                      </Grid>
                    ))}
                  {filteredData?.slice(isMedium ? 6 : 8)?.length > 0 &&
                    filteredData?.slice(isMedium ? 6 : 8)?.map((product) => (
                      <Grid item sm={3} md={2.4} key={product?.id}>
                        <ProductCard
                          item={product}
                          cardheight="300px"
                          cardFor="vertical"
                          noMargin
                          // cardFor="popular items"
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </CustomStackFullWidth>
          </Box>
        </HomeComponentsWrapper>
      );
    }
  };
  return <>{layoutManage()}</>;
};

export const ScrollBox = styled(Box)({
  ".MuiTypography-root": { whiteSpace: "pre" },
  position: "relative",
  zIndex: "3",
});
NewArrivals.propTypes = {};

export default NewArrivals;
