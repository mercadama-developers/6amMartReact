import { ACTION } from "./states";
import { store } from "../../../redux/store/index";
export const handleInitialTotalPriceVarPriceQuantitySet = (
  productDetailsData,
  dispatch,
  cartList,
  handleChoices,
  selectedOptions,
  modalData
) => {
  if (productDetailsData) {
    if (productDetailsData?.selectedOption?.length > 0) {
      dispatch({
        type: ACTION.setModalData,
        payload: {
          ...productDetailsData,
          quantity: productDetailsData?.quantity
            ? productDetailsData?.quantity
            : 1,
          totalPrice: productDetailsData?.totalPrice
            ? productDetailsData?.totalPrice
            : productDetailsData?.selectedOption[0]?.price,
        },
      });
    } else {
      if (productDetailsData?.variations?.length > 0) {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...productDetailsData,
            selectedOption: [productDetailsData.variations[0]],
            quantity: productDetailsData?.quantity
              ? productDetailsData?.quantity
              : 1,
            totalPrice: productDetailsData?.totalPrice
              ? productDetailsData?.totalPrice
              : productDetailsData?.variations?.[0]?.price,
          },
        });
      } else {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...productDetailsData,
            quantity: productDetailsData?.quantity
              ? productDetailsData?.quantity
              : 1,
            totalPrice: productDetailsData?.totalPrice
              ? productDetailsData?.totalPrice
              : productDetailsData?.price,
            selectedOption: [],
          },
        });
      }
    }
  }
  // if (cartList.length > 0) {
  //   const itemIsInCart = cartList.filter(
  //     (item) => item.id === productDetailsData.id
  //   );
  //   if (itemIsInCart.length > 0) {
  //     let variationIsMatch = itemIsInCart.find(
  //       (item) =>
  //         JSON.stringify(item.variation[0]) ===
  //         JSON.stringify(selectedOptions[0])
  //     );
  //
  //     if (variationIsMatch) {
  //       dispatch({
  //         type: ACTION.setModalData,
  //         payload: {
  //           ...modalData[0],
  //           totalPrice: variationIsMatch?.totalPrice,
  //           quantity: variationIsMatch?.quantity,
  //         },
  //       });
  //     }
  //   }
  // } else {
  //   if (
  //     productDetailsData?.variations &&
  //     productDetailsData?.variations.length > 0
  //   ) {
  //     dispatch({
  //       type: ACTION.setSelectedOptions,
  //       payload: [productDetailsData?.variations[0]],
  //     });
  //   } else {
  //   }
  // }
};
