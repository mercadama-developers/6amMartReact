import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, Step, StepContent, StepLabel, Typography } from "@mui/material";
import { t } from "i18next";
import HowToUse from "../wallet/HowToUse";
import { CustomStepperStyled } from "../track-order/trackOrder.style";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";
import ParcelInstruction from "./ParcelInstruction";
import InstructionVideo from "./InstructionVideo";

const ParcelVideo = () => {
  const theme = useTheme();
  const steps = [
    {
      label: "Select the service",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec tellus ex.",
    },
    {
      label: "Fill in the information",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec tellus ex.",
    },
    {
      label: "And now wait for the delivery!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec tellus ex.",
    },
  ];
  return (
    <CustomStackFullWidth mt={{ xs: "20px", sm: "30px", md: "50px" }}>
      <Typography
        fontSize={{ xs: "16px", sm: "18px", md: "22px" }}
        fontWeight="700"
        textAlign={{ xs: "center", sm: "left", md: "left" }}
      >
        {t("Easiest way to get services")}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={7}>
          <InstructionVideo />
        </Grid>
        <Grid item xs={12} sm={6} md={5} pl={{ xs: "5px" }}>
          <ParcelInstruction steps={steps} theme={theme} />
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default ParcelVideo;
