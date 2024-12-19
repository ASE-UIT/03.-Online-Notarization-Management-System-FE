import { Box, Modal, Typography, Autocomplete, TextField, Button, CircularProgress } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { black, white, gray } from '../../config/theme/themePrimitives'
import UserService from '../../services/user.service'
import { toast } from 'react-toastify'
import UserWalletService from '../../services/userwallet.service'

const EmailTextField = ({
    value,
    options,
    handleInputChange,
    loading,
}) => (
    <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: gray[600] }}>Email</Typography>
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
                        placeholder="Nhập email người nhận"
                        sx={{
                            flexGrow: 1,
                            '& fieldset': { border: 'none' },
                            '& .MuiInputBase-input': { fontSize: '14px' },
                        }}
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
                        Đang tìm kiếm...
                    </Typography>
                }
                noOptionsText={
                    <Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>
                        Không tìm thấy kết quả
                    </Typography>
                }
            />
        </Box>
    </Box>
);

const TransferModal = ({ open, onClose, document }) => {
    const [email, setEmail] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(1);
    const [sending, setSending] = useState(false);
    const disabled = !email || !amount;

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
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
                } else {
                    setOptions(response);
                }
            } catch (error) {
                setOptions([]);
            } finally {
                setLoading(false);
            }
        }, 1500),
        []
    );

    const handleTransferNft = async () => {
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

        try {
            setSending(true);
            const response = await UserWalletService.transferNft(document.transactionHash, email, amount);
            if (response.status === 200) {
                toast.success('Chuyển tài liệu thành công.');
                onClose();
            } else {
                toast.error('Chuyển tài liệu thất bại.');
            }
            setSending(false);
        } catch (error) {
            console.error('Error transferring NFT:', error);
            toast.error('Chuyển tài liệu thất bại.');
            setSending(false);
        }
    };

    const handleInput = (e) => {
        const { value } = e.target;
        if (value < 0) {
            e.target.value = '';
        }
    };

    const handleWheel = (e) => {
        e.target.blur();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '70%', sm: '60%', md: '40%' },
                    bgcolor: white[50],
                    boxShadow: 24,
                    borderRadius: 1,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 22,
                        color: black[900]
                    }}
                >
                    Chia sẻ tài liệu
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'colum', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        gap: 2,
                    }}
                >
                    <EmailTextField
                        value={email}
                        options={options}
                        handleInputChange={handleInputChange}
                        loading={loading}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 1,
                        }}
                    >
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: gray[600] }}>
                            Số lượng
                        </Typography>
                        <TextField
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onInput={handleInput}
                            onWheel={handleWheel}
                            placeholder="Nhập số lượng"
                            sx={{
                                flexGrow: 1,
                                '& .MuiOutlinedInput-root': {
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield',
                                    },
                                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                        WebkitAppearance: 'none',
                                        margin: 0,
                                    },
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                    },
                                },
                                '& .MuiInputBase-input': { fontSize: '14px' },
                                borderRadius: 1,
                                bgcolor: gray[50],
                                height: '100%',
                            }}
                        />
                    </Box>
                </Box>

                <Button
                    onClick={handleTransferNft}
                    sx={{
                        backgroundColor: black[900],
                        color: white[50],
                        borderRadius: 1,
                        fontSize: 16,
                        textTransform: 'none',
                        border: `2px solid ${black[900]}`,
                        '&:hover': {
                            backgroundColor: white[50],
                            color: black[900],
                        },
                        '&:disabled': {
                            backgroundColor: gray[200],
                            color: gray[500],
                            border: `2px solid ${gray[200]}`,
                        },
                        alignSelf: 'flex-start',
                        width: 150,
                        paddingY: 1,
                        marginTop: 2,
                    }}
                    disabled={disabled}
                >
                    {sending ? <CircularProgress size={24} color="inherit" /> : <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Chia sẻ</Typography>}
                </Button>
            </Box>
        </Modal>
    )
}

export default TransferModal