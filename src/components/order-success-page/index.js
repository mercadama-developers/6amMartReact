import React from "react";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import SuccessCard from "../checkout/SuccessCard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import CheckoutFailed from "../checkout/CheckoutFailed";

const OrderSuccessPage = ({ configData }) => {
  const router = useRouter();
  const { status, totalAmount, order_id } = router.query;
  const { t } = useTranslation();
  const { total } = router.query;
  return (
    <>
      {router.isReady && (
        <Stack
          width="100%"
          height="100%"
          mb="3rem"
          alignItems="center"
          justifyContent="center"
          mt="1rem"
        >
          <CustomPaperBigCard>
            {(status && status === "fail") || status === "cancel" ? (
              <CheckoutFailed id={order_id} configData={configData} />
            ) : (
              <SuccessCard configData={configData} total={total} />
            )}
          </CustomPaperBigCard>
        </Stack>
      )}
    </>
  );
};

export default OrderSuccessPage;
