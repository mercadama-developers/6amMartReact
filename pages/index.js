import { LandingLayout } from "../src/components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigData } from "../src/redux/slices/configData";
import Router from "next/router";
import SEO from "../src/components/seo";
import useGetLandingPage from "../src/api-manage/hooks/react-query/useGetLandingPage";

const Root = (props) => {
  const { configData } = props;
  const { data, refetch } = useGetLandingPage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (configData) {
      refetch();
      if (configData.length === 0) {
        Router.push("/404");
      } else if (configData?.maintenance_mode) {
        Router.push("/maintainance");
      } else {
        dispatch(setConfigData(configData));
      }
    } else {
    }
  }, [configData]);

  useEffect(() => {
    if (localStorage?.getItem("primeira-vez") === null) {
      localStorage.setItem(
        "currentLatLng",
        JSON.stringify({ lat: -23.5557714, lng: -46.6395571 })
      );
      localStorage.setItem(
        "location",
        JSON.stringify("São Paulo, State of São Paulo, Brazil")
      );
      localStorage.setItem("zoneid", JSON.stringify([3]));

      localStorage.setItem(
        "module",
        JSON.stringify({
          id: 1,
          module_name: "Entregar até em 30 minutos",
          module_type: "grocery",
          thumbnail: "2023-08-16-64dca575bf3a9.png",
          status: "1",
          stores_count: 3,
          created_at: "2023-08-16T02:31:17.000000Z",
          updated_at: "2023-09-30T19:20:14.000000Z",
          icon: "2023-08-16-64dca575bc1c2.png",
          theme_id: 1,
          description: "<p>Demo module description.</p>",
          all_zone_service: 0,
          items_count: 1,
          zones: [
            {
              id: 3,
              name: "Grande São Paulo",
              coordinates: {
                type: "Polygon",
                coordinates: [
                  [
                    [-47.028159782215, -23.427652907453],
                    [-46.981467887684, -23.603946314961],
                    [-46.852378532215, -23.734753972454],
                    [-46.701316520496, -23.815185827071],
                    [-46.418418571278, -23.737268220516],
                    [-46.388206168934, -23.626595464977],
                    [-46.29207579784, -23.588844707556],
                    [-46.190452262684, -23.591361762859],
                    [-46.09432189159, -23.535975398421],
                    [-46.11629454784, -23.465449925777],
                    [-46.245383903309, -23.402448890358],
                    [-46.363486930653, -23.352026462292],
                    [-46.470603629871, -23.372197735142],
                    [-46.59969298534, -23.394886749189],
                    [-46.651878043934, -23.412531073332],
                    [-46.77547423534, -23.329330115059],
                    [-46.830405875965, -23.299062286668],
                    [-46.912803336903, -23.266264367104],
                    [-46.967734977528, -23.321763804041],
                    [-47.008933707996, -23.372197735142],
                    [-47.028159782215, -23.427652907453],
                  ],
                ],
              },
              status: 1,
              created_at: "2023-09-27T19:41:53.000000Z",
              updated_at: "2023-09-27T19:42:49.000000Z",
              store_wise_topic: "zone_1_store",
              customer_wise_topic: "zone_1_customer",
              deliveryman_wise_topic: "zone_1_delivery_man",
              cash_on_delivery: false,
              digital_payment: true,
              pivot: { module_id: 1, zone_id: 3 },
              translations: [
                {
                  id: 73,
                  translationable_type: "App\\Models\\Zone",
                  translationable_id: 3,
                  locale: "br",
                  key: "name",
                  value: "Grande São Paulo",
                  created_at: null,
                  updated_at: null,
                },
              ],
            },
          ],
          translations: [
            {
              id: 1,
              translationable_type: "App\\Models\\Module",
              translationable_id: 1,
              locale: "br",
              key: "module_name",
              value: "Entregar até em 30 minutos",
              created_at: null,
              updated_at: null,
            },
            {
              id: 2,
              translationable_type: "App\\Models\\Module",
              translationable_id: 1,
              locale: "br",
              key: "description",
              value: "<p>Demo module description.</p>",
              created_at: null,
              updated_at: null,
            },
          ],
        })
      );
    }
    localStorage.setItem("primeira-vez", false);
    Router.push("/home");
  }, []);
  return (
    <>
      <CssBaseline />
      <SEO
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      {/* {data && (
        <LandingLayout configData={configData} landingPageData={data}>
          <LandingPage configData={configData} landingPageData={data} />
        </LandingLayout>
      )} */}
    </>
  );
};
export default Root;
export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const language = req.cookies.languageSetting;
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        "X-localization": language,
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const config = await configRes.json();
  const landingPageRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        "X-localization": language,
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const landingPageData = await landingPageRes.json();
  // Set cache control headers for 1 hour (3600 seconds)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate"
  );

  return {
    props: {
      configData: config,
      landingPageData: landingPageData,
    },
  };
};
