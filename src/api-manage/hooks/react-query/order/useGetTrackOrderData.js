import MainApi from "../../../MainApi";
import { order_details_api, track_order_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (order_id) => {
  const { data } = await MainApi.get(`${track_order_api}?order_id=${order_id}`);
  return data;
};

export default function useGetTrackOrderData(order_id, handleSuccess) {
  return useQuery("track-order-data", () => getData(order_id), {
    onSuccess: handleSuccess,
    enabled: false,
    retry: 1,
    onError: onErrorResponse,
  });
}
