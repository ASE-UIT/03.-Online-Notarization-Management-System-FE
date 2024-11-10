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
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            width="95%"
            border={`1px solid ${gray[200]}`}
            borderRadius={1}
            padding={1}
            gap={2}
        >
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1}
                height="100%"
                width="100%"
            >
                <Avatar
                    sx={{
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                        bgcolor: gray[200],
                        color: gray[600]
                    }}
                />
                <Typography
                    sx={{
                        fontSize: { xs: 10, sm: 12 },
                        fontWeight: 500,
                        color: white[900]
                    }}
                >
                    {document.requesterInfo.fullName}
                </Typography>
            </Box>

            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    height: { xs: '0', sm: '48px' },
                    width: '0.5px',
                    bgcolor: gray[200],
                    alignSelf: 'center',
                    display: { xs: 'none', sm: 'block' }
                }}
            />

            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                gap={1}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                    width="90%"
                >
                    <Schedule sx={{ fontSize: 15, padding: 1, bgcolor: white, color: gray[500], borderRadius: 1 }} />
                    <Typography
                        sx={{
                            fontSize: { xs: 10, sm: 12 },
                            fontWeight: 500,
                            color: white[900]
                        }}
                    >
                        {formatDateTime().time}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={1}
                    width="90%"
                >
                    <CalendarToday sx={{ fontSize: 15, padding: 1, bgcolor: white, color: gray[500], borderRadius: 1 }} />
                    <Typography
                        sx={{
                            fontSize: { xs: 10, sm: 12 },
                            fontWeight: 500,
                            color: white[900]
                        }}
                    >
                        {formatDateTime().date}
                    </Typography>
                </Box>
            </Box>

            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    height: { xs: '0', sm: '48px' },
                    width: '0.5px',
                    bgcolor: gray[200],
                    alignSelf: 'center',
                    display: { xs: 'none', sm: 'block' }
                }}
            />

            <Box
                flex={2}
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    marginLeft={2}
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        textAlign: 'left'
                    }}
                >
                    <Typography sx={{ fontSize: 10, fontWeight: 500, color: gray[800] }}>GHI CHÚ</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: 10, sm: 12 },
                            fontWeight: 500,
                            color: gray[600],
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden'
                        }}
                    >
                        {formatDescription()}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent={{ xs: 'flex-end', sm: 'center' }}
                    alignItems="center"
                    width={{ xs: '100%', sm: 'auto' }}
                >
                    <Button
                        onClick={handleMenuClick}
                        sx={{
                            bgcolor: gray[200],
                            color: gray[700],
                            borderRadius: 1,
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: '100px',
                            '&:hover': {
                                bgcolor: gray[700],
                                color: gray[200]
                            },
                            textTransform: 'none',
                            paddingY: '2px',
                            marginRight: { xs: 0, sm: 2 },
                            fontSize: { xs: 8, sm: 10 }
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
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
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
