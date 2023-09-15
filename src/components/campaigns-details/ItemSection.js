import React, { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import { useSelector } from "react-redux";
import { getModuleId } from "../../helper-functions/getModuleId";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomEmptyResult from "../custom-empty-result";
import noData from "../../../public/static/nodata.png";
import CustomPagination from "../custom-pagination";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import StoreShimmer from "../Shimmer/StoreShimmer";

const ItemSection = ({ campaignsDetails, isLoading, isRefetching }) => {
  const [page_limit, setPageLimit] = useState(10);
  const [offset, setOffset] = useState(1);
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const matches = useMediaQuery("(max-width:1475px)");
  const matchesXs = useMediaQuery("(max-width:480px)");
  return (
    <>
      <Grid container spacing={{ xs: 0.5, md: 2 }}>
        {campaignsDetails?.stores?.length > 0 &&
          campaignsDetails?.stores?.map((store) => {
            return (
              <Grid
                key={store?.id}
                item
                md={matches ? 3 : 2.4}
                sm={4}
                xs={matchesXs ? 12 : 6}
              >
                <StoresInfoCard data={store} />
              </Grid>
            );
          })}
        {isLoading && <StoreShimmer />}
      </Grid>
      {campaignsDetails?.stores?.length === 0 && (
        <CustomEmptyResult label="No store found" image={noData} />
      )}
    </>
  );
};

export default ItemSection;
