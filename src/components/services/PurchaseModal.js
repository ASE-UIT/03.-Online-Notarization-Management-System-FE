import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { white, gray, black } from '../../config/theme/themePrimitives'
import React from 'react'
import UserWalletService from '../../services/userwallet.service'
import { toast } from 'react-toastify'

const PurchaseModal = ({ open, onClose, document }) => {
    const [amount, setAmount] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const handleInput = (e) => {
        const { value } = e.target;
        if (value < 0) {
            e.target.value = '';
        }
    };

    const handleWheel = (e) => {
        e.target.blur();
    };

    const handlePurchase = async () => {
        setLoading(true);
        const response = await UserWalletService.purchaseNft(document._id, amount);
        setLoading(false);

        if (response.status === 200) {
            toast.success('Mua tài liệu thành công');
            onClose();
        } else {
            toast.error('Mua tài liệu thất bại');
            onClose();
        }
    }

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
                <Typography variant="h6" id="modal-modal-title">
                    Mua thêm tài liệu
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
                        bgcolor: gray[100],
                        height: '100%',
                    }}
                />

                <Button
                    sx={{
                        width: '100%',
                        backgroundColor: black[900],
                        color: white[50],
                        borderRadius: 1,
                        paddingX: 2,
                        fontSize: 16,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: black[500],
                        },
                    }}
                    onClick={handlePurchase}
                >
                    {loading ? 'Đang xử lý...' : 'Mua tài liệu'}
                </Button>
            </Box>
        </Modal>
    )
}

export default PurchaseModal