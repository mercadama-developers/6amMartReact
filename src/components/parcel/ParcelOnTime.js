import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomBoxFullWidth } from "../chat/Chat.style";
import { alpha, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { t } from "i18next";
import CustomContainer from "../container";
import onTimeImage from "./asset/onTimeImage.png";
import CustomImageContainer from "../CustomImageContainer";
import { TrackButton } from "./TrackParcelFromHomePage";
import { useTheme } from "@mui/material/styles";

const BgBox = styled(CustomBoxFullWidth)(({ theme }) => ({
  height: "353px",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.whiteContainer.main,
    0.2
  )} 0%, ${alpha(theme.palette.primary.light, 0.2)} 33.33%, ${alpha(
    theme.palette.primary.main,
    0.2
  )} 66.67%, ${alpha(theme.palette.whiteContainer.main, 0.2)}100%)`,
  [theme.breakpoints.down("sm")]: {
    height: "113px",
  },
}));

const ParcelOnTime = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <BgBox>
      <CustomContainer>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6} sm={6} md={7} align="center">
            <Stack
              maxWidth="500px"
              width="100%"
              spacing={{ xs: 0, sm: 0.5, md: 1 }}
            >
              <Typography
                fontSize={{ xs: "10px", sm: "30px", md: "35px" }}
                fontWeight="600"
                textAlign="left"
                lineHeight={{ xs: "13px", sm: "35px", md: "45px" }}
              >
                {t("Parcel Delivered On Time with no Hassle")}
              </Typography>
              <Typography
                fontSize={{ xs: "7px", sm: "16px", md: "20px" }}
                textAlign="left"
                lineHeight={{ xs: "9px", sm: "23px", md: "28px" }}
              >
                {t(
                  "Send or received your parcel anywhere in the country instantly with the safest hands!"
                )}
              </Typography>
              <Stack
                pt={{ xs: "3px", sm: "5px", md: "9px" }}
                alignItems="flex-start"
              >
                <TrackButton
                  variant="contained"
                  fontSize="6px"
                  smPadding="4px 8px"
                  minWidth="0px"
                >
                  Track Order
                </TrackButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={6} md={5} align="right">
            {" "}
            <Stack width="100%" maxWidth="453px" maxHeight="307px">
              <CustomImageContainer
                src={onTimeImage.src}
                width="100%"
                height={isSmall ? "99px" : "100%"}
                objectfit="contain"
              />
            </Stack>
          </Grid>
        </Grid>
      </CustomContainer>
    </BgBox>
  );
};

export default ParcelOnTime;
