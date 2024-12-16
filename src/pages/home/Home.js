import { Box, Button, Container, Typography, Tooltip } from "@mui/material";
import React, { useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import PhoneIcon from "@mui/icons-material/Phone";
import Chatbox from "../../components/Chatbox";
import FAQSection from "../../components/home/FAQ";
import Reviews from "../../components/home/Reviews";
import Usages from "../../components/home/Usages";
import DocumentSupport from "../../components/home/DocumentSupport";
import { dark } from "../../config/theme/themePrimitives";

const Home = () => {
	const [showChatbox, setShowChatbox] = useState(false);

	const handleChatboxClick = () => {
		setShowChatbox(true);
	};

	return (
		<Box>
			<Box
				sx={{
					position: "absolute",
					width: "50vw",
					height: "50vw",
					top: "70%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					borderRadius: "50%",
					filter: "blur(200px)",
					background:
						"linear-gradient(180deg, rgb(255,255,255) 0%, rgb(255,255,255) 30%, rgb(208,0,43) 100%)",
					zIndex: -1,
				}}
			/>

			<Container sx={{ pt: 10, pb: 5 }}>
				<Box
					textAlign="center"
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: "100%",
					}}
				>
					<Typography variant="h6" color={dark[500]}>
						CÔNG CHỨNG QUỐC GIA
					</Typography>
					<Typography variant="h1" fontWeight="bold" color={dark[500]}>
						Công chứng trực tuyến
					</Typography>
				</Box>
				<Box textAlign="center" mt={3}>
					<Typography variant="subtitle1" width="100%" color={dark[500]}>
						Công chứng trực tuyến nhanh chóng - an toàn - bảo mật.
						<br />
						Chúng tôi sẵn sàng phục vụ cho dù bạn đang ở đâu.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{
							mt: 8,
							borderRadius: 1,
							px: 4,
							py: 1,
							textTransform: "inherit",
							fontSize: 20,
							fontWeight: 600,
						}}
					>
						Tạo hồ sơ công chứng
					</Button>
				</Box>
			</Container>
			<Container
				sx={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					py: 5,
					width: "100%",
				}}
			>
				<Box
					textAlign="center"
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: "100%",
					}}
				>
					<Typography variant="h6" color={dark[500]}>
						LỢI ÍCH NHẬN ĐƯỢC
					</Typography>
					<Typography variant="h3" fontWeight="bold" color={dark[500]}>
						Tại sao bạn nên sử dụng dịch vụ
						<br />
						Công chứng trực tuyến?
					</Typography>
				</Box>
				<Typography
					variant="body1"
					textAlign="center"
					color={dark[500]}
					sx={{ maxWidth: 900, mx: "auto", mt: 3, width: "100%" }}
				>
					Sử dụng dịch vụ công chứng trực tuyến giúp bạn tiết kiệm thời gian và
					tránh thủ tục phức tạp. Mọi giao dịch đều được thực hiện an toàn và
					minh bạch, không cần đến trực tiếp cơ quan. Đội ngũ hỗ trợ chuyên
					nghiệp luôn sẵn sàng giải đáp, giúp bạn hoàn tất công việc nhanh
					chóng.
				</Typography>
				<Usages />
			</Container>

			<DocumentSupport />

			<Box
				sx={{
					backgroundColor: "#FEEBF1",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					sx={{ width: "90%" }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							width: "50%",
							mr: 5,
						}}
					>
						<Typography variant="h2" fontWeight="bold" color="#343D48">
							Dành cho cá nhân
						</Typography>
						<Typography variant="body1" color="#343D48" sx={{ mt: 2 }}>
							Bạn đang tìm kiếm một giải pháp tiện ích, nhanh chóng và an toàn
							để quản lý các nhu cầu cá nhân?
							<br />
							Với dịch vụ của chúng tôi, bạn sẽ có thể tận dụng các tính năng
							tiên tiến để tối ưu hóa thời gian và nâng cao trải nghiệm cá nhân.
							Đăng ký ngay hôm nay để bắt đầu hành trình đơn giản hóa cuộc sống
							của bạn!
						</Typography>
						<Button
							variant="contained"
							color="primary"
							sx={{
								mt: 3,
								borderRadius: 1,
								px: 4,
								py: 1,
								textTransform: "inherit",
								fontSize: 20,
								fontWeight: 600,
							}}
						>
							Tìm hiểu ngay
						</Button>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "50%",
						}}
					>
						<img src={require('../../assets/images/individual.png')} alt="Frame" width={'600px'} height={'600px'} />
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					backgroundColor: "#FEEBF1",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					sx={{ width: "90%" }}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "50%",
						}}
					>
						<img src={require('../../assets/images/organization.png')} alt="Frame" width={'600px'} height={'600px'} />
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							width: "50%",
							ml: 5,
						}}
					>
						<Typography variant="h2" fontWeight="bold" color="#343D48">
							Dành cho VPCC
						</Typography>
						<Typography variant="body1" color="#343D48" sx={{ mt: 2 }}>
							Chúng tôi hiểu rằng công việc công chứng đòi hỏi sự chính xác,
							nhanh chóng và hiệu quả. Trở thành đối tác với chúng tôi, văn
							phòng của bạn sẽ được hỗ trợ các giải pháp công nghệ tiên tiến để
							tăng cường hiệu suất làm việc, giảm thiểu thời gian xử lý, và cung
							cấp dịch vụ tốt hơn cho khách hàng. Hợp tác với chúng tôi hôm nay
							để tạo nên sự khác biệt trong công việc của bạn.
						</Typography>
						<Button
							variant="contained"
							color="primary"
							sx={{
								mt: 3,
								borderRadius: 1,
								px: 4,
								py: 1,
								textTransform: "inherit",
								fontSize: 20,
								fontWeight: 600,
							}}
						>
							Tìm hiểu ngay
						</Button>
					</Box>
				</Box>
			</Box>

			<Reviews />
			<FAQSection />

			<Tooltip
				title="Trợ lý ảo"
				placement="left"
				slotProps={{
					tooltip: {
						sx: {
							bgcolor: "transparent",
							color: (theme) => theme.palette.primary.main,
							fontSize: "16px",
							fontWeight: 600,
							"& .MuiTooltip-arrow": {
								color: "transparent",
							},
						},
					},
				}}
				onClick={handleChatboxClick}
			>
				<AssistantIcon
					sx={{
						position: "fixed",
						width: "3vw",
						height: "3vw",
						bottom: "5%",
						right: "2%",
						color: (theme) => theme.palette.primary.main,
						cursor: "pointer",
						"&:hover": {
							opacity: 0.8,
						},
					}}
				/>
			</Tooltip>

			<Tooltip
				title="Liên hệ tổng đài"
				placement="left"
				slotProps={{
					tooltip: {
						sx: {
							bgcolor: "transparent",
							color: (theme) => theme.palette.primary.main,
							fontSize: "16px",
							fontWeight: 600,
							"& .MuiTooltip-arrow": {
								color: "transparent",
							},
						},
					},
				}}
			>
				<PhoneIcon
					sx={{
						position: "fixed",
						width: "3vw",
						height: "3vw",
						bottom: "12%",
						right: "2%",
						color: (theme) => theme.palette.primary.main,
						cursor: "pointer",
						"&:hover": {
							opacity: 0.8,
						},
					}}
				/>
			</Tooltip>
			{showChatbox && (
				<Chatbox showChatbox={showChatbox} setShowChatbox={setShowChatbox} />
			)}
		</Box>
	);
};

export default Home;
