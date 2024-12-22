import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { black, gray, primary, red, white } from '../../../config/theme/themePrimitives'
import UserService from '../../../services/user.service'
import { toast } from 'react-toastify'

const CreateNotaryAccountModal = ({ open, onClose }) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleCreateAccount = async () => {
        const user = {
            name,
            email,
            password,
            role: 'notary',
        }
        const response = await UserService.createUserAccount(user)
        if (response.status === 201) {
            onClose();
            toast.success('Tạo tài khoản thành công')
        } else {
            toast.error('Tạo tài khoản thất bại')
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
                    width: '40vw',
                    bgcolor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Tạo tài khoản nhân viên
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <TextField
                        label="Họ và tên"
                        type='text'
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                '& fieldset': {
                                    borderColor: gray[200],
                                },
                                '&:hover fieldset': {
                                    borderColor: black[900],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                            },
                            '& .MuiAutocomplete-tag': {
                                backgroundColor: gray[200],
                                color: black[900],
                            },
                        }}
                    />

                    <TextField
                        label="Email"
                        type='email'
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                '& fieldset': {
                                    borderColor: gray[200],
                                },
                                '&:hover fieldset': {
                                    borderColor: black[900],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                            },
                            '& .MuiAutocomplete-tag': {
                                backgroundColor: gray[200],
                                color: black[900],
                            },
                        }}
                    />

                    <TextField
                        label="Mật khẩu"
                        type='text'
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                '& fieldset': {
                                    borderColor: gray[200],
                                },
                                '&:hover fieldset': {
                                    borderColor: black[900],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                            },
                            '& .MuiAutocomplete-tag': {
                                backgroundColor: gray[200],
                                color: black[900],
                            },
                        }}
                    />
                </Box>
                <Button
                    sx={{
                        backgroundColor: primary[500],
                        color: white[50],
                        '&:hover': {
                            backgroundColor: primary[700],
                        },
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        padding: '8px 16px',
                        borderRadius: 1,
                    }}
                    onClick={handleCreateAccount}
                >
                    Tạo tài khoản
                </Button>
            </Box>
        </Modal>
    )
}

export default CreateNotaryAccountModal