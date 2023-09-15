import React from "react";
import {
  Card,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Stack } from "@mui/system";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

const PaymentMethodCard = (props) => {
  const {
    image,
    description,
    type,
    paymentMethod,
    setPaymentMethod,
    paymentType,
    paidBy,
    parcel,
    digitalPaymentMethodActive,
    imageUrl,
  } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = () => {
    setPaymentMethod(type);
  };

  const radioLabel = () => {
    return (
      <Stack
        direction="row"
        gap="16px"
        alignItems="center"
        paddingLeft={{ xs: "5px", sm: "5px", md: "10px" }}
      >
        {parcel === "true" ? (
          <CustomImageContainer
            src={
              digitalPaymentMethodActive ? `${imageUrl}/${image}` : image.src
            }
            width="32px"
            height="32px"
            objectfit="contain"
            borderRadius="50%"
          />
        ) : (
          !isSmall && (
            <CustomImageContainer
              width="32px"
              height="32px"
              objectfit="contain"
              borderRadius="50%"
              src={
                digitalPaymentMethodActive ? `${imageUrl}/${image}` : image.src
              }
            />
          )
        )}

        <Typography
          fontWeight={parcel === "true" ? "400" : "500"}
          fontSize={{ xs: "12px", sm: "12px", md: "16px" }}
        >
          {paymentType}
        </Typography>
      </Stack>
    );
  };
  return (
    <Stack>
      <FormControl
        sx={{ marginRight: { xs: "0px" }, marginLeft: { xs: "5px" } }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value={type}
            control={
              <Radio
                sx={{ padding: { xs: "2px" } }}
                checked={paymentMethod === type}
              />
            }
            label={radioLabel()}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default PaymentMethodCard;
