import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import ArticleIcon from "@mui/icons-material/Article";
import { t } from "i18next";
import { useRouter } from "next/router";

const Prescription = ({ storeId }) => {
  const theme = useTheme();
  const router = useRouter();
  const handleClick = () => {
    router.push(
      {
        pathname: "/checkout",
        query: { page: "prescription", store_id: storeId },
      },
      undefined,
      { shallow: true }
    );
  };
  const iconColor = theme.palette.neutral[100];
  return (
    <Stack
      sx={{
        position: "fixed",
        right: 0,
        bottom: { xs: 100, md: 10 },
        cursor: "pointer",
        zIndex: "999",
      }}
      direction="row"
      spacing={1}
      alignItems="center"
      backgroundColor={theme.palette.neutral[300]}
      paddingY="10px"
      paddingX="20px"
      borderRadius="8px"
      onClick={handleClick}
    >
      <Typography variant="h6">{t("Prescription Order")}</Typography>
      <Stack
        backgroundColor={theme.palette.primary.main}
        padding="20px"
        width="60px"
        hight="40px"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        <ArticleIcon style={{ color: iconColor }} />
      </Stack>
    </Stack>
  );
};

export default Prescription;
