import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useGetOrderDetails from "../../../api-manage/hooks/react-query/order/useGetOrderDetails";
import useGetTrackOrderData from "../../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import OtherOrder from "./other-order";

const OrderDetails = ({ configData, id }) => {
  const router = useRouter();

  const {
    refetch,
    data,
    isRefetching,
    isLoading: dataIsLoading,
  } = useGetOrderDetails(id);
  const { refetch: refetchTrackOrder, data: trackOrderData } =
    useGetTrackOrderData(id);
  useEffect(() => {
    refetch();
    refetchTrackOrder();
  }, [id]);

  return (
    <div>
      <OtherOrder
        configData={configData}
        data={data}
        refetch={refetch}
        id={id}
        dataIsLoading={dataIsLoading}
      />
    </div>
  );
};

OrderDetails.propTypes = {};

export default OrderDetails;
