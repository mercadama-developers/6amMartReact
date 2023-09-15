import React from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import PaymentMethodCard from "./PaymentMethodCard";
import digitalPayment from "./assets/payment.png";
import cashOnDelivery from "./assets/cod.png";
import wallet from "./assets/paymentWallet.png";
import { PrimaryButton } from "../Map/map.style";
import LoadingButton from "@mui/lab/LoadingButton";
import { DeliveryCaption } from "./CheckOut.style";
import AllDigitalPaymentMethod from "./item-checkout/AllDigitalPaymentMethod";
import ParcelPaymentMethod from "./item-checkout/ParcelPaymentMethod";
import OtherModulePayment from "./item-checkout/OtherModulePayment";

const PaymentMethod = ({
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
}) => {
  return (
    <CustomStackFullWidth spacing={2} p="25px">
      <DeliveryCaption parcel={parcel}>{t("Payment Method")}</DeliveryCaption>

      {parcel === "true" ? (
        <ParcelPaymentMethod
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          zoneData={zoneData}
          configData={configData}
          orderType={orderType}
          parcel={parcel}
          paidBy={paidBy}
          orderPlace={orderPlace}
          isLoading={isLoading}
        />
      ) : (
        <OtherModulePayment
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          zoneData={zoneData}
          configData={configData}
          orderType={orderType}
          setOpenModel={setOpenModel}
          usePartialPayment={usePartialPayment}
          forprescription={forprescription}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default PaymentMethod;
