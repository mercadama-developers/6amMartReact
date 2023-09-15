import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import LogoSide from "../../logo/LogoSide";
import NavLinks from "./NavLinks";
import { t } from "i18next";
import CustomSignInButton from "./CustomSignInButton";

import ManageSearch from "./ManageSearch";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import NavBarIcon from "./NavBarIcon";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./account-popover";
import CardView from "../../added-cart-view";
import CustomContainer from "../../container";
import { getCartListModuleWise } from "../../../helper-functions/getCartListModuleWise";
import ModuleWiseNav from "./ModuleWiseNav";
import { setWishList } from "../../../redux/slices/wishList";
import { useWishListGet } from "../../../api-manage/hooks/react-query/wish-list/useWishListGet";
import WishListCardView from "../../wishlist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Cart = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const { cartList } = useSelector((state) => state.cart);
  const handleIconClick = () => {
    setSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={<ShoppingCartOutlinedIcon sx={{ fontSize: "22px" }} />}
        label={t("Cart")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={getCartListModuleWise(cartList)?.length}
      />
      {!!sideDrawerOpen && (
        <CardView
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          cartList={cartList}
        />
      )}
    </>
  );
};
const WishListSideBar = ({ totalWishList }) => {
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const handleIconClick = () => {
    setWishListSideDrawerOpen(true);
  };
  return (
    <>
      <NavBarIcon
        icon={<FavoriteBorderIcon sx={{ fontSize: "22px" }} />}
        label={t("WishList")}
        user="false"
        handleClick={handleIconClick}
        badgeCount={totalWishList}
      />

      {!!wishListSideDrawerOpen && (
        <WishListCardView
          sideDrawerOpen={wishListSideDrawerOpen}
          setSideDrawerOpen={setWishListSideDrawerOpen}
        />
      )}
    </>
  );
};

const SecondNavBar = ({ configData, isVisible }) => {
  const theme = useTheme();
  const router = useRouter();
  const { selectedModule } = useSelector((state) => state.utilsData);
  const isSmall = useMediaQuery("(max-width:1180px)");
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const [openPopover, setOpenPopover] = useState(false);

  const [moduleType, SetModuleType] = useState("");
  const { wishLists } = useSelector((state) => state.wishList);
  const [toggled, setToggled] = useState(false);

  const totalWishList = wishLists?.item?.length + wishLists?.store?.length;
  const anchorRef = useRef(null);
  let token = undefined;
  let location = undefined;
  let zoneId;

  useEffect(() => {
    SetModuleType(selectedModule?.module_type);
  }, [selectedModule]);

  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
    token = localStorage.getItem("token");
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };
  const handleWishlistClick = (pathName) => {
    router.push({
      pathname: "/profile",
      query: {
        page: pathName,
      },
    });
  };
  const getMobileScreenComponents = () => (
    <ModuleWiseNav
      router={router}
      configData={configData}
      token={token}
      setToggled={setToggled}
      location={location}
    />
  );
  const getDesktopScreenComponents = () => (
    <CustomStackFullWidth
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      //spacing={2}
      sx={{
        // paddingBottom: isSmall && "10px",
        // paddingTop: isSmall && "10px",
        marginLeft: "0 !important",
      }}
    >
      <Stack direction="row" alignItems="center" width="100%">
        {!isSmall && (
          <LogoSide
            width="110px"
            height="50px"
            configData={configData}
            objectFit="contain"
          />
        )}
        {!isSmall && location && (
          <NavLinks t={t} zoneid="zoneid" moduleType={moduleType} />
        )}
      </Stack>

      {!isSmall && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2.5}
        >
          <></>
          {token && moduleType !== "parcel" && (
            <NavBarIcon
              icon={<ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />}
              label={t("Chat")}
              user="false"
              handleClick={() => handleWishlistClick("inbox")}
            />
          )}
          {token && zoneId && moduleType !== "parcel" && (
            <WishListSideBar totalWishList={totalWishList} />
          )}
          {moduleType !== "parcel" && location && <Cart />}
          {token ? (
            <IconButton
              ref={anchorRef}
              onClick={() => handleOpenPopover()}
              sx={{
                padding: "5px",
                gap: "10px",
              }}
            >
              <AccountCircleIcon
                color="primary"
                sx={{
                  fontSize: "36px",
                  borderRadius: "50%",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                }}
              />
              <Typography
                color={theme.palette.neutral[1000]}
                textTransform="capitalize"
              >
                {profileInfo?.f_name}
              </Typography>
            </IconButton>
          ) : (
            <CustomSignInButton from={router.pathname.replace("/", "")} />
          )}
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );

  return (
    <CustomBoxFullWidth
      sx={{
        backgroundColor: theme.palette.neutral[100],
        boxShadow: (theme) =>
          `0px 5px 20px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
        zIndex: 1251,
      }}
    >
      <NoSsr>
        <CustomContainer>
          <Toolbar disableGutters={true}>
            {isSmall
              ? getMobileScreenComponents()
              : getDesktopScreenComponents()}
            <AccountPopover
              anchorEl={anchorRef.current}
              onClose={() => setOpenPopover(false)}
              open={openPopover}
            />
          </Toolbar>
        </CustomContainer>
      </NoSsr>
    </CustomBoxFullWidth>
  );
};

export default SecondNavBar;
