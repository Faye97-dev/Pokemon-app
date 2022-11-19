import { get, urlParamsBuilder } from "../helpers/api_helper";
import { useQuery } from "react-query";
import { REACT_QUERY_RETRY } from "../constants/react-query";

export function useListQuery({
  url,
  key,
  isEnabled = true,
  urlHasQueryKey = false,
  paginated = false,
  paginationConfig = {},
}) {
  /* pagination stuff */
  const params = { ...paginationConfig };

  /* useQuery config */
  const queryKey = paginated ? [key, { ...params }] : key;
  const options = {
    retry: REACT_QUERY_RETRY,
    keepPreviousData: false, // keep previous data when fetching

    // turned on / off query api
    refetchOnWindowFocus: false, // refectch on window focus
    enabled: isEnabled, // query is enabled or disabled
  };

  /* api call stuff */
  const newUrl = paginated
    ? urlParamsBuilder(url, params, urlHasQueryKey)
    : url;
  return useQuery(queryKey, () => get(newUrl), { ...options });
}

export function useGetQuery({ url, key, id }) {
  const options = {
    retry: REACT_QUERY_RETRY,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  };
  return useQuery([key, id], () => get(url), { ...options });
}
