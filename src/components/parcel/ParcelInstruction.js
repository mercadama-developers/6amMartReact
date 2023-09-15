import React from "react";
import { Step, StepLabel, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { CustomStepperStyled } from "../track-order/trackOrder.style";

const ParcelInstruction = ({ steps, theme }) => {
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CustomStepperStyled
      orientation="vertical"
      width={isSmall ? "32px" : "45px"}
      height={isSmall ? "32px" : "45px"}
      border="0px"
      color={theme.palette.primary.main}
      marginLeft={isSmall ? "27px" : "2rem"}
      marginTop={isSmall ? ".5rem" : "2rem"}
      connectorHeight="80px"
      parcel="true"
    >
      {steps?.map((step, index) => (
        <Step key={index}>
          <StepLabel>
            <Stack>
              <Typography
                fontSize={{ xs: "14px", sm: "16", md: "20px" }}
                fontWeight="600"
              >
                {step?.label}
              </Typography>
              <Typography fontSize={{ xs: "12px", sm: "14px", md: "14px" }}>
                {step?.description}
              </Typography>
            </Stack>
          </StepLabel>
        </Step>
      ))}
    </CustomStepperStyled>
  );
};

export default ParcelInstruction;
