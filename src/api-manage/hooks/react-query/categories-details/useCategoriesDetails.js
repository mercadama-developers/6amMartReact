import MainApi from "../../../MainApi";
import {
  categories_details_api,
  data_limit,
  my_orders_api,
  popular_items,
} from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { category_id, page_limit, offset, type, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${categories_details_api}/${category_id}?limit=${page_limit}&offset=${
      pageParam ? pageParam : offset
    }&type=${type}`
  );
  return data;
};

export default function useGetCategories(pageParams) {
  return useInfiniteQuery(
    "categories-details",
    ({ pageParam = 1 }) => getData({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return (lastPage?.stores?.length || lastPage?.products?.length) > 0
          ? nextPage
          : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      enabled: false,
      onError: onErrorResponse,
      cacheTime: "0",
    }
  );
}
