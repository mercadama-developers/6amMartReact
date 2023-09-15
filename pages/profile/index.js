import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import Profile from "../../src/components/profile";
import UserLayout from "../../src/components/layout/UserLayout";
import { useTranslation } from "react-i18next";
import { NoSsr } from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import { getServerSideProps } from "../index";
import SEO from "../../src/components/seo";
import UserInformation from "../../src/components/user-information/UserInformation";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { page, orderId } = router.query;
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Profile` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <NoSsr>
          <AuthGuard from={router.pathname.replace("/", "")}>
            <UserInformation
              page={page}
              configData={configData}
              orderId={orderId}
            />
          </AuthGuard>
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
