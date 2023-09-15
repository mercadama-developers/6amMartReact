import { Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

import {
  UserProfileTab,
  UserProfileTabs,
} from "../../styled-components/CustomStyles.style";
import { t } from "i18next";

const ProfileTab = ({
  page,
  menuData,
  marginright,
  fontSize,
  padding,
  handlePage,
  borderRadius,
}) => {
  const theme = useTheme();
  const handleClick = (item) => {
    handlePage(item);
  };

  return (
    <Stack
      width="100%"
      padding={{
        xs: "5px 6px 0px 0px",
        md: padding ? padding : "15px 15px 15px 15px",
      }}
    >
      <UserProfileTabs
        value={page}
        indicatorColor="none"
        variant="scrollable"
        scrollButtons="auto"
      >
        {menuData?.map((item, index) => {
          return (
            <Box key={index}>
              <UserProfileTab
                marginright={marginright}
                fontSize={fontSize}
                item={item}
                page={page}
                onClick={() => handleClick(item)}
                value={page}
                borderRadius={borderRadius}
              >
                <Typography
                  fontWeight={item?.name === page ? "600" : "400"}
                  color={
                    item?.name === page
                      ? theme.palette.primary.main
                      : theme.palette.neutral[400]
                  }
                  sx={{
                    transition: "all ease 0.3s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize={{
                    xs: "12px",
                    md:
                      item?.name === page
                        ? "16px"
                        : fontSize
                        ? fontSize
                        : "14px",
                  }}
                >
                  {" "}
                  {t(item?.name.replace("-", " "))}
                </Typography>
              </UserProfileTab>
            </Box>
          );
        })}
      </UserProfileTabs>
    </Stack>
  );
};

export default ProfileTab;
