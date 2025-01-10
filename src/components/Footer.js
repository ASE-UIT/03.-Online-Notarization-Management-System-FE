import {
    Box,
    Container,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { LinkedIn, Facebook, Instagram } from "@mui/icons-material"

const Footer = () => {
    const HomeData = [
        "Chính sách bảo mật",
        "Bảo mật thanh toán",
        "Điều khoản sử dụng",
        "Hướng dẫn sử dụng",
        "Quy chế hoạt động",
        "Cơ chế giải quyết khiếu nại",
    ];
    const ProductsData = [
        "Giá",
        "Dành cho cá nhân",
        "Dành cho VPCC",
    ];
    const AboutUsData = [
        "Trụ sở chính: Linh Trung, Thu Duc, Ho Chi Minh",
        "Email: congchungtructuyen@gmail.com",
        "Số điện thoại: +84 86 868 6868",
    ];

    return (
        <Box sx={{ backgroundColor: "primary.main", py: 5, width: "100%" }} data-testid="footer-content">
            <Container>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} spacing={5}>
                    <Box flex={1} mb={{ xs: 4, md: 0 }}>
                        <Box>
                            <img src={require("../assets/images/ASE-light.png")} alt="logo" width={'82px'} height={'96px'} />
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="white"
                                mt={3}
                                sx={{ cursor: "default" }}
                            >
                                Hiện đại bậc nhất.
                            </Typography>
                            <Typography
                                variant="body1"
                                color="white"
                                mt={3}
                                sx={{ cursor: "default" }}
                            >
                                Kết nối với chúng tôi:
                            </Typography>
                            <IconButton
                                sx={{
                                    color: "white",
                                    padding: 0,
                                    mr: 2,
                                    mt: 1,
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    "&:focus": {
                                        outline: "none",
                                    },
                                }}
                                size="large"
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "white",
                                    padding: 0,
                                    mr: 2,
                                    mt: 1,
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    "&:focus": {
                                        outline: "none",
                                    },
                                }}
                                size="large"
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "white",
                                    padding: 0,
                                    mr: 2,
                                    mt: 1,
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    "&:focus": {
                                        outline: "none",
                                    },
                                }}
                                size="large"
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box flex={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Box flex={1}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="white"
                                    sx={{ cursor: "default" }}
                                >
                                    Trang chủ
                                </Typography>
                                <List sx={{ width: "fit-content" }}>
                                    {HomeData.map((text, index) => (
                                        <ListItem key={index} disableGutters sx={{ width: "fit-content" }}>
                                            <ListItemText
                                                primary={text}
                                                sx={{
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        width: '0',
                                                        height: '2px',
                                                        bottom: '-2px',
                                                        left: '0',
                                                        backgroundColor: 'white',
                                                        transition: 'width 0.3s ease',
                                                    },
                                                    '&:hover::after': {
                                                        width: '100%',
                                                    },
                                                    width: "fit-content"
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Box flex={1}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="white"
                                    sx={{ cursor: "default" }}
                                >
                                    Sản phẩm
                                </Typography>
                                <List sx={{ width: "fit-content" }}>
                                    {ProductsData.map((text, index) => (
                                        <ListItem key={index} disableGutters sx={{ width: "fit-content" }}>
                                            <ListItemText
                                                primary={text}
                                                sx={{
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        width: '0',
                                                        height: '2px',
                                                        bottom: '-2px',
                                                        left: '0',
                                                        backgroundColor: 'white',
                                                        transition: 'width 0.3s ease',
                                                    },
                                                    '&:hover::after': {
                                                        width: '100%',
                                                    },
                                                    width: "fit-content"
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Box flex={1}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="white"
                                    sx={{ cursor: "default" }}
                                >
                                    Về chúng tôi
                                </Typography>
                                <List>
                                    {AboutUsData.map((text, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemText
                                                primary={text}
                                                primaryTypographyProps={{
                                                    color: "white",
                                                }}
                                                sx={{ cursor: "default" }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
