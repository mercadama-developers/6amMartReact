import { Button, Grid, Typography, styled } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	CustomBoxFullWidth,
	CustomStackFullWidth,
} from "../../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../../CustomImageContainer";
import prescriptionUpload from "../../../assets/prescription_upload.png";
import refillOrder from "../../../assets/refill_order.png";

const CustomTypography = styled(Typography)(({ theme }) => ({
	fontFamily: "Quicksand",
	fontSize: "16px",
	fontWeight: "700",
	lineHeight: "26px",
}));

const BgContainer = styled(CustomStackFullWidth)(({ theme, pink }) => ({
	background:
		pink === "true"
			? "linear-gradient(90deg, #FDD8E9 0%, #FFEFF7 102.8%)"
			: "linear-gradient(89.86deg, #B7F9FD -11.92%, #DCF7FF 101.4%)",
	padding: "1.875rem",
	borderRadius: "10px",
}));
const ImageContainer = styled(CustomBoxFullWidth)(({ theme, pink }) => ({
	position: "relative",
	height: "210px",
	[theme.breakpoints.down("md")]: {
		height: "120px",
	},
	[theme.breakpoints.down("sm")]: {
		height: "120px",
	},
}));

const DataCard = ({ title, image, buttonText, pink }) => {
	const { t } = useTranslation();
	return (
		<BgContainer
			direction="row"
			alignItems="center"
			justifyContent="center"
			pink={pink ? "true" : "false"}
		>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				spacing={2}
			>
				<Grid item xs={7}>
					<Stack spacing={3}>
						<CustomTypography>{t(title)}</CustomTypography>
						<Button
							sx={{
								maxWidth: "200px",
								fontSize: { xs: "11px", md: "inherit" },
							}}
							variant="contained"
						>
							{t(buttonText)}
						</Button>
					</Stack>
				</Grid>
				<Grid item xs={5} sx={{ position: "relative" }}>
					<ImageContainer>
						<CustomImageContainer
							src={image.src}
							alt={t("Background")}
							height="100%"
							width="100%"
							objectFit="cover"
						/>
					</ImageContainer>
				</Grid>
			</Grid>
		</BgContainer>
	);
};
const PharmacyStaticBanners = (props) => {
	return (
		<CustomBoxFullWidth sx={{ mt: "20px" }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<DataCard
						title="Upload your prescriptions here and get your medicine right at your door step"
						buttonText="Upload Prescriptions"
						image={prescriptionUpload}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<DataCard
						title="Need to order same medicine? don’t worry just click here"
						buttonText="Refill Request"
						image={refillOrder}
						pink
					/>
				</Grid>
			</Grid>
		</CustomBoxFullWidth>
	);
};

PharmacyStaticBanners.propTypes = {};

export default PharmacyStaticBanners;
