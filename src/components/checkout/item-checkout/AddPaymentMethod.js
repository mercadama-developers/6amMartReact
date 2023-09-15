import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack, styled } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { alpha, Typography } from "@mui/material";
import { t } from "i18next";
import InfoIcon from "@mui/icons-material/Info";
import { DeliveryCaption } from "../CheckOut.style";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTheme } from "@emotion/react";
import CustomModal from "../../modal";
import PaymentMethod from "../PaymentMethod";

const PaymentMethodBox = styled(CustomStackFullWidth)(({ theme }) => ({
  borderRadius: "5px",
  border: "1px solid",
  borderColor: theme.palette.warning.light,
  boxShadow: "px 3px 20px -5px rgba(3, 157, 85, 0.10)",
  padding: "15px",
  alignItems: "center",
  background: theme.palette.neutral[100],
  cursor: "pointer",
}));

const AddPaymentMethod = (props) => {
  const {
    setPaymentMethod,
    paymentMethod,
    zoneData,
    configData,
    orderType,
    usePartialPayment,
    forprescription,
  } = props;
  const [openModal, setOpenModel] = useState(false);
  const theme = useTheme();
  const handleClick = () => {
    setOpenModel(true);
  };
  return (
    <CustomStackFullWidth spacing={2}>
      <DeliveryCaption const id="demo-row-radio-buttons-group-label">
        {t("Payment Method")}
      </DeliveryCaption>
      <PaymentMethodBox
        direction="row"
        justifyContent="space-between"
        onClick={handleClick}
      >
        {paymentMethod ? (
          <Typography
            fontSize="12px"
            fontWeight="500"
            color={theme.palette.primary.main}
            textTransform="capitalize"
          >
            {paymentMethod.replaceAll("_", " ")}
          </Typography>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddCircleOutlineIcon
              style={{ width: "20px", height: "20px" }}
              color="primary"
            />
            <Typography
              fontSize="12px"
              fontWeight="500"
              color={theme.palette.primary.main}
            >
              {t("Add Payment Method")}
            </Typography>
            <InfoIcon color="error" style={{ width: "16px", height: "16px" }} />
          </Stack>
        )}

        <BorderColorIcon
          style={{ width: "20px", height: "20px" }}
          color="primary"
        />
      </PaymentMethodBox>
      {openModal && (
        <CustomModal
          openModal={openModal}
          handleClose={() => setOpenModel(false)}
        >
          <PaymentMethod
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            zoneData={zoneData}
            configData={configData}
            orderType={orderType}
            usePartialPayment={usePartialPayment}
            setOpenModel={setOpenModel}
            forprescription={forprescription}
          />
        </CustomModal>
      )}
    </CustomStackFullWidth>
  );
};

export default AddPaymentMethod;
