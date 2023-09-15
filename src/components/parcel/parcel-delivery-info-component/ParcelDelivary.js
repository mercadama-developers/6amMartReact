import React, { useEffect, useState } from "react";
import { CustomContainer } from "../../footer/Footer.style";
import { Stack } from "@mui/system";
import H1 from "../../typographies/H1";
import { Grid } from "@mui/material";
import SenderInfoForm from "./SenderInfoForm";
import ReceiverInfoFrom from "./ReceiverInfoFrom";
import ParcelInfo from "./ParcelInfo";
import { useFormik } from "formik";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { useRouter } from "next/router";
import { useGeolocated } from "react-geolocated";
import ValidationSchema from "./ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { setParcelData } from "../../../redux/slices/parcelDeliveryInfo";
import toast from "react-hot-toast";
import { t } from "i18next";

const PercelDelivery = ({ configData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { parcelCategories } = useSelector((state) => state.parcelCategories);
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const [senderLocation, setSenderLocation] = useState({});
  const [senderFormattedAddress, setSenderFormattedAddress] = useState("");
  const [receiverLocation, setReceiverLocation] = useState({});
  const [receiverFormattedAddress, setReceiverFormattedAddress] = useState("");
  let token = undefined;
  if (typeof window !== undefined) {
    token = localStorage.getItem("token");
  }

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });

  const addAddressFormik = useFormik({
    initialValues: {
      senderName: profileInfo?.f_name ? profileInfo?.f_name : "",
      senderPhone: "",
      receiverName: "",
      receiverPhone: "",
      senderRoad: "",
      senderHouse: "",
      senderFloor: "",
      road: "",
      house: "",
      floor: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: async (values, helpers) => {
      await formSubmitHandler(values);
    },
  });
  useEffect(() => {
    const currentLocationLatLng = JSON.parse(
      localStorage.getItem("currentLatLng")
    );
    const currentLocation = localStorage.getItem("location");
    setSenderLocation(currentLocationLatLng);
    setSenderFormattedAddress(currentLocation);
  }, []);

  useEffect(() => {
    addAddressFormik.setFieldValue("senderPhone", profileInfo?.phone);
  }, [profileInfo?.phone]);

  const senderNameHandler = (value) => {
    addAddressFormik.setFieldValue("senderName", value);
  };
  const senderPhoneHandler = (value) => {
    addAddressFormik.setFieldValue("senderPhone", value);
  };
  const receiverNameHandler = (value) => {
    addAddressFormik.setFieldValue("receiverName", value);
  };
  const receiverPhoneHandler = (value) => {
    addAddressFormik.setFieldValue("receiverPhone", value);
  };
  const roadHandler = (value) => {
    addAddressFormik.setFieldValue("road", value);
  };
  const houseHandler = (value) => {
    addAddressFormik.setFieldValue("house", value);
  };
  const floorHandler = (value) => {
    addAddressFormik.setFieldValue("floor", value);
  };
  const senderRoadHandler = (value) => {
    addAddressFormik.setFieldValue("senderRoad", value);
  };
  const senderHouseHandler = (value) => {
    addAddressFormik.setFieldValue("senderHouse", value);
  };
  const senderFloorHandler = (value) => {
    addAddressFormik.setFieldValue("senderFloor", value);
  };

  const formSubmitHandler = (values) => {
    const tempValue = {
      ...values,
      senderLocations: senderLocation,
      senderAddress: senderFormattedAddress,
      receiverLocations: receiverLocation,
      receiverAddress: receiverFormattedAddress,
      name: parcelCategories?.name,
      image: parcelCategories?.image,
      description: parcelCategories?.description,
    };
    if (senderLocation && receiverLocation) {
      dispatch(setParcelData(tempValue));
      if (token) {
        router.push(
          {
            pathname: "/checkout",
            query: { page: "parcel" },
          },
          undefined,
          { shallow: true }
        );
      } else {
        toast.error("please login first");
      }
    } else {
      toast.error(t("Sender or Receiver location is missing"));
    }
  };
  const handleSenderLocation = (location, currentLocation) => {
    setSenderLocation(location);
    setSenderFormattedAddress(currentLocation);
  };
  const handleReceiverLocation = (location, currentLocation) => {
    setReceiverLocation(location);
    setReceiverFormattedAddress(currentLocation);
  };

  return (
    <CustomStackFullWidth
      paddingBottom={{ xs: "20px", sm: "20px", md: "80px" }}
      pt="1.5rem"
    >
      <Stack paddingBottom="30px">
        <H1
          text="Parcel Delivery Information"
          textAlign="left"
          fontWeight="600"
        />
      </Stack>
      <form noValidate onSubmit={addAddressFormik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <SenderInfoForm
              addAddressFormik={addAddressFormik}
              senderNameHandler={senderNameHandler}
              senderPhoneHandler={senderPhoneHandler}
              coords={coords}
              configData={configData}
              senderFormattedAddress={senderFormattedAddress}
              handleLocation={handleSenderLocation}
              setSenderFormattedAddress={setSenderFormattedAddress}
              setSenderLocation={setSenderLocation}
              senderRoadHandler={senderRoadHandler}
              senderHouseHandler={senderHouseHandler}
              senderFloorHandler={senderFloorHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <ReceiverInfoFrom
              addAddressFormik={addAddressFormik}
              receiverNameHandler={receiverNameHandler}
              receiverPhoneHandler={receiverPhoneHandler}
              roadHandler={roadHandler}
              houseHandler={houseHandler}
              floorHandler={floorHandler}
              coords={coords}
              handleLocation={handleReceiverLocation}
              receiverFormattedAddress={receiverFormattedAddress}
              setReceiverLocation={setReceiverLocation}
              setReceiverFormattedAddress={setReceiverFormattedAddress}
              configData={configData}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <ParcelInfo parcelCategories={parcelCategories} />
          </Grid>
        </Grid>
      </form>
    </CustomStackFullWidth>
  );
};

export default PercelDelivery;
