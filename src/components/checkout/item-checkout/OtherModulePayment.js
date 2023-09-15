import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { alpha, Button, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { t } from "i18next";
import CustomImageContainer from "../../CustomImageContainer";
import money from "../assets/money.png";
import wallet from "../assets/wallet .png";
import PaymentMethodCard from "../PaymentMethodCard";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import { PrimaryButton } from "../../Map/map.style";
const PayButton = styled(Button)(({ theme, value, paymentMethod }) => ({
  padding: "15px 15px",
  gap: "5px",
  border: "1px solid",
  borderColor: alpha(theme.palette.neutral[400], 0.4),
  color:
    value === paymentMethod
      ? theme.palette.neutral[100]
      : theme.palette.neutral[1000],
  background: value === paymentMethod && theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.neutral[1000],
    background: value === paymentMethod && theme.palette.primary.main,
  },
}));
const OtherModulePayment = (props) => {
  const {
    paymentMethod,
    setPaymentMethod,
    paidBy,
    orderPlace,
    isLoading,
    zoneData,
    forprescription,
    configData,
    orderType,
    parcel,
    setOpenModel,
    usePartialPayment,
  } = props;

  const handleClick = (item) => {
    setPaymentMethod(item);
  };
  return (
    <CustomStackFullWidth spacing={1.5}>
      <Stack>
        <Typography fontSize="12px" fontWeight="500">
          {t("Choose Payment Method")}
        </Typography>
        <Typography fontSize="10px">{t("(Choose Payment Method)")}</Typography>
      </Stack>
      <CustomStackFullWidth
        direction="row"
        spacing={1.7}
        sx={{ flexWrap: "wrap" }}
      >
        {zoneData?.data?.zone_data?.[0]?.cash_on_delivery &&
        (configData?.partial_payment_method === "both" ||
          configData?.partial_payment_method === "cod") ? (
          <PayButton
            value="cash_on_delivery"
            paymentMethod={paymentMethod}
            onClick={() => handleClick("cash_on_delivery")}
          >
            <CustomImageContainer
              src={money.src}
              width="20px"
              height="20px"
              alt="cod"
            />
            <Typography fontSize="12px">{t("Pay after service")}</Typography>
          </PayButton>
        ) : null}
        {configData?.customer_wallet_status === 1 &&
          forprescription !== "true" && (
            <PayButton
              onClick={() => handleClick("wallet")}
              value="wallet"
              paymentMethod={paymentMethod}
              disabled={usePartialPayment}
            >
              <CustomImageContainer
                src={wallet.src}
                width="20px"
                height="20px"
                alt="cod"
              />
              <Typography fontSize="12px">{t("Pay via Wallet")}</Typography>
            </PayButton>
          )}

        {/*{zoneData?.data?.zone_data?.[0]?.digital_payment &&*/}
        {/*  forprescription !== "true" &&*/}
        {/*  configData?.digital_payment_info?.digital_payment &&*/}
        {/*  configData?.digital_payment_info?.default_payment_gateways &&*/}
        {/*  (configData?.partial_payment_method === "digital_payment" ||*/}
        {/*    configData?.partial_payment_method === "both") && (*/}
        {/*    <PayButton*/}
        {/*      value="digital_payment"*/}
        {/*      paymentMethod={paymentMethod}*/}
        {/*      onClick={() => handleClick("digital_payment")}*/}
        {/*    >*/}
        {/*      <CustomImageContainer*/}
        {/*        src={money.src}*/}
        {/*        width="20px"*/}
        {/*        height="20px"*/}
        {/*        alt="cod"*/}
        {/*      />*/}
        {/*      <Typography fontSize="12px">{t("Pay after service")}</Typography>*/}
        {/*    </PayButton>*/}
        {/*  )}*/}
      </CustomStackFullWidth>
      <CustomStackFullWidth spacing={2.4}>
        <Typography fontSize="12px" fontWeight="500">
          {t("Payment Methods")}
          <Typography component="span" fontSize="8px" ml="5px">
            {t("(Faster & secure way to pay bill)")}
          </Typography>
        </Typography>
        <CustomStackFullWidth spacing={1}>
          {zoneData?.data?.zone_data?.[0]?.digital_payment &&
            paidBy !== "receiver" &&
            forprescription !== "true" &&
            configData?.digital_payment_info?.digital_payment &&
            (configData?.partial_payment_method === "digital_payment" ||
              configData?.partial_payment_method === "both") && (
              <>
                {configData?.active_payment_method_list?.map((item, index) => {
                  return (
                    <PaymentMethodCard
                      key={index}
                      parcel={parcel}
                      paymentType={item?.gateway_title}
                      image={item?.gateway_image}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      paidBy={paidBy}
                      type={item?.gateway}
                      imageUrl={configData?.base_urls?.gateway_image_url}
                      digitalPaymentMethodActive={
                        configData?.digital_payment_info?.digital_payment
                      }
                    />
                  );
                })}
              </>
            )}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
      <PrimaryButton onClick={() => setOpenModel(false)}>
        {t("Select")}
      </PrimaryButton>
    </CustomStackFullWidth>
  );
};

export default OtherModulePayment;
