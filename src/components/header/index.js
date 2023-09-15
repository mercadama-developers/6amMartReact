import React, { useEffect, useState } from "react";
import { AppBarStyle } from "./NavBar.style";

import { Box, Card } from "@mui/material";
import { useRouter } from "next/router";
import TopNavBar from "../header/top-navbar/TopNavBar";
import SecondNavBar from "../header/second-navbar/SecondNavbar";
import { debounce } from "lodash";
const HeaderComponent = ({ configData }) => {
  const router = useRouter();
  const [showTopNavbar, setShowTopNavbar] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    if (router.asPath !== "/auth/sign-up") {
      const handleScroll = debounce(() => {
        const currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition > prevScrollPosition) {
          // Scrolling downwards (towards the bottom)
          setIsScrollingDown(true);
        } else {
          // Scrolling upwards (towards the top)
          setIsScrollingDown(false);
        }
        setPrevScrollPosition(currentScrollPosition);
      }, 200);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPosition]);

  useEffect(() => {
    if (isScrollingDown) {
      setShowTopNavbar(false);
    } else {
      setShowTopNavbar(true);
    }
  }, [isScrollingDown]);

  return (
    <AppBarStyle
      sx={{
        transition: "transform 0.4s ease-in-out",
        transform: showTopNavbar ? "translateY(0)" : "translateY(-2%)",
      }}
    >
      {router.pathname === "/" ? (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            transition: "transform 0.4s ease-in-out",
            transform: showTopNavbar ? "translateY(0)" : "translateY(-2%)",
          }}
        >
          {showTopNavbar && <TopNavBar configData={configData} />}
          <SecondNavBar configData={configData} />
        </Box>
      ) : (
        <>
          <Card
            sx={{
              boxShadow: "none",
            }}
          >
            {showTopNavbar && <TopNavBar configData={configData} />}
          </Card>
          <SecondNavBar configData={configData} isVisible={showTopNavbar} />
        </>
      )}
    </AppBarStyle>
  );
};

export default HeaderComponent;
