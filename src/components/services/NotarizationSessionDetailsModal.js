import React, { useState, useCallback } from 'react';
import { white, gray, black } from '../../config/theme/themePrimitives';
import { Close } from '@mui/icons-material';
import AvatarWithCloseButton from '../static/AvatarWithCloseButton';
import { Box, Button, IconButton, Modal, Typography, Autocomplete, TextField } from '@mui/material';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddGuest = ({
    value,
    options,
    handleInputChange,
    handleAddGuest,
    loading,
}) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="body2">Thêm khách mời</Typography>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
                backgroundColor: gray[50],
                borderRadius: 1,
            }}
        >
            {/* Guest Autocomplete */}
            <Autocomplete
                value={value}
                loading={loading}
                options={options}
                getOptionLabel={(option) => option?.email || option}
                onInputChange={handleInputChange}
                sx={{ flexGrow: 1 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Nhập email khách mời"
                        sx={{
                            flexGrow: 1,
                            '& fieldset': { border: 'none' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
                        onKeyDown={(event) => event.key === 'Enter' && handleAddGuest()}
                    />
                )}
                renderOption={(props, option) => (
                    <li
                        {...props}
                        key={typeof option === 'string' ? option : option.id}
                        style={{ fontSize: '14px', fontWeight: 'regular' }}
                    >
                        {typeof option === 'string' ? option : option.email}
                    </li>
                )}
                loadingText={
                    <Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>
                        Đang tải...
                    </Typography>
                }
                noOptionsText={
                    <Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>
                        Không tìm thấy kết quả
                    </Typography>
                }
            />

            <Button
                size="small"
                variant="contained"
                onClick={handleAddGuest}
                sx={{ fontSize: 14, backgroundColor: white[50], color: black[900], textTransform: 'none', mr: 1 }}
            >
                Thêm
            </Button>
        </Box>
    </Box>
);

const NotarizationSessionDetailsModal = ({ open, onClose, session }) => {
    const [email, setEmail] = useState([]);
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState(session.users);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const handleRemoveGuest = (emailToRemove) => {
        setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
    };

    const handleInputChange = (event, newValue) => {
        setEmail(newValue);
        fetchEmails(newValue);
    };

    const fetchEmails = useCallback(
        debounce(async (value) => {
            setLoading(true);
            try {
                const trimmedValue = value.trim();
                if (!trimmedValue) {
                    setOptions([]);
                    return;
                }

                const response = await UserService.searchUserByEmail(trimmedValue);
                if (response.length === 0) {
                    setOptions([]);
                    toast.error('Không tìm thấy người dùng.');
                } else {
                    setOptions(response);
                }
            } catch (error) {
                console.error('Error fetching emails:', error);
                setOptions([]);
                toast.error('Không tìm thấy người dùng.');
            } finally {
                setLoading(false);
            }
        }, 1500),
        []
    );

    const handleAddGuest = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const existingUser = options.find((option) => option.email === email);

        if (!email) {
            toast.error('Vui lòng nhập địa chỉ email.');
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error('Địa chỉ email không hợp lệ.');
            return;
        }

        if (!existingUser) {
            toast.error('Không tìm thấy người dùng.');
            return;
        }

        if (users.find((user) => user.email === email)) {
            toast.error('Người dùng này đã được thêm.');
            return;
        }

        const response = SessionService.addUser(session._id, [email]);
        if (response) {
            toast.success('Thêm người dùng thành công');
        } else if (response.code === 403) {
            toast.error('Bạn không phải là người tạo phiên công chứng');
        }
        setUsers((prev) => [...prev, existingUser]);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    };

    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDeleteUser = async (email) => {
        setUsers((prev) => prev.filter((user) => user.email !== email));
        const response = await SessionService.deleteUserOutOfSession(session._id, email);
        return response;
    };

    const isCreator = user.email === session.creator.email;

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <Box
                sx={{
                    width: { xs: '90vw', sm: '70vw', md: '60vw' },
                    p: 4,
                    backgroundColor: white[50],
                    borderRadius: 3,
                    overflowY: 'auto',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        backgroundColor: gray[100],
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: gray[300],
                        borderRadius: '2px',
                    }
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Chi tiết phiên công chứng
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Notary Session Name */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>Tên phiên công chứng</Typography>
                    <Typography
                        sx={{
                            borderRadius: 1,
                            backgroundColor: gray[50],
                            padding: 2,
                            fontSize: 15,
                            fontWeight: 500,
                            color: black[900],
                            border: `1px solid ${gray[200]}`,
                        }}
                    >
                        {session.sessionName}
                    </Typography>
                </Box>

                {/* Details Section */}
                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                    <Box sx={{ flex: '1' }}>
                        <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>Lĩnh vực công chứng</Typography>
                        <Typography
                            sx={{
                                borderRadius: 1,
                                backgroundColor: gray[50],
                                padding: 2,
                                fontSize: 15,
                                fontWeight: 500,
                                color: black[900],
                                border: `1px solid ${gray[200]}`,
                            }}
                        >
                            {session.notaryField.name}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: '1' }}>
                        <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>Dịch vụ công chứng</Typography>
                        <Typography
                            sx={{
                                borderRadius: 1,
                                backgroundColor: gray[50],
                                padding: 2,
                                fontSize: 15,
                                fontWeight: 500,
                                color: black[900],
                                border: `1px solid ${gray[200]}`,
                            }}
                        >
                            {session.notaryService.name}
                        </Typography>
                    </Box>
                </Box>

                {/* Duration */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>Thời gian diễn ra phiên công chứng</Typography>
                    <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: gray[50],
                                    padding: 2,
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: black[900],
                                    border: `1px solid ${gray[200]}`,
                                }}
                            >
                                {formatDate(session.startDate)} - {formatTime(session.startDate)}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: gray[50],
                                    padding: 2,
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: black[900],
                                    border: `1px solid ${gray[200]}`,
                                }}
                            >
                                {formatDate(session.endDate)} - {formatTime(session.endDate)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Add Guest */}
                <AddGuest
                    value={email}
                    options={options}
                    handleInputChange={handleInputChange}
                    handleAddGuest={handleAddGuest}
                    users={users}
                    handleRemoveGuest={handleRemoveGuest}
                    loading={loading}
                />

                {/* Guests */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                    <AvatarWithCloseButton
                        key={session.creator.email}
                        email={session.creator.email}
                        onHideRemoveIcon={true}
                        name={session.creator.name}
                        isCreator={true}
                    />
                    {users.map((guest, index) => (
                        <AvatarWithCloseButton
                            key={index}
                            email={guest.email}
                            onRemove={() => handleDeleteUser(guest.email)}
                            onHideRemoveIcon={!isCreator}
                        />
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default NotarizationSessionDetailsModal;
