import React, { useEffect, useRef } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import { Typography, useTheme } from "@mui/material";
import ProductReviewCard from "./product-details-section/ProductReviewCard";
import { Stack } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductsThumbnailsSettings } from "./product-details-section/ProductsThumbnailsSettings";
import {
  IconButtonGray,
  LeftArrowStyle,
  RightArrowStyle,
} from "../home/best-reviewed-items/brt.style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ProductsReviewSettings } from "./ProductsReviewSettings";
import useGetProductReviews from "../../api-manage/hooks/react-query/product-details/useProductReviews";
import { t } from "i18next";
import CustomPagination from "../custom-pagination";

const ProductReviews = ({
  reviews,
  configData,
  offSet,
  total_size,
  setOffSet,
  page_limits,
  isExpanded,
}) => {
  const theme = useTheme();
  const SliderRef = useRef(null);

  return (
    <>
      <CustomBoxFullWidth>
        {reviews?.length > 0 ? (
          reviews?.map((review) => {
            return (
              <ProductReviewCard
                key={review?.id}
                review={review}
                configData={configData}
              />
            );
          })
        ) : (
          <>{isExpanded === "true" && "No reviews found"}</>
        )}
        {reviews?.length > 1 && (
          <CustomPagination
            total_size={total_size}
            page_limit={page_limits}
            offset={offSet}
            setOffset={setOffSet}
          />
        )}
      </CustomBoxFullWidth>
    </>
  );
};

export default ProductReviews;
