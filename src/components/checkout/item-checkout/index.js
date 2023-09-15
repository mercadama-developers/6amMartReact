import React, { useEffect, useReducer, useState } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import DeliveryDetails from "./DeliveryDetails";
import useGetStoreDetails from "../../../api-manage/hooks/react-query/store/useGetStoreDetails";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getDayNumber,
  getFinalTotalPrice,
  getInfoFromZoneData,
  getProductDiscount,
  getTaxableTotalPrice,
  getVariation,
  handleDistance,
  isAvailable,
  isFoodAvailableBySchedule,
} from "../../../utils/CustomFunctions";
import { today, tomorrow } from "../../../utils/formatedDays";
import { GoogleApi } from "../../../api-manage/hooks/react-query/googleApi";
import { useMutation, useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-manage/api-error-response/ErrorResponses";
import { toast } from "react-hot-toast";
import Router from "next/router";
import { OrderApi } from "../../../api-manage/another-formated-api/orderApi";
import { ProfileApi } from "../../../api-manage/another-formated-api/profileApi";
import RestaurantScheduleTime from "./RestaurantScheduleTime";
import HaveCoupon from "./HaveCoupon";
import DeliveryManTip from "../DeliveryManTip";
import { CouponTitle } from "../CheckOut.style";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import OrderSummaryDetails from "./OrderSummaryDetails";
import OrderCalculationShimmer from "./OrderCalculationShimmer";
import OrderCalculation from "./OrderCalculation";
import PaymentMethod from "../PaymentMethod";
import PlaceOrder from "./PlaceOrder";
import { baseUrl } from "../../../api-manage/MainApi";
import { cod_exceeds_message } from "../../../utils/toasterMessages";
import {
  setClearCart,
  setRemoveItemFromCart,
} from "../../../redux/slices/cart";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import SinglePrescriptionUpload from "../Prescription/SinglePrescriptionUpload";
import useGetVehicleCharge from "../../../api-manage/hooks/react-query/order-place/useGetVehicleCharge";
import { getStoresOrRestaurants } from "../../../helper-functions/getStoresOrRestaurants";
import moment from "moment/moment";
import CheckoutStepper from "./CheckoutStepper";
import { INITIAL_STATE, scheduleReducer } from "./ScheduleReducer";
import { useTheme } from "@emotion/react";
import useGetMostTrips from "../../../api-manage/hooks/react-query/useGetMostTrips";
import PartialPayment from "./PartialPayment";
import CustomModal from "../../modal";
import PartialPaymentModal from "./PartialPaymentModal";
import AddPaymentMethod from "./AddPaymentMethod";
import Cutlery from "./Cutlery";
import ItemSelectWithChip from "../../ItemSelectWithChip";
import { deliveryInstructions, productUnavailableData } from "./demoData";

const ItemCheckout = (props) => {
  const { configData, router, page, cartList, campaignItemList, totalAmount } =
    props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [orderType, setOrderType] = useState("delivery");
  const [payableAmount, setPayableAmount] = useState(null);
  const [address, setAddress] = useState(undefined);
  const { couponInfo } = useSelector((state) => state.profileInfo);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [numberOfDay, setDayNumber] = useState(getDayNumber(today));
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [scheduleAt, setScheduleAt] = useState("now");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total_order_amount, setTotalOrderAmount] = useState(0);
  const [enabled, setEnabled] = useState(cartList?.length ? true : false);
  const [deliveryTip, setDeliveryTip] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isImageSelected, setIsImageSelected] = useState([]);
  const [cutlery, setCutlery] = useState(0);
  const [unavailable_item_note, setUnavailable_item_note] = useState(null);
  const [delivery_instruction, setDelivery_instruction] = useState(null);
  const [usePartialPayment, setUsePartialPayment] = useState(false);
  const [switchToWallet, setSwitchToWallet] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPartialModel, setOpenPartialModel] = useState(false);
  const [state, customDispatch] = useReducer(scheduleReducer, INITIAL_STATE);
  const { profileInfo } = useSelector((state) => state.profileInfo);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentModuleType = getCurrentModuleType();
  const storeId =
    page === "campaign"
      ? campaignItemList?.[0]?.store_id
      : cartList?.[0]?.store_id;
  const { data: storeData, refetch } = useGetStoreDetails(storeId);
  const { data: tripsData } = useGetMostTrips();

  useEffect(() => {
    refetch();
  }, [storeId]);

  useEffect(() => {
    const currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
    const location = localStorage.getItem("location");
    setAddress({
      ...currentLatLng,
      latitude: currentLatLng?.lat,
      longitude: currentLatLng?.lng,
      address: location,
      address_type: "Selected Address",
    });
    refetch();
  }, []);
  const currentLatLng = JSON.parse(
    window.localStorage.getItem("currentLatLng")
  );
  const { data: zoneData } = useQuery(
    ["zoneId", location],
    async () => GoogleApi.getZoneId(currentLatLng),
    {
      retry: 1,
    }
  );
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (zoneData) {
  //       localStorage.setItem("zoneid", zoneData?.data?.zone_id);
  //       const isCOD = zoneData?.data?.zone_data?.some(
  //         (item) => item.cash_on_delivery
  //       );
  //       if (isCOD) {
  //         setPaymentMethod("cash_on_delivery");
  //       } else {
  //         setPaymentMethod("digital_payment");
  //       }
  //     }
  //   }
  // }, [zoneData]);

  const { data: distanceData, refetch: refetchDistance } = useQuery(
    ["get-distance", storeData, address],
    () => GoogleApi.distanceApi(storeData, address),
    {
      enabled: false,
      onError: onErrorResponse,
    }
  );
  const tempDistance = handleDistance(
    distanceData?.data?.rows?.[0]?.elements,
    { latitude: storeData?.latitude, longitude: storeData?.longitude },
    address
  );

  const {
    data: extraCharge,
    isLoading: extraChargeLoading,
    refetch: extraChargeRefetch,
  } = useGetVehicleCharge({ tempDistance });
  useEffect(() => {
    if (distanceData) {
      extraChargeRefetch();
    }
  }, [distanceData]);
  const handleChange = (event) => {
    setDayNumber(event.target.value);
  };
  //order post api
  const { mutate: orderMutation, isLoading: orderLoading } = useMutation(
    "order-place",
    OrderApi.placeOrder
  );
  const userOnSuccessHandler = (res) => {
    // dispatch(setUser(res.data))
    // dispatch(setWalletAmount(res?.data?.wallet_balance))
  };
  const { isLoading: customerLoading, data: customerData } = useQuery(
    ["profile-info"],
    ProfileApi.profileInfo,
    {
      onSuccess: userOnSuccessHandler,
      onError: onSingleErrorResponse,
    }
  );
  useEffect(() => {}, [customerData]);

  useEffect(() => {
    const currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
    const location = localStorage.getItem("location");
    setAddress({
      ...currentLatLng,
      latitude: currentLatLng?.lat,
      longitude: currentLatLng?.lng,
      address: location,
      address_type: "Selected Address",
    });
    refetch();
  }, []);
  useEffect(() => {
    storeData && address && refetchDistance();
  }, [storeData, address]);

  useEffect(() => {
    const taxAmount = getTaxableTotalPrice(
      cartList,
      couponDiscount,
      storeData?.tax,
      storeData
    );
    setTaxAmount(taxAmount);
  }, [cartList, couponDiscount, storeData]);
  useEffect(() => {
    const total_order_amount = getFinalTotalPrice(
      cartList,
      couponDiscount,
      taxAmount,
      storeData
    );
    setTotalOrderAmount(total_order_amount);
  }, [cartList, couponDiscount, taxAmount]);

  const handleValuesFromCartItems = (variationValues) => {
    let value = [];
    if (variationValues?.length > 0) {
      variationValues?.forEach((item) => {
        if (item?.isSelected) {
          value.push(item.label);
        }
      });
    } else {
      value.push(variationValues[0].label);
    }
    return value;
  };

  const handleProductList = (productList, totalQty) => {
    return productList?.map((cart) => {
      return {
        add_on_ids:
          cart?.selectedAddons?.length > 0
            ? cart?.selectedAddons?.map((add) => {
                return add.id;
              })
            : [],
        add_on_qtys:
          cart?.selectedAddons?.length > 0
            ? cart?.selectedAddons?.map((add) => {
                totalQty += add.quantity;
                return totalQty;
              })
            : [],
        add_ons:
          cart?.selectedAddons?.length > 0
            ? cart?.selectedAddons?.map((add) => {
                return {
                  id: add.id,
                  name: add.name,
                  price: add.price,
                };
              })
            : [],
        item_id: cart?.available_date_starts ? null : cart?.id,
        item_campaign_id: cart?.available_date_starts ? cart?.id : null,

        price: cart?.price,
        quantity: cart?.quantity,
        variant:
          cart?.module_type === "food" ? getVariation(cart?.variation) : [],
        //new variation form needs to added here
        variation:
          cart?.module_type === "food"
            ? cart?.food_variations?.length > 0
              ? cart?.food_variations?.map((variation) => {
                  return {
                    name: variation.name,
                    values: {
                      label: handleValuesFromCartItems(variation.values),
                    },
                  };
                })
              : []
            : cart?.selectedOption?.length > 0
            ? cart?.selectedOption
            : [],
      };
    });
  };

  const handleOrderMutationObject = (carts, productList) => {
    const isDigital =
      paymentMethod !== "cash_on_delivery" &&
      paymentMethod !== "wallet" &&
      paymentMethod !== ""
        ? "digital_payment"
        : paymentMethod;

    const originData = {
      latitude: storeData?.latitude,
      longitude: storeData?.longitude,
    };
    if (getCurrentModuleType() === "pharmacy") {
      const formData = new FormData();
      formData.append("cart", JSON.stringify(carts));
      if (scheduleAt !== "now") {
        formData.append("schedule_at", scheduleAt);
      }

      formData.append("payment_method", isDigital);
      formData.append("order_type", orderType);

      formData.append("store_id", storeData?.id);
      if (couponDiscount?.code) {
        formData.append("coupon_code", couponDiscount?.code);
      }

      formData.append("coupon_discount_amount", couponDiscount?.discount);
      formData.append("coupon_discount_title", couponDiscount?.title);

      formData.append("discount_amount", getProductDiscount(productList));
      formData.append(
        "distance",
        handleDistance(
          distanceData?.data?.rows?.[0]?.elements,
          originData,
          address
        )
      );
      formData.append("order_amount", totalAmount);
      formData.append("dm_tips", deliveryTip);

      formData.append("address", address?.address);
      formData.append("address_type", address?.address_type);
      formData.append("lat", address?.lat);
      formData.append("latitude", address?.latitude);

      formData.append("lng", address?.lng);
      formData.append("longitude", address?.longitude);
      if (isImageSelected?.length > 0) {
        isImageSelected?.forEach((item) =>
          formData.append("order_attachment", item)
        );
      }
      return formData;
    } else {
      return {
        cart: JSON.stringify(carts),
        ...address,
        partial_payment: usePartialPayment,

        schedule_at: scheduleAt === "now" ? null : scheduleAt,
        // order_time: scheduleAt,
        payment_method: isDigital,
        order_type: orderType === "schedule_order" ? "delivery" : orderType,
        store_id: storeData?.id,
        coupon_code: couponDiscount?.code,
        coupon_discount_amount: couponDiscount?.discount,
        coupon_discount_title: couponDiscount?.title,
        discount_amount: getProductDiscount(productList),
        distance: handleDistance(
          distanceData?.data?.rows?.[0]?.elements,
          originData,
          address
        ),
        order_amount: totalAmount,
        dm_tips: deliveryTip,
        cutlery: cutlery,
        unavailable_item_note: unavailable_item_note,
        delivery_instruction: delivery_instruction,
      };
    }
  };
  const handlePlaceOrder = () => {
    const itemsList = page === "campaign" ? campaignItemList : cartList;
    const isAvailable = storeData?.schedule_order
      ? isFoodAvailableBySchedule(itemsList, scheduleAt)
      : true;
    if (isAvailable) {
      const walletAmount = customerData?.data?.wallet_balance;
      let productList = page === "campaign" ? campaignItemList : cartList;
      if (paymentMethod === "wallet") {
        if (Number(walletAmount) < Number(totalAmount)) {
          toast.error(t("Wallet balance is below total amount."), {
            id: "wallet",
            position: "bottom-right",
          });
        } else {
          let totalQty = 0;
          let carts = handleProductList(productList, totalQty);
          const handleSuccessSecond = (response) => {
            if (response?.data) {
              if (paymentMethod === "digital_payment") {
                toast.success(response?.data?.message);

                const newBaseUrl = baseUrl;
                const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}&total=${response?.data?.total_ammount}`;
                const url = `${newBaseUrl}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&callback=${callBackUrl},`;
                localStorage.setItem("totalAmount", totalAmount);
                dispatch(setClearCart());
                Router.push(url);
              } else if (paymentMethod === "wallet") {
                toast.success(response?.data?.message);
                setOrderSuccess(true);
              } else {
                if (response.status === 203) {
                  toast.error(response.data.errors[0].message);
                }
                //setOrderSuccess(true)
              }
            }
          };
          if (carts?.length > 0) {
            let order = handleOrderMutationObject(carts, productList);
            orderMutation(order, {
              onSuccess: handleSuccessSecond,
              onError: (error) => {
                error?.response?.data?.errors?.forEach((item) =>
                  toast.error(item.message, {
                    position: "bottom-right",
                  })
                );
              },
            });
          }
        }
      } else {
        let totalQty = 0;
        let carts = handleProductList(productList, totalQty);
        const handleSuccess = (response) => {
          if (response?.data) {
            toast.success(response?.data?.message, {
              id: paymentMethod,
            });
            if (paymentMethod !== "cash_on_delivery") {
              const payment_platform = "web";
              const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}&total=${response?.data?.total_ammount}`;
              const url = `${baseUrl}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&payment_platform=${payment_platform}&callback=${callBackUrl}&payment_method=${paymentMethod}`;
              localStorage.setItem("totalAmount", totalAmount);
              dispatch(setClearCart());
              Router.push(url, undefined, { shallow: true });
            } else {
              setOrderSuccess(true);
            }
          }
        };
        if (carts?.length > 0) {
          let order = handleOrderMutationObject(carts, productList);
          orderMutation(order, {
            onSuccess: handleSuccess,
            onError: (error) => {
              error?.response?.data?.errors?.forEach((item) =>
                toast.error(item.message, {
                  position: "bottom-right",
                })
              );
            },
          });
        }
      }
    } else {
      toast.error(
        t(
          "One or more item is not available for the chosen preferable schedule time."
        )
      );
    }
  };

  const isStoreOpen = () => {
    // storeData?.schedule_order
  };
  const storeCloseToast = () =>
    toast.error(
      t(`${getStoresOrRestaurants().slice(0, -1)} is closed. Try again later.`)
    );
  //totalAmount
  const handlePlaceOrderBasedOnAvailability = () => {
    //cod -> cash on delivery
    const codLimit =
      getInfoFromZoneData(zoneData)?.pivot?.maximum_cod_order_amount;
    if (orderType === "take_away") {
      handlePlaceOrder();
    } else {
      if (codLimit) {
        if (totalAmount <= codLimit) {
          handlePlaceOrder();
        } else {
          toast.error(t(cod_exceeds_message), {
            duration: 5000,
          });
        }
      } else {
        handlePlaceOrder();
      }
    }
  };
  const placeOrder = () => {
    if (storeData?.active) {
      //checking restaurant or shop open or not
      if (storeData?.schedules.length > 0) {
        const todayInNumber = moment().weekday();
        let isOpen = false;
        let filteredSchedules = storeData?.schedules.filter(
          (item) => item.day === todayInNumber
        );
        let isAvailableNow = [];
        filteredSchedules.forEach((item) => {
          if (isAvailable(item?.opening_time, item?.closing_time)) {
            isAvailableNow.push(item);
          }
        });
        if (isAvailableNow.length > 0) {
          isOpen = true;
        } else {
          isOpen = false;
        }
        if (isOpen) {
          handlePlaceOrderBasedOnAvailability();
        }
      } else {
        storeCloseToast();
      }
    } else {
      storeCloseToast();
    }
  };

  const couponRemove = () => {};
  useEffect(() => {
    orderSuccess && handleOrderSuccess();
  }, [orderSuccess]);
  const handleOrderSuccess = () => {
    if (page === "buysetScheduleAt_now") {
      dispatch(setRemoveItemFromCart(cartList?.[0]));
    }
    localStorage.setItem("totalAmount", totalAmount);
    Router.push("/order", undefined, { shallow: true });
  };
  const handleImageUpload = (value) => {
    setIsImageSelected([value]);
  };
  const handlePartialPayment = () => {
    if (payableAmount > customerData?.data?.wallet_balance) {
      setUsePartialPayment(true);
      setPaymentMethod("");
    } else {
      setPaymentMethod("wallet");
      setSwitchToWallet(true);
    }
  };
  const removePartialPayment = () => {
    if (payableAmount > customerData?.data?.wallet_balance) {
      setUsePartialPayment(false);
      setPaymentMethod("");
    } else {
      setPaymentMethod("");
      setSwitchToWallet(false);
    }
  };
  const handlePartialPaymentCheck = () => {
    if (configData?.partial_payment_status === 1) {
      if (couponDiscount && usePartialPayment) {
        if (
          payableAmount > customerData?.data?.wallet_balance &&
          !usePartialPayment
        ) {
          setOpenPartialModel(true);
        } else {
          if (
            usePartialPayment &&
            customerData?.data?.wallet_balance > payableAmount
          ) {
            setOpenModal(true);
          }
        }
      } else if ((deliveryTip > 0 && usePartialPayment) || switchToWallet) {
        if (payableAmount > customerData?.data?.wallet_balance) {
          setOpenPartialModel(true);
        } else {
          if (
            usePartialPayment &&
            customerData?.data?.wallet_balance > payableAmount
          ) {
            setOpenModal(true);
          }
        }
      } else if (orderType && usePartialPayment) {
        if (
          payableAmount > customerData?.data?.wallet_balance &&
          !usePartialPayment
        ) {
          setOpenPartialModel(true);
        } else {
          if (
            usePartialPayment &&
            customerData?.data?.wallet_balance > payableAmount
          ) {
            setOpenModal(true);
          }
          //setOpenModal(true);
        }
      }
    }
  };
  useEffect(() => {
    handlePartialPaymentCheck();
  }, [payableAmount]);

  const agreeToPartial = () => {
    setPaymentMethod("");
    setUsePartialPayment(true);
    setOpenPartialModel(false);
    setSwitchToWallet(false);
  };
  const notAgreeToPartial = () => {
    setUsePartialPayment(false);
    setOpenPartialModel(false);
    setSwitchToWallet(false);
  };
  const agreeToWallet = () => {
    setPaymentMethod("wallet");
    setSwitchToWallet(true);
    setUsePartialPayment(false);
    setOpenModal(false);
  };
  const notAgreeToWallet = () => {
    setPaymentMethod("");
    setSwitchToWallet(false);
    setUsePartialPayment(false);
    setOpenModal(false);
  };
  const handleCutlery = (status) => {
    if (status) {
      setCutlery(1);
    } else {
      setCutlery(1);
    }
  };
  const handleItemUnavailableNote = (value) => {
    setUnavailable_item_note(value);
  };
  const handleDeliveryInstructionNote = (value) => {
    setDelivery_instruction(value);
  };
  return (
    <Grid
      container
      spacing={3}
      mb="2rem"
      paddingTop={{ xs: "1.5rem", md: "2.5rem" }}
    >
      <Grid item xs={12} md={7}>
        <Stack
          spacing={{ xs: 2, sm: 2, md: 3 }}
          pb={{ xs: "1rem", sm: "2rem", md: "4rem" }}
        >
          <CheckoutStepper />
          {zoneData && (
            <AddPaymentMethod
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              zoneData={zoneData}
              configData={configData}
              orderType={orderType}
              usePartialPayment={usePartialPayment}
            />
          )}

          <DeliveryDetails
            storeData={storeData}
            setOrderType={setOrderType}
            orderType={orderType}
            setAddress={setAddress}
            address={address}
            customDispatch={customDispatch}
            scheduleTime={state.scheduleTime}
            setDayNumber={setDayNumber}
            setDeliveryTip={setDeliveryTip}
            handleChange={handleChange}
            today={today}
            tomorrow={tomorrow}
            numberOfDay={numberOfDay}
            configData={configData}
            setScheduleAt={setScheduleAt}
          />

          {Number.parseInt(configData?.dm_tips_status) === 1 &&
            orderType !== "take_away" && (
              <DeliveryManTip
                orderType={orderType}
                deliveryTip={deliveryTip}
                setDeliveryTip={setDeliveryTip}
                isSmall={isSmall}
                tripsData={tripsData}
                setUsePartialPayment={setUsePartialPayment}
              />
            )}

          <Grid item md={12} xs={12}></Grid>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} height="auto">
        <CustomStackFullWidth>
          {currentModuleType === "pharmacy" && (
            <CustomPaperBigCard
              sx={{ marginBottom: "1rem" }}
              padding={isSmall ? "0px" : "1.25rem"}
              noboxshadow={isSmall && "true"}
              backgroundcolor={isSmall && theme.palette.background.default}
            >
              <SinglePrescriptionUpload
                t={t}
                handleImageUpload={handleImageUpload}
              />
            </CustomPaperBigCard>
          )}
          <CustomPaperBigCard
            height="auto"
            padding={isSmall ? "0px" : "1.25rem"}
            noboxshadow={isSmall && "true"}
            backgroundcolor={isSmall && theme.palette.background.default}
          >
            <Stack justifyContent="space-between">
              <CouponTitle textAlign="left">{t("Order Summary")}</CouponTitle>
              <SimpleBar style={{ maxHeight: "500px", width: "100%" }}>
                <OrderSummaryDetails
                  page={page}
                  configData={configData}
                  cartList={cartList}
                  t={t}
                  campaignItemList={campaignItemList}
                  isSmall={isSmall}
                />
              </SimpleBar>
              {storeData && (
                <HaveCoupon
                  store_id={storeData?.id}
                  setCouponDiscount={setCouponDiscount}
                  counponRemove={couponRemove}
                  couponDiscount={couponDiscount}
                  totalAmount={totalAmount}
                  deliveryFee={deliveryFee}
                  deliveryTip={deliveryTip}
                  setSwitchToWallet={setSwitchToWallet}
                  walletBalance={customerData?.data?.wallet_balance}
                  payableAmount={payableAmount}
                />
              )}
              {configData?.customer_wallet_status === 1 &&
                customerData?.data?.wallet_balance > 0 &&
                configData?.partial_payment_status === 1 && (
                  <Grid item md={12} xs={12}>
                    <PartialPayment
                      remainingBalance={
                        customerData?.data?.wallet_balance - payableAmount
                      }
                      handlePartialPayment={handlePartialPayment}
                      usePartialPayment={usePartialPayment}
                      walletBalance={customerData?.data?.wallet_balance}
                      paymentMethod={paymentMethod}
                      switchToWallet={switchToWallet}
                      removePartialPayment={removePartialPayment}
                    />
                  </Grid>
                )}
              {getCurrentModuleType() === "food" && storeData?.cutlery && (
                <Cutlery isChecked={cutlery} handleChange={handleCutlery} />
              )}
              <ItemSelectWithChip
                title="If Any product is not available"
                data={productUnavailableData}
                handleChange={handleItemUnavailableNote}
              />
              <ItemSelectWithChip
                title="Add More Delivery Instruction"
                data={deliveryInstructions}
                handleChange={handleDeliveryInstructionNote}
              />
              {distanceData && storeData ? (
                <OrderCalculation
                  usePartialPayment={usePartialPayment}
                  cartList={page === "campaign" ? campaignItemList : cartList}
                  storeData={storeData}
                  couponDiscount={couponDiscount}
                  taxAmount={taxAmount}
                  distanceData={distanceData}
                  total_order_amount={total_order_amount}
                  configData={configData}
                  couponInfo={couponInfo}
                  orderType={orderType}
                  deliveryTip={deliveryTip}
                  origin={{
                    latitude: storeData?.latitude,
                    longitude: storeData?.longitude,
                  }}
                  destination={address}
                  zoneData={zoneData}
                  extraCharge={extraCharge && extraCharge}
                  setDeliveryFee={setDeliveryFee}
                  extraChargeLoading={extraChargeLoading}
                  walletBalance={customerData?.data?.wallet_balance}
                  setPayableAmount={setPayableAmount}
                  additionalCharge={
                    configData?.additional_charge_status === 1 &&
                    configData?.additional_charge
                  }
                  payableAmount={payableAmount}
                />
              ) : (
                extraChargeLoading && <OrderCalculationShimmer />
              )}
              <PlaceOrder
                placeOrder={placeOrder}
                orderLoading={orderLoading}
                zoneData={zoneData}
              />
            </Stack>
          </CustomPaperBigCard>
        </CustomStackFullWidth>
      </Grid>
      {openModal && (
        <CustomModal
          openModal={openModal}
          //handleClose={() => setOpenModal(false)}
        >
          <PartialPaymentModal
            payableAmount={payableAmount}
            agree={agreeToWallet}
            reject={notAgreeToWallet}
            colorTitle=" Want to pay via your wallet ? "
            title="You can pay the full amount with your wallet."
            remainingBalance={
              customerData?.data?.wallet_balance - payableAmount
            }
          />
        </CustomModal>
      )}
      {openPartialModel && (
        <CustomModal
          openModal={openPartialModel}
          //handleClose={() => setOpenPartialModel(false)}
        >
          <PartialPaymentModal
            payableAmount={payableAmount}
            agree={agreeToPartial}
            reject={notAgreeToPartial}
            colorTitle=" Want to pay partially with wallet ? "
            title="You do not have sufficient balance to pay full amount via wallet."
          />
        </CustomModal>
      )}
    </Grid>
  );
};

ItemCheckout.propTypes = {};

export default ItemCheckout;
