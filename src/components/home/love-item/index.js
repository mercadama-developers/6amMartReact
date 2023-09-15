import React from "react";
import PropTypes from "prop-types";
import { HomeComponentsWrapper } from "../HomePageComponents";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";
import { Button, Grid } from "@mui/material";
import SpecialCard from "../../cards/SpecialCard";
import ProductCard from "../../cards/ProductCard";
import { useTranslation } from "react-i18next";

const LoveItem = (props) => {
  const { t } = useTranslation();
  return (
    <HomeComponentsWrapper>
      <CustomStackFullWidth
        alignItems="center"
        justyfyContent="center"
        mt="30px"
        spacing={1}
      >
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <H2 text="Item That You’ll Love" />
        </CustomStackFullWidth>
        <CustomBoxFullWidth>
          <Grid container spacing={2}>
            {[...Array(5)].map((item, index) => {
              return (
                <Grid key={index} item xs={6} sm={3} md={2.4}>
                  <ProductCard />
                </Grid>
              );
            })}
          </Grid>
        </CustomBoxFullWidth>
      </CustomStackFullWidth>
    </HomeComponentsWrapper>
  );
};

LoveItem.propTypes = {};

export default LoveItem;
