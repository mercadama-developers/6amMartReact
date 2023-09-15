import React from "react";
import { CardWrapper } from "../cards/ProductCard";
import { Skeleton } from "@mui/material";

const horizontalCardShimmer = ({ cardheight }) => {
  return (
    <>
      <CardWrapper>
        <Skeleton variant="rectangle" height="100%" width="100%" />
      </CardWrapper>
    </>
  );
};

export default horizontalCardShimmer;
