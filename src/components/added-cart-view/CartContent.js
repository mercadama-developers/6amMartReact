import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../helper-functions/CardHelpers";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  cart,
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import ProductDetailModal from "../product-detail.modal";
import VariationContent from "./VariationContent";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { out_of_limits, out_of_stock } from "../../utils/toasterMessages";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import ModuleModal from "../cards/ModuleModal";
import { CartIncrementStack } from "./Cart.style";
import Divider from "@mui/material/Divider";
import CustomDivider from "../CustomDivider";
import { useTheme } from "@emotion/react";

const CartContent = (props) => {
  const { cartItem, imageBaseUrl } = props;
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleIncrement = () => {
    if (getCurrentModuleType() !== "food") {
      if (cartItem?.stock <= cartItem?.quantity) {
        toast.error(t(out_of_stock));
      } else {
        if (cartItem?.maximum_cart_quantity) {
          if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
            toast.error(t(out_of_limits));
          } else {
            dispatch(setIncrementToCartItem(cartItem));
          }
        } else {
          dispatch(setIncrementToCartItem(cartItem));
        }
      }
    } else {
      if (cartItem?.maximum_cart_quantity) {
        if (cartItem?.maximum_cart_quantity <= cartItem?.quantity) {
          toast.error(t(out_of_limits));
        } else {
        }
      }
      dispatch(setIncrementToCartItem(cartItem));
    }
  };
  const handleDecrement = () => {
    dispatch(setDecrementToCartItem(cartItem));
  };
  const handleRemove = () => {
    dispatch(setRemoveItemFromCart(cartItem));
  };
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };
  const handleFoodItemTotalPriceWithAddons = () => {
    if (cartItem?.selectedAddons?.length > 0) {
      const addOnsTotalPrice = cartItem?.selectedAddons?.reduce(
        (prev, addOn) => addOn?.price * addOn?.quantity + prev,
        0
      );
      return addOnsTotalPrice + cartItem?.totalPrice;
    } else {
      return cartItem?.totalPrice;
    }
  };

  return (
    <>
      <CustomStackFullWidth
        direction="row"
        sx={{
          padding: ".2rem 2rem .2rem 1.3rem",
          marginTop: { xs: ".5rem", sm: "1rem", md: "1rem" },
        }}
        gap="10px"
      >
        <Stack
          onClick={() => handleUpdateModalOpen()}
          sx={{ cursor: "pointer" }}
        >
          <CustomImageContainer
            height="80px"
            width="80px"
            smWidth="65px"
            smHeight="65px"
            src={`${imageBaseUrl}/${cartItem?.image}`}
            borderRadius=".7rem"
            objectfit="cover"
          />
        </Stack>
        <Stack width="0px" flexGrow="1" justifyContent="center" spacing={0.2}>
          <Typography fontWeight="500" fontSize={{ xs: "12px", md: "14px" }}>
            {cartItem?.name}
          </Typography>
          <VariationContent cartItem={cartItem} />
          <Typography fontWeight="500" fontSize={{ xs: "13px", md: "16px" }}>
            {getAmountWithSign(
              getDiscountedAmount(
                cartItem?.totalPrice,
                cartItem?.discount,
                cartItem?.discount_type,
                cartItem?.store_discount,
                cartItem?.quantity
              )
            )}
          </Typography>
        </Stack>
        <CartIncrementStack>
          {cartItem?.quantity === 1 ? (
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              sx={{ padding: "2px" }}
              onClick={() => handleRemove()}
            >
              <DeleteIcon sx={{ width: "16px" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ padding: "2px" }}
            >
              <RemoveIcon
                size="small"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  width: "16px",
                }}
                onClick={() => handleDecrement()}
              />
            </IconButton>
          )}
          <Typography fontSize="12px" fontWeight="500">
            {cartItem?.quantity}
          </Typography>
          <IconButton aria-label="delete" sx={{ padding: "2px" }}>
            <AddIcon
              sx={{
                color: (theme) => theme.palette.primary.main,
                width: "16px",
              }}
              size="small"
              onClick={() => handleIncrement()}
            />
          </IconButton>
        </CartIncrementStack>
      </CustomStackFullWidth>
      <Stack paddingLeft="1rem">
        <CustomDivider paddingTop={isSmall ? ".5rem" : "1rem"} border="2px" />
      </Stack>
      {updateModalOpen && cartItem?.module_type === "food" ? (
        <FoodDetailModal
          open={updateModalOpen}
          product={cartItem}
          handleModalClose={() => setUpdateModalOpen(false)}
          imageBaseUrl={imageBaseUrl}
          productUpdate
        />
      ) : (
        <ModuleModal
          open={updateModalOpen}
          handleModalClose={() => setUpdateModalOpen(false)}
          configData={configData}
          productDetailsData={cartItem}
        />
      )}
    </>
  );
};

CartContent.propTypes = {};

export default CartContent;
