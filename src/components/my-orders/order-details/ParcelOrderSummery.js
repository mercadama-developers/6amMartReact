import React from "react";
import {
  alpha,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack, styled } from "@mui/system";
import { t } from "i18next";
import CustomImageContainer from "../../CustomImageContainer";
import nodata from "../assets/test.png";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@emotion/react";
import SenderOrReceiverDetails from "./parcel-order/SenderOrReceiverDetails";
import Divider from "@mui/material/Divider";
import { SummeryShimmer } from "./parcel-order/Shimmers";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";

export const ParcelOrderSummaryBox = styled(CustomStackFullWidth)(
  ({ theme }) => ({
    border: "1px solid",
    borderColor: alpha(theme.palette.neutral[400], 0.2),
    padding: "20px 14px",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      border: "none",
      backgroundColor: alpha(theme.palette.neutral[300], 0.5),
    },
  })
);

const ParcelOrderSummery = ({ data, trackOrderData, configData }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container pr={{ xs: "0px", sm: "0px", md: "40px" }}>
      <Grid item md={8.1} xs={12} pl={{ xs: "0px", sm: "20px", md: "25px" }}>
        <CustomStackFullWidth
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          <SenderOrReceiverDetails
            title="Sender Details"
            image={nodata}
            name={data?.delivery_address?.contact_person_name}
            address={data?.delivery_address?.address}
            phone={data?.delivery_address?.contact_person_number}
          />
          {!isSmall && (
            <Stack
              sx={{
                borderLeft: (theme) =>
                  `3px solid ${alpha(theme.palette.neutral[400], 0.2)}`,

                height: "129px",
              }}
            ></Stack>
          )}
          <SenderOrReceiverDetails
            title="Receiver Details"
            image={nodata}
            name={data?.receiver_details?.contact_person_name}
            address={data?.receiver_details?.address}
            phone={data?.receiver_details?.contact_person_number}
          />
        </CustomStackFullWidth>
        <CustomStackFullWidth
          direction="row"
          spacing={2}
          pt="40px"
          pb={{ xs: "30px", md: "0" }}
          pl={{ xs: "6px", md: "0px" }}
        >
          <Stack spacing={1}>
            <Typography fontSize={{ xs: "14px", md: "16px" }} fontWeight="500">
              {t("Payment")}
            </Typography>
            {trackOrderData?.payment_method ? (
              <Typography
                fontSize={{ xs: "12px", md: "14px" }}
                fontWeight="400"
                color={theme.palette.neutral[500]}
                width={{ xs: "120px", md: "215px" }}
                lineHeight="25px"
                textTransform="capitalize"
              >
                {t(trackOrderData?.payment_method.replaceAll("_", " "))}
              </Typography>
            ) : (
              <Skeleton width="100px" variant="text" />
            )}
          </Stack>
          {isSmall && (
            <Stack
              sx={{
                borderLeft: (theme) =>
                  `2px solid ${alpha(theme.palette.neutral[400], 0.2)}`,

                height: "64px",
                paddingRight: "30px",
              }}
            ></Stack>
          )}
          <Stack spacing={1}>
            <Typography fontSize={{ xs: "14px", md: "16px" }} fontWeight="500">
              {t("Charge Pay By")}
            </Typography>
            {trackOrderData?.payment_method ? (
              <Typography
                fontSize={{ xs: "12px", md: "14px" }}
                fontWeight="400"
                color={theme.palette.neutral[500]}
                width={{ xs: "150px", md: "215px" }}
                lineHeight="25px"
                textTransform="capitalize"
              >
                {data?.charge_payer}
              </Typography>
            ) : (
              <Skeleton width="100px" variant="text" />
            )}
          </Stack>
        </CustomStackFullWidth>
      </Grid>
      <Grid item md={3.9} xs={12} paddingLeft={{ xs: "0px", md: "26px" }}>
        {data ? (
          <ParcelOrderSummaryBox alignItems="center" spacing={2}>
            <CustomImageContainer
              width="144px"
              height="144px"
              src={`${configData?.base_urls?.parcel_category_image_url}/${data?.parcel_category?.image}`}
              alt={data?.parcel_category?.name}
            />
            <Stack alignItems="center" textAlign="center">
              <Typography fontSize="18px" fontWeight="600">
                {data?.parcel_category?.name}
              </Typography>
              <Typography color={theme.palette.neutral[400]}>
                {data?.parcel_category?.description}
              </Typography>
            </Stack>
            <Stack width="100%" spacing={1}>
              <Typography
                fontSize="16px"
                fontWeight="500"
                textTransform="capitalize"
                textAlign="left"
              >
                {t("summary")}
              </Typography>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography fontSize="14px" color={theme.palette.neutral[400]}>
                  {t("Items Price")}
                </Typography>
                {data ? (
                  <Typography
                    fontSize="14px"
                    color={theme.palette.neutral[400]}
                  >
                    {data && getAmountWithSign(data?.order_amount)}
                  </Typography>
                ) : (
                  <Skeleton width="100px" variant="text" />
                )}
              </CustomStackFullWidth>
              <Stack
                width="100%"
                sx={{
                  marginBottom: "10px",
                  mt: "20px",
                  borderBottom: (theme) =>
                    `1px dotted ${theme.palette.neutral[400]}`,
                }}
              ></Stack>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography fontWeight="500">{t("Total Amount")}</Typography>
                {data ? (
                  <Typography fontWeight="600">
                    {data && getAmountWithSign(data?.order_amount)}
                  </Typography>
                ) : (
                  <Skeleton width="100px" variant="text" />
                )}
              </CustomStackFullWidth>
            </Stack>
          </ParcelOrderSummaryBox>
        ) : (
          <SummeryShimmer />
        )}
      </Grid>
    </Grid>
  );
};

export default ParcelOrderSummery;
