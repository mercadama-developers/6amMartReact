import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React from "react";
import {
	CustomBoxFullWidth,
	CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../CustomImageContainer";
import CustomCountdown from "../../../countdown";
import CustomLinearProgressbar from "../../../linear-progressbar";
import H1 from "../../../typographies/H1";
import bg from "./assets/bg.png";

const CustomSpan = styled("span")(({ theme }) => ({
	color: theme.palette.text.secondary,
}));
const Slide = (props) => {
	return (
		<CustomStackFullWidth>
			<CustomBoxFullWidth
				sx={{
					height: "100%",
					backgroundColor: (theme) => theme.palette.neutral[100],
					borderRadius: "10px",
					position: "relative",
				}}
			>
				<CustomImageContainer
					height="100%"
					width="100%"
					src={bg.src}
					objectFit="cover"
				/>
			</CustomBoxFullWidth>
			<CustomStackFullWidth
				alignItems="center"
				justifyContent="center"
				sx={{
					paddingX: { xs: "40px", md: "20px" },
				}}
			>
				<Stack mt="15px" spacing={1}>
					<Stack
						spacing={0.5}
						direction="row"
						alignItems="center"
						justifyContent="flex-end"
					>
						<H1 text={"$6.20"} />
						<Typography
							fontSize="18px"
							sx={{
								textDecoration: "line-through",
								color: "text.secondary",
							}}
						>
							$6.98
						</Typography>
					</Stack>
					<Typography>Strawberry (100gm)</Typography>
				</Stack>
				<CustomStackFullWidth
					alignItems="center"
					justifyContent="center"
					mt="20px"
				>
					<CustomCountdown />
				</CustomStackFullWidth>
				<CustomStackFullWidth mt="10px" spacing={1}>
					<CustomLinearProgressbar />
					<CustomStackFullWidth
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography
							fontWeight="bold"
							lineHeight="28px"
							variant="body2"
						>
							<CustomSpan>Sold</CustomSpan> : 50 items
						</Typography>
						<Typography
							fontWeight="bold"
							lineHeight="28px"
							variant="body2"
						>
							<CustomSpan>Available</CustomSpan> : 20 items
						</Typography>
					</CustomStackFullWidth>
				</CustomStackFullWidth>
			</CustomStackFullWidth>
		</CustomStackFullWidth>
	);
};

Slide.propTypes = {};

export default Slide;
