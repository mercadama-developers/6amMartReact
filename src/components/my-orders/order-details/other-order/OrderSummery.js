import React, { useState } from "react";
import {
  alpha,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CustomImageContainer from "../../../CustomImageContainer";
import { Box, Stack } from "@mui/system";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import OrderCalculation from "./OrderCalculation";
import Shimmer from "./Shimmer";
import Divider from "@mui/material/Divider";
import CustomDivider from "../../../CustomDivider";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { CustomTypographyEllipsis } from "../../../../styled-components/CustomTypographies.style";
import ParcelOrderSummery from "../ParcelOrderSummery";
import SingleOrderAttachment from "../singleOrderAttachment";
import PrescriptionOrderSummery from "../prescription-order/PrescriptionOrderSummery";
import PrescriptionOrderCalculation from "../prescription-order/PerscriptionOrderCalculation";
import InstructionBox from "./InstructionBox";
import moment from "moment";

const getAddOnsNames = (addOns) => {
  const names = addOns.map(
    (item, index) =>
      `${addOns[0].name}(${addOns[0].quantity})${
        index !== addOns.length - 1 ? "," : ""
      }`
  );
  return names;
};

const OrderSummery = (props) => {
  const { trackOrderData, configData, t, data, isLoading, dataIsLoading } =
    props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openModal, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageOnClick = (value) => {
    setModalImage(value);
    setModalOpen(true);
  };
  const handleModalClose = (value) => {
    setModalOpen(value);
    setModalImage(null);
  };

  return (
    <>
      {data && data.module_type === "parcel" ? (
        <ParcelOrderSummery
          data={data}
          trackOrderData={trackOrderData}
          configData={configData}
        />
      ) : (
        <Grid container pr={{ xs: "0px", sm: "0px", md: "40px" }}>
          <Grid container item md={8} xs={12}>
            <Grid item xs={12} sm={12} md={12}>
              {!data?.prescription_order &&
                trackOrderData?.module_type === "pharmacy" &&
                trackOrderData?.order_attachment && (
                  <SingleOrderAttachment
                    title="Prescription"
                    attachment={trackOrderData?.order_attachment}
                    configData={configData}
                  />
                )}
              {data?.prescription_order && (
                <PrescriptionOrderSummery data={data} />
              )}
              {data &&
                data?.length > 0 &&
                data?.map((product) => (
                  <Grid
                    container
                    alignItems="flex-start"
                    md={12}
                    xs={12}
                    spacing={{ xs: 1 }}
                    key={product?.id}
                    mb="13px"
                    pl={{ xs: "0px", sm: "20px", md: "25px" }}
                  >
                    <Grid item xs={3} sm={1.2} md={1.2}>
                      {product.item_campaign_id ? (
                        <CustomImageContainer
                          src={`${configData?.base_urls?.campaign_image_url}/${product.item_details.image}`}
                          height="63px"
                          maxWidth="63px"
                          width="100%"
                          loading="lazy"
                          smHeight="50px"
                        />
                      ) : (
                        <CustomImageContainer
                          src={`${configData?.base_urls?.item_image_url}/${product.item_details.image}`}
                          height="63px"
                          maxWidth="63px"
                          width="100%"
                          loading="lazy"
                          smHeight="70px"
                          borderRadius=".7rem"
                        />
                      )}
                    </Grid>
                    <Grid item md={10.8} xs={9} sm={10.8} align="left">
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        paddingBottom={{ xs: "5px", md: "0px" }}
                      >
                        <Stack>
                          <CustomTypographyEllipsis
                            fontWeight="500"
                            fontSize="13px"
                          >
                            {product?.item_details?.name}
                          </CustomTypographyEllipsis>
                          <Typography variant="body2" mt="3px">
                            {product?.item_details?.unit_type}
                          </Typography>
                          <Typography variant="body2" mt="5px">
                            Unit Price :{" "}
                            {getAmountWithSign(product?.item_details?.price)}
                          </Typography>
                          {product?.add_ons.length > 0 && (
                            <Typography mt="3px" variant="body2">
                              {t("Addons")}: {getAddOnsNames(product?.add_ons)}
                            </Typography>
                          )}
                        </Stack>
                        <Stack
                          direction={isSmall ? "column-reverse" : "column"}
                          gap="5px"
                        >
                          <Typography fontSize="14px" fontWeight="bold">
                            {getAmountWithSign(product?.item_details?.price)}
                          </Typography>

                          <Typography variant="body2" mt="8px">
                            {t("Qty")}: {product?.quantity}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/*{product?.variation?.length > 0 && (*/}
                      {/*    <>{getVariationNames(product, t)}</>*/}
                      {/*)}*/}
                    </Grid>

                    <CustomDivider border="1px" />
                  </Grid>
                ))}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              pl={{ xs: "0px", sm: "20px", md: "25px" }}
            >
              <CustomStackFullWidth
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Stack spacing={1}>
                  <Typography
                    fontSize={{ xs: "14px", md: "16px" }}
                    fontWeight="500"
                  >
                    {t("Address")}
                  </Typography>
                  <Typography
                    fontSize={{ xs: "12px", md: "14px" }}
                    fontWeight="400"
                    color={theme.palette.neutral[500]}
                    width="215px"
                    lineHeight="25px"
                  >
                    {trackOrderData?.delivery_address?.address}
                  </Typography>
                </Stack>
                {!isSmall && (
                  <Stack
                    sx={{
                      borderLeft: (theme) =>
                        `3px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
                      paddingLeft: "30px",

                      height: "100px",
                    }}
                  ></Stack>
                )}
                {/*<Divider orientation="vertical" />*/}
                <Stack spacing={1}>
                  <Typography
                    fontSize={{ xs: "14px", md: "16px" }}
                    fontWeight="500"
                  >
                    {t("Payment")}
                  </Typography>
                  {trackOrderData?.payment_method ? (
                    <Typography
                      fontSize={{ xs: "12px", md: "14px" }}
                      fontWeight="400"
                      color={theme.palette.neutral[500]}
                      width="215px"
                      lineHeight="25px"
                      textTransform="capitalize"
                    >
                      {t(trackOrderData?.payment_method.replaceAll("_", " "))}
                    </Typography>
                  ) : (
                    <Skeleton width="100px" variant="text" />
                  )}
                </Stack>
                {!isSmall && trackOrderData?.unavailable_item_note && (
                  <Stack
                    sx={{
                      borderLeft: (theme) =>
                        `3px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
                      paddingLeft: "30px",

                      height: "100px",
                    }}
                  ></Stack>
                )}
                {trackOrderData?.unavailable_item_note && (
                  <Stack spacing={1}>
                    <Typography
                      fontSize={{ xs: "14px", md: "16px" }}
                      fontWeight="500"
                      textTransform="capitalize"
                    >
                      {t("Unavailable item Note")}
                    </Typography>
                    <Typography
                      fontSize={{ xs: "12px", md: "14px" }}
                      fontWeight="400"
                      color={theme.palette.neutral[500]}
                      width="215px"
                      lineHeight="25px"
                      textTransform="capitalize"
                    >
                      {trackOrderData?.unavailable_item_note}
                    </Typography>
                  </Stack>
                )}
                {trackOrderData?.cutlery && (
                  <Stack
                    spacing={1}
                    sx={{ ":last-child": { marginLeft: "0px" } }}
                  >
                    <Typography
                      fontSize={{ xs: "14px", md: "16px" }}
                      fontWeight="500"
                      textTransform="capitalize"
                    >
                      {t("Cutlery")}
                    </Typography>
                    <Typography
                      fontSize={{ xs: "12px", md: "14px" }}
                      fontWeight="400"
                      color={theme.palette.neutral[500]}
                      width="215px"
                      lineHeight="25px"
                      textTransform="capitalize"
                    >
                      {t("Yes")}
                    </Typography>
                  </Stack>
                )}
              </CustomStackFullWidth>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              pl={{ xs: "0px", sm: "20px", md: "25px" }}
            >
              {trackOrderData?.delivery_instruction && (
                <InstructionBox
                  title="delivery instruction"
                  note={trackOrderData?.delivery_instruction}
                />
              )}

              {trackOrderData?.order_status === "refund_requested" && (
                <InstructionBox
                  title="refund cancellation note"
                  note={trackOrderData?.refund?.customer_reason}
                />
              )}
              {trackOrderData?.order_status === "canceled" && (
                <InstructionBox
                  title="cancellation note"
                  note={trackOrderData?.cancellation_reason}
                />
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} pl={{ xs: "0px", sm: "15px", md: "20px" }}>
            {data?.prescription_order ? (
              <PrescriptionOrderCalculation
                data={data}
                t={t}
                trackOrderData={trackOrderData}
              />
            ) : (
              <OrderCalculation
                data={data}
                t={t}
                trackOrderData={trackOrderData}
                configData={configData}
              />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

OrderSummery.propTypes = {};

export default OrderSummery;
