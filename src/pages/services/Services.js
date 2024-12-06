import React, { useEffect, useState } from "react";
import {
	Typography,
	Box,
	TextField,
	Card,
	CardContent,
	CardActions,
	Link,
	Autocomplete,
	Skeleton,
	CircularProgress,
} from "@mui/material";
import { dark, gray, primary } from "../../config/theme/themePrimitives";
import Guide from "../../components/services/Guide";
import { services } from "../../utils/fakeData";

const Services = () => {
	const [filteredData, setFilteredData] = useState(services);
	const [loading, setLoading] = useState(true); // simutale loading when fetching data from server side (API)
	const [searchLoading, setSearchLoading] = useState(false); // simulate loading when querying data from server side (API)

	const handleSearch = (text) => {
		setSearchLoading(true);
		setTimeout(() => {
			const filtered = services.filter((item) =>
				item.title.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredData(filtered);
			setSearchLoading(false);
		}, 2000);
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<Box>
			{/* Header Section */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					py: 10,
				}}
			>
				<Box height="fit-content" width="fit-content" sx={{ px: 20 }}>
					<Typography
						variant="h2"
						textAlign="center"
						color={dark[500]}
						sx={{
							maxWidth: 900,
							mx: "auto",
							width: "100%",
							fontWeight: 700,
						}}
						height="fit-content"
						width="fit-content"
					>
						Dịch vụ công chứng
					</Typography>
					<Typography
						variant="body2"
						textAlign="center"
						color={dark[500]}
						sx={{ mt: 4, width: "100%" }}
						height="fit-content"
						width="fit-content"
					>
						Dịch vụ công chứng của chúng tôi được thiết kế để mang lại sự tiện
						lợi và an toàn cho các giao dịch của bạn. Với đội ngũ chuyên nghiệp
						và quy trình minh bạch, chúng tôi cam kết giúp bạn hoàn thành các
						thủ tục công chứng một cách nhanh chóng và hiệu quả.
					</Typography>
				</Box>
				<Autocomplete
					disabled={loading}
					sx={{ width: "50%", mt: 4, background: gray[50] }}
					freeSolo
					options={services.map((option) => option.title)}
					renderInput={(params) => (
						<TextField {...params} label="" placeholder="Tìm kiếm..." />
					)}
					onInputChange={(e, value) => handleSearch(value)}
				/>
			</Box>

			{/* Services Section */}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					p: 10,
					background: gray[50],
					justifyContent: "space-between",
					position: "relative",
					"&:after": {
						content: '""',
						flexBasis: {
							xs: "100%",
							sm: "calc(50%)",
							md: "calc(33.33%)",
						},
						display: "block",
						visibility: "hidden",
					},
					"& > *": {
						mx: 1,
					},
				}}
			>
				{loading ? (
					Array.from(new Array(services.length)).map((_, index) => (
						<Box
							key={index}
							sx={{
								flexBasis: {
									xs: "100%",
									sm: "calc(50% - 24px)",
									md: "calc(33.33% - 24px)",
								},
								mb: 3,
							}}
						>
							<Card sx={{ p: 1 }}>
								<CardContent>
									<Skeleton variant="text" width="80%" height={60} />
									<Skeleton variant="text" width="90%" height={150} />
									<Skeleton variant="rectangular" width={"40%"} height={27} />
								</CardContent>
							</Card>
						</Box>
					))
				) : searchLoading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh",
							width: "100%",
						}}
					>
						<CircularProgress size={"4rem"} />
					</Box>
				) : (
					filteredData.map((service, index) => (
						<Box
							key={index}
							sx={{
								flexBasis: {
									xs: "100%",
									sm: "calc(50% - 24px)",
									md: "calc(33.33% - 24px)",
								},
								mb: 3,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Card
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									flexGrow: 1,

									py: 1,
								}}
							>
								<CardContent>
									<Typography variant="h6" gutterBottom>
										{service.title}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{service.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Link
										underline="none"
										href={service.href}
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<Typography
											sx={{
												fontSize: 18,
												fontWeight: 600,
												px: 1,
												color: primary[500],
												position: "relative",
												"&:: after": {
													content: "''",
													position: "absolute",
													width: "0",
													height: "2px",
													backgroundColor: primary[500],
													bottom: -2,
													left: 0,
													transition: "width 0.3s ease",
												},
												"&:hover::after": {
													width: "100%",
												},
												"&:hover": {
													cursor: "pointer",
												},
											}}
										>
											Tạo hồ sơ
										</Typography>
									</Link>
								</CardActions>
							</Card>
						</Box>
					))
				)}
			</Box>

			{/* Guide Section */}
			<Guide />
		</Box>
	);
};

export default Services;
