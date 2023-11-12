import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import {
  Button,
  Grid,
  NoSsr,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import CustomEmptyResult from "../custom-empty-result";
import nodata from "../loyalty-points/assets/Search.svg";
import useGetAddressList from "../../api-manage/hooks/react-query/address/useGetAddressList";
import AddNewAddress from "./add-new-address";
import { Skeleton } from "@mui/material";
import Shimmer from "./Shimmer";
import AddressCard from "./address-card";
import AddNewAddressButton from "./add-new-address/AddNewAddressButton";
import { useDispatch, useSelector } from "react-redux";
import { CustomTypography } from "../home/PromotionalBanner";
import { t } from "i18next";
import { setOpenAddressModal } from "../../redux/slices/addAddress";
import CustomImageContainer from "../CustomImageContainer";
import editIcon from "../profile/asset/editIcon.png";
import { SmallDeviceIconButton } from "../profile/basic-information";
import { useTheme } from "@emotion/react";
import { setAllSaveAddress } from "../../redux/slices/storedData";
export const GrayButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral[400],
  fontSize: "12px",
  border: "1px solid",
  borderColor: theme.palette.neutral[400],
  borderRadius: "5px",
}));
const Address = (props) => {
  const {
    configData,
    setAddAddress,
    addAddress,
    setEditAddress,
    data,
    refetch,
    isLoading,
  } = props;
  const { AllSaveAddress } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { openAddressModal } = useSelector((state) => state.addressModel);

  const [edit, setEdit] = useState(null);
  useEffect(() => {
    if (AllSaveAddress?.length === 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setAllSaveAddress(data?.addresses));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClick = () => {
    setEditAddress(null);
    setAddAddress((prvState) => !prvState);
  };

  return (
    <CustomStackFullWidth
      padding={{ xs: "10px", sm: "15px", md: "20px" }}
      spacing={2}
    >
      <CustomStackFullWidth
        justifyContent="space-between"
        direction="row"
        alignItems="center"
      >
        <Typography
          fontSize={{ xs: "14px", sm: "14px", md: "16px" }}
          fontWeight="700"
        >
          {t("My Addresses")}
        </Typography>

        <Stack>
          {isSmall ? (
            <SmallDeviceIconButton onClick={handleClick}>
              <LocationOnIcon style={{ fontSize: "16px" }} />
            </SmallDeviceIconButton>
          ) : (
            <GrayButton
              onClick={handleClick}
              variant="outlined"
              startIcon={<LocationOnIcon style={{ fontSize: "16px" }} />}
            >
              {t("Add Address")}
            </GrayButton>
          )}

          {/*{!edit && (*/}
          {/*  <AddNewAddress*/}
          {/*    refetch={refetch}*/}
          {/*    t={t}*/}
          {/*    configData={configData}*/}
          {/*    openAddressModal={openAddressModal}*/}
          {/*  />*/}
          {/*)}*/}
        </Stack>
      </CustomStackFullWidth>
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2.5 }}>
        <Grid item xs={12} md={12}>
          <NoSsr>
            {isLoading ? (
              <Shimmer />
            ) : AllSaveAddress && AllSaveAddress?.length > 0 ? (
              <Box>
                <Grid container>
                  {AllSaveAddress?.map((item, index) => {
                    return (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        paddingRight={{ xs: "10px", sm: "15px", md: "25px" }}
                        paddingBottom={{ xs: "10px", sm: "15px", md: "25px" }}
                      >
                        <AddressCard
                          item={item}
                          refetch={refetch}
                          configData={configData}
                          dispatch={dispatch}
                          openAddressModal={openAddressModal}
                          setEditAddress={setEditAddress}
                          edit={edit}
                          setAddAddress={setAddAddress}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ) : (
              <Stack
                width="100%"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <CustomEmptyResult
                  label="No Address Found"
                  image={nodata}
                  width="128px"
                  height="128px"
                />
              </Stack>
            )}
          </NoSsr>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

Address.propTypes = {};

export default Address;
