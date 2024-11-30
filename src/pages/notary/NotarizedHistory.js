import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { black, gray } from "../../config/theme/themePrimitives";
import HistoryCard from "../../components/notary/HistoryCard";

const data = [
    {
        name: "John Doe",
        description: "Công chứng hợp đồng mua bán nhà đất",
        id: "6722157ce89b01001f5ca296",
        date: "24/09/2024",
        status: 'pending',
    },
    {
        name: "John Doe",
        description: "Công chứng hợp đồng mua bán nhà đất",
        id: "6722157ce89b01001f5ca296",
        date: "24/09/2024",
        status: 'processing',
    },
    {
        name: "John Doe",
        description: "Công chứng hợp đồng mua bán nhà đất",
        id: "6722157ce89b01001f5ca296",
        date: "24/09/2024",
        status: 'completed',
    },
    {
        name: "John Doe",
        description: "Công chứng hợp đồng mua bán nhà đất",
        id: "6722157ce89b01001f5ca296",
        date: "24/09/2024",
        status: 'rejected',
    },
    {
        name: "John Doe",
        description: "Công chứng hợp đồng mua bán nhà đất",
        id: "6722157ce89b01001f5ca296",
        date: "24/09/2024",
        status: 'digitalSignature',
    },
];

const NotarizedHistory = () => {
    return (
        <Box sx={{ padding: 4 }}>
            {/* Title */}
            <Box sx={{ marginBottom: 3 }}>
                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 600,
                        textTransform: "capitalize",
                    }}
                >
                    Lịch Sử Công Chứng
                </Typography>
            </Box>

            {/* Main Box */}
            <Box sx={{ p: 3, borderRadius: 1, border: 1, borderColor: gray[200] }}>
                {/* Header */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            textTransform: "capitalize",
                        }}
                    >
                        Tất Cả Yêu Cầu Công Chứng
                    </Typography>
                </Box>

                {/* Filters */}
                <Box display="flex" flexWrap="wrap" gap={2} sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Tìm kiếm yêu cầu công chứng"
                        sx={{
                            flex: 1,
                            minWidth: 200,
                            "& .MuiOutlinedInput-root": {
                                fontSize: 14,
                                padding: "0px 8px",
                                borderRadius: 1,
                                "& fieldset": {
                                    borderColor: black[100],
                                },
                                "&:hover fieldset": {
                                    borderColor: black[200],
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                                "&:active fieldset": {
                                    borderColor: black[900],
                                },
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: gray[500],
                                fontSize: 14,
                            },
                        }}
                    />
                    <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                            flex: 1,
                            minWidth: 200,
                            "& .MuiOutlinedInput-root": {
                                fontSize: 14,
                                borderRadius: 1,
                                "& fieldset": {
                                    borderColor: black[100],
                                },
                                "&:hover fieldset": {
                                    borderColor: black[200],
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                                "&:active fieldset": {
                                    borderColor: black[900],
                                },
                            },
                            "& .MuiSelect-select": {
                                fontSize: 14,
                            },
                            "& .MuiInputLabel-root": {
                                color: gray[400],
                                fontSize: 14,
                            },
                        }}
                    >
                        <InputLabel>Chọn dịch vụ</InputLabel>
                        <Select label="Tất cả dịch vụ" IconComponent={ArrowDropDownIcon}>
                            <MenuItem value="">
                                Tất cả dịch vụ
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{
                            flex: 1,
                            minWidth: 200,
                            "& .MuiOutlinedInput-root": {
                                fontSize: 14,
                                borderRadius: 1,
                                "& fieldset": {
                                    borderColor: black[100],
                                },
                                "&:hover fieldset": {
                                    borderColor: black[200],
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: black[900],
                                    borderWidth: 1,
                                },
                                "&:active fieldset": {
                                    borderColor: black[900],
                                },
                            },
                            "& .MuiSelect-select": {
                                fontSize: 14,
                            },
                            "& .MuiInputLabel-root": {
                                color: gray[400],
                                fontSize: 14,
                            },
                        }}
                    >
                        <InputLabel>Chọn trạng thái</InputLabel>
                        <Select label="Tất cả dịch vụ" IconComponent={ArrowDropDownIcon}>
                            <MenuItem value="">
                                Tất cả trạng thái
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Cards */}
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    sx={{ justifyContent: "flex-start", alignItems: "center" }}
                >
                    {data.map((document, index) => (
                        <HistoryCard key={index} document={document} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default NotarizedHistory;
