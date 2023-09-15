import React, { useEffect, useReducer, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { BackIconButton } from "../../profile/basic-information/BasicInformationForm";
import { t } from "i18next";
import { ACTIONS, initialState, reducer } from "../states";
import { useDispatch, useSelector } from "react-redux";
import { useGeolocated } from "react-geolocated";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import GoogleMapComponent from "../../Map/GoogleMapComponent";
import CustomMapSearch from "../../Map/CustomMapSearch";
import { Box } from "@mui/system";
import {
  handleAgreeLocation,
  handleChange,
  handleChangeForSearch,
  handleCloseLocation,
} from "../HelperFunctions";
import {
  AddressTypeStack,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import home from "../../checkout/assets/image 1256.png";
import office from "../assets/office.png";
import plusIcon from "../assets/plus.png";
import AddressForm from "./AddressForm";
import { styled } from "@mui/material/styles";
export const AddAddressSearchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: "999",
  width: "85%",
  top: "10%",
  marginLeft: "20px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "13px",
  },
}));
const AddAddressComponent = ({
  setAddAddress,
  configData,
  editAddress,
  userData,
  addressRefetch,
  setEditAddress,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addressType, setAddressType] = useState(
    editAddress ? editAddress?.address_type : ""
  );
  const [defaultLocation, setDefaultLocation] = useState({});
  //useEffect calls for getting data
  console.log({ configData });
  //****getting current location/***/
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });

  useEffect(() => {
    setDefaultLocation(configData?.default_location);
    // dispatch({
    //   type: ACTIONS.setLocation,
    //   payload: configData?.default_location,
    // });
  }, []);

  const { data: places, isLoading } = useGetAutocompletePlace(
    state.searchKey,
    state.enabled
  );
  useEffect(() => {
    if (places) {
      dispatch({ type: ACTIONS.setPredictions, payload: places?.predictions });
    }
  }, [places]);
  const { data: geoCodeResults, isFetching: isFetchingGeoCode } = useGetGeoCode(
    state.location,
    state.geoLocationEnable
  );
  useEffect(() => {
    if (geoCodeResults?.results) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: geoCodeResults?.results[0]?.formatted_address,
      });
    }
  }, [geoCodeResults, state.location]);
  const { data: zoneData } = useGetZoneId(state.location, state.zoneIdEnabled);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoneData) {
        // dispatch(setZoneData(zoneData?.data?.zone_data));
        localStorage.setItem("zoneid", zoneData?.zone_id);
      }
    }
  }, [zoneData]);
  // //********************Pick Location */
  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    state.placeId,
    state.placeDetailsEnabled
  );
  //
  useEffect(() => {
    if (placeDetails) {
      dispatch({
        type: ACTIONS.setLocation,
        payload: placeDetails?.result?.geometry?.location,
      });
    }
  }, [placeDetails]);

  // const orangeColor = theme.palette.primary.main;
  let data = {};

  useEffect(() => {
    if (state.placeDescription) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: state.placeDescription,
      });
    }
  }, [state.placeDescription]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (name) => {
    setAddressType(name);
    setEditAddress({ ...editAddress, address_type: null });
  };
  const editLocation = {
    lat: editAddress?.latitude,
    lng: editAddress?.longitude,
  };
  console.log("ffff", defaultLocation);
  return (
    <>
      <Grid item md={12} xs={12} alignSelf="center">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" fontWeight="700">
            {t("Add Address")}
          </Typography>
          <BackIconButton onClick={() => setAddAddress(false)}>
            <ArrowBackIosNewIcon
              sx={{
                fontSize: "10px",
                color: (theme) => theme.palette.primary.main,
                fontWeight: "700",
                marginRight: "3px",
              }}
            />
            {t("Go Back")}
          </BackIconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} position="relative" align="center">
        <AddAddressSearchBox>
          <CustomMapSearch
            // showCurrentLocation={state.showCurrentLocation}
            predictions={state.predictions}
            handleChange={(event, value) =>
              handleChange(event, value, dispatch)
            }
            HandleChangeForSearch={(event) =>
              handleChangeForSearch(event, dispatch)
            }
            handleAgreeLocation={() => handleAgreeLocation(coords, dispatch)}
            currentLocation={state.currentLocation}
            handleCloseLocation={() => handleCloseLocation(dispatch)}
            frommap="true"
            isLoading={isFetchingGeoCode}
          />
        </AddAddressSearchBox>
        <GoogleMapComponent
          height="309px"
          key={state.rerenderMap}
          setLocation={(values) => {
            dispatch({
              type: ACTIONS.setLocation,
              payload: editAddress ? editLocation : values,
            });
          }}
          // setCurrentLocation={setCurrentLocation}
          // locationLoading={locationLoading}
          location={editAddress ? editLocation : defaultLocation}
          setPlaceDetailsEnabled={(value) =>
            dispatch({
              type: ACTIONS.setPlaceDetailsEnabled,
              payload: value,
            })
          }
          placeDetailsEnabled={state.placeDetailsEnabled}
          locationEnabled={state.locationEnabled}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <CustomStackFullWidth mb="20px">
          <Typography>{t("Label As")}</Typography>
          <Stack direction="row" spacing={2.5} pt="10px">
            <AddressTypeStack
              value="home"
              addressType={
                editAddress?.address_type
                  ? editAddress?.address_type
                  : addressType
              }
              onClick={() => handleClick("home")}
            >
              <CustomImageContainer src={home.src} width="24px" height="24px" />
            </AddressTypeStack>
            <AddressTypeStack
              value="office"
              addressType={
                editAddress?.address_type
                  ? editAddress?.address_type
                  : addressType
              }
              onClick={() => handleClick("office")}
            >
              <CustomImageContainer
                src={office.src}
                width="24px"
                height="24px"
              />
            </AddressTypeStack>
            <AddressTypeStack
              value="other"
              addressType={
                editAddress?.address_type
                  ? editAddress?.address_type
                  : addressType
              }
              onClick={() => handleClick("other")}
            >
              <CustomImageContainer
                src={plusIcon.src}
                width="24px"
                height="24px"
              />
            </AddressTypeStack>
          </Stack>
        </CustomStackFullWidth>
        <AddressForm
          deliveryAddress={
            editAddress
              ? editAddress?.address
              : geoCodeResults?.results[0]?.formatted_address
          }
          atModal="false"
          addressType={addressType}
          configData={configData}
          phone={userData?.phone}
          lat={editAddress ? editAddress?.latitude : state.location?.lat || ""}
          lng={editAddress ? editAddress?.longitude : state.location?.lng || ""}
          personName={
            editAddress
              ? editAddress?.contact_person_name
              : `${userData?.f_name} ${userData?.l_name}`
          }
          editAddress={editAddress}
          refetch={addressRefetch}
        />
      </Grid>
    </>
  );
};

export default AddAddressComponent;
