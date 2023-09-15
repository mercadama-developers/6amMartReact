import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  CustomStackFullWidth,
  UserInfoGrid,
} from "../../styled-components/CustomStyles.style";
import UserDashBoard from "./UserDashBoard";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import testImage from "../../public/static/profile/pro.png";
import UserDetails from "./UserDetails";
import BodySection from "./BodySection";
import { setWalletAmount } from "../../redux/slices/cart";
import { setUser } from "../../redux/slices/profileInfo";
import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
import { useDispatch } from "react-redux";
import CustomContainer from "../container";

const UserInformation = ({ page, configData, orderId }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const handleSuccess = (res) => {
    localStorage.setItem("wallet_amount", res?.wallet_balance);
    dispatch(setWalletAmount(res?.wallet_balance));
    dispatch(setUser(res));
  };
  const { data, refetch, isLoading } = useGetUserInfo(handleSuccess);
  return (
    <CustomStackFullWidth>
      <Grid container gap="10px">
        <UserInfoGrid container item xs={12} sm={12} md={12} page={page}>
          <CustomContainer>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              gap="1rem"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                marginTop={{
                  xs: page ? "21px" : "28px",
                  sm: "28px",
                  md: "18px",
                }}
                paddingBottom={{ xs: page === "inbox" ? "10px" : "0px" }}
              >
                <UserDetails data={data} page={page} />
              </Grid>
              {isSmall ? (
                page === "profile-settings" && (
                  <UserDashBoard data={data} isLoading={isLoading} />
                )
              ) : (
                <UserDashBoard data={data} isLoading={isLoading} />
              )}
            </Stack>
          </CustomContainer>
        </UserInfoGrid>
        <Grid item xs={12} sm={12} md={12}>
          <CustomContainer>
            <BodySection
              page={page}
              configData={configData}
              orderId={orderId}
            />
          </CustomContainer>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default UserInformation;
