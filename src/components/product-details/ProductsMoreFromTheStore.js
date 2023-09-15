import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MoreFromTheStoreCard from "../cards/MoreFromTheStoreCard";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import useGetMoreFromStores from "../../api-manage/hooks/react-query/product-details/useGetMoreFromStore";
import ProductCard from "../cards/ProductCard";

const ProductsMoreFromTheStore = ({ productDetails }) => {
  const [offSet, setOffSet] = useState(1);
  const [moreItem, setMoreItem] = useState([]);

  const limit = 10;
  const pageParams = {
    productId: productDetails?.id,
    offset: offSet,
    limit: limit,
  };
  const handleSuccess = (res) => {
    if (res) {
      setMoreItem(res);
    }
  };
  const { refetch } = useGetMoreFromStores(pageParams, handleSuccess);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <CustomStackFullWidth spacing={2.5}>
      <H1 textAlign="start" text="More From This Store!" />
      {moreItem?.slice(0, 4)?.map((item, index) => {
        return (
          <ProductCard
            item={item}
            key={index}
            cardheight="160px"
            horizontalcard="true"
            cardFor="popular items"
          />
        );
      })}
    </CustomStackFullWidth>
  );
};

ProductsMoreFromTheStore.propTypes = {};

export default ProductsMoreFromTheStore;
