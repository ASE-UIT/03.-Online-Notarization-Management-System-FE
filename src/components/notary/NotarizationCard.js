import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { CalendarToday, KeyboardArrowDown, KeyboardArrowUp, Schedule } from '@mui/icons-material';
import { gray, white } from '../../config/theme/themePrimitives';

const NotarizationCard = ({ document }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setIsMenuOpen(!isMenuOpen);
    };

    const formatDateTime = () => {
        const date = new Date(document.createdAt);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        return { date: formattedDate, time: formattedTime };
    };

    const formatDescription = () => {
        const notarizationField = document.notarizationField.name;
        const notarizationService = document.notarizationService.name;
        const description = `${notarizationField} - ${notarizationService}`;
        return description;
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            width="95%"
            height="120px"
            border={`2px solid ${gray[200]}`}
            borderRadius={1}
        >
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} height="100%">
                <Avatar sx={{ width: 50, height: 50, bgcolor: gray[200], color: gray[600] }} />
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: white[900] }}>{document.requesterInfo.fullName}</Typography>
            </Box>
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    height: '80px',
                    width: '1px',
                    bgcolor: gray[200],
                    alignSelf: 'center',
                }}
            />

            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap={1} width="90%">
                    <Schedule sx={{ fontSize: 18, padding: 1, bgcolor: white, color: gray[500], borderRadius: 1 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: white[900] }}>{formatDateTime().time}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap={1} width="90%">
                    <CalendarToday sx={{ fontSize: 18, padding: 1, bgcolor: white, color: gray[500], borderRadius: 1 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: white[900] }}>{formatDateTime().date}</Typography>
                </Box>
            </Box>
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    height: '80px',
                    width: '1px',
                    bgcolor: gray[200],
                    alignSelf: 'center',
                }}
            />

            <Box flex={2} display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100%" gap={2}>
                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" marginLeft={2}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: gray[800] }}>GHI CHÚ</Typography>
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: gray[600],
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                        }}
                    >
                        {formatDescription()}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button
                        onClick={handleMenuClick}
                        sx={{
                            bgcolor: gray[200],
                            color: gray[700],
                            borderRadius: 1,
                            '&:hover': {
                                bgcolor: gray[700],
                                color: gray[200]
                            },
                            textTransform: 'none',
                            paddingY: '2px',
                            marginRight: 2
                        }}
                        endIcon={isMenuOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    >
                        Chỉnh sửa
                    </Button>
                    <Menu
                        id="edit-menu"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>MenuItem</MenuItem>
                        <MenuItem onClick={handleMenuClose}>MenuItem</MenuItem>
                        <MenuItem onClick={handleMenuClose}>MenuItem</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
}

export default NotarizationCard;
