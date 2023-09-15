import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import PaymentMethodCard from "../PaymentMethodCard";
import { t } from "i18next";
import cashOnDelivery from "../assets/cod.png";
import wallet from "../assets/paymentWallet.png";
import digitalPayment from "../assets/payment.png";
import LoadingButton from "@mui/lab/LoadingButton";

const ParcelPaymentMethod = (props) => {
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
  } = props;
  return (
    <CustomStackFullWidth
      sx={{ height: { xs: "200px", sm: "300px", md: "400px" } }}
      justifyContent="space-between"
    >
      <CustomStackFullWidth
        direction={parcel === "true" ? "column" : "row"}
        sx={{
          flexWrap: "wrap",
          gap: {
            xs: parcel === "true" ? "16px" : "0px",
            sm: parcel === "true" ? "16px" : "0px",
            md: "16px",
          },
        }}
      >
        <>
          {" "}
          {zoneData?.data?.zone_data?.[0]?.cash_on_delivery && (
            <PaymentMethodCard
              parcel={parcel}
              paymentType={t("Cash on delivery")}
              image={cashOnDelivery}
              type="cash_on_delivery"
              description={t("Faster and safer way to send money")}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paidBy={paidBy}
            />
          )}
          {configData?.customer_wallet_status === 1 &&
            paidBy !== "receiver" &&
            forprescription !== "true" && (
              <PaymentMethodCard
                parcel={parcel}
                paymentType={t("Wallet Payment")}
                image={wallet}
                type="wallet"
                description={t("Faster and safer way to send money")}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paidBy={paidBy}
              />
            )}
          {/*{zoneData?.data?.zone_data?.[0]?.digital_payment &&*/}
          {/*  paidBy !== "receiver" &&*/}
          {/*  forprescription !== "true" &&*/}
          {/*  configData?.digital_payment_info?.digital_payment &&*/}
          {/*  configData?.digital_payment_info?.default_payment_gateways && (*/}
          {/*    <PaymentMethodCard*/}
          {/*      parcel={parcel}*/}
          {/*      paymentType={t("Digital Payment")}*/}
          {/*      image={digitalPayment}*/}
          {/*      type="digital_payment"*/}
          {/*      description={t("Faster and safer way to send money")}*/}
          {/*      paymentMethod={paymentMethod}*/}
          {/*      setPaymentMethod={setPaymentMethod}*/}
          {/*      paidBy={paidBy}*/}
          {/*    />*/}
          {/*  )}*/}
          {zoneData?.data?.zone_data?.[0]?.digital_payment &&
            paidBy !== "receiver" &&
            forprescription !== "true" &&
            configData?.digital_payment_info?.digital_payment && (
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
                      digitalPaymentMethodActive={
                        configData?.digital_payment_info?.digital_payment
                      }
                      imageUrl={configData?.base_urls?.gateway_image_url}
                    />
                  );
                })}
              </>
            )}
        </>
      </CustomStackFullWidth>
      {paidBy && (
        <CustomStackFullWidth>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={orderPlace}
            loading={isLoading}
          >
            {t("Confirm Parcel Request")}
          </LoadingButton>
          {/*<PrimaryButton fullwidth="true">*/}
          {/*  {t("Confirm Parcel Request")}*/}
          {/*</PrimaryButton>*/}
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );
};

export default ParcelPaymentMethod;
