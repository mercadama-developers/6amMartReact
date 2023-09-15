import { Grid } from "@mui/material";
import React from "react";
import CustomContainer from "../../../container";
import pharmacyReviewedImage from "../../assets/pharmacy_reviewed_image.png";
import Banners from "../../banners";
import BestReviewedItems from "../../best-reviewed-items";
import FeaturedCategories from "../../featured-categories";
import RunningCampaigns from "../../running-campaigns";
import Stores from "../../stores";
import VisitAgain from "../../visit-again";
import FeaturedStores from "./featured-stores";

const menus = ["All", "New", "Baby Care", "Womans Care", "Mens"];

const Pharmacy = ({ configData }) => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sx={{ marginTop: "10px" }}>
				<CustomContainer>
					<FeaturedCategories configData={configData} />
				</CustomContainer>
			</Grid>
			{/* <Grid item xs={12}>
				<CustomContainer>
					<PharmacyStaticBanners />
				</CustomContainer>
			</Grid> */}
			<Grid item xs={12}>
				<CustomContainer>
					<RunningCampaigns />
				</CustomContainer>
			</Grid>
			<Grid item xs={12}>
				<CustomContainer>
					<FeaturedStores title="Featured Store" configData={configData} />
				</CustomContainer>
			</Grid>
			<Grid item xs={12}>
				<CustomContainer>
					<Banners />
				</CustomContainer>
			</Grid>
			<Grid item xs={12}>
				<CustomContainer>
					<BestReviewedItems
						menus={menus}
						title="Basic Medicine Nearby"
						leftImage={pharmacyReviewedImage}
					/>
				</CustomContainer>
			</Grid>
			<Grid item xs={12}>
				<CustomContainer>
					<VisitAgain configData={configData} />
				</CustomContainer>
			</Grid>
			{/* <Grid item xs={12}>
				<CustomContainer>
					<CommonConditions title="Common Conditions" />
				</CustomContainer>
			</Grid> */}
			{/*<Grid item xs={12}>*/}
			{/*	<CustomContainer>*/}
			{/*		<RedirectBanner />*/}
			{/*	</CustomContainer>*/}
			{/*</Grid>*/}
			<Grid
				item
				xs={12}
				sx={{
					position: "sticky",
					top: { xs: "47px", md: "92px" },
					zIndex: 999,
				}}
			>
				<CustomContainer>
					<Stores />
				</CustomContainer>
			</Grid>
		</Grid>
	);
};

Pharmacy.propTypes = {};

export default Pharmacy;
