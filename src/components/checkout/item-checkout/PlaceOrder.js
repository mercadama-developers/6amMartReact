import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { ConditionTypography } from "../CheckOut.style";
import { useTranslation } from "react-i18next";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
// import { CustomTypographyGray } from '../../error/Errors.style'
// import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import Link from "next/link";
import { useTheme } from "@emotion/react";

const PlaceOrder = (props) => {
  const { placeOrder, orderLoading, zoneData } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const primaryColor = theme.palette.primary.main;
  return (
    <CustomStackFullWidth alignItems="center" spacing={2} mt=".5rem">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={
            <CustomTypography fontSize="12px">
              {t(`I agree that placing the order places me under`)}{" "}
              <Link
                href="/terms-and-conditions"
                style={{ color: primaryColor }}
              >
                {t("Terms and Conditions")}
              </Link>{" "}
              {t("&")}
              <Link href="/privacy-policy" style={{ color: primaryColor }}>
                {" "}
                {t("Privacy Policy")}
              </Link>
            </CustomTypography>
          }
        />
      </FormGroup>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        onClick={placeOrder}
        loading={orderLoading}
        disabled={!checked}
      >
        {t("Place Order")}
      </LoadingButton>
    </CustomStackFullWidth>
  );
};

PlaceOrder.propTypes = {};

export default PlaceOrder;
