import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { black, gray, white } from '../../config/theme/themePrimitives';
import HistoryCard from '../../components/notary/HistoryCard';
import NotarizationService from '../../services/notarization.service';
import { FilterList } from '@mui/icons-material';

const NotarizedHistory = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [field, setField] = useState([]);
  const [status, setStatus] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    field: '',
    status: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await NotarizationService.getApproveHistory();
        if (Array.isArray(response)) setDocuments(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const fields = Array.from(new Set(documents.map((doc) => doc.documentId?.notarizationField?.name)));
    const statuses = Array.from(new Set(documents.map((doc) => doc.status)));

    setField(fields);
    setStatus(statuses);
  }, [documents]);

  const applyFilter = () => {
    return documents
      .filter((document) => {
        const matchesSearch = filter.search
          ? document.documentId.requesterInfo.fullName.toLowerCase().includes(filter.search.toLowerCase())
          : true;

        const matchesField = filter.field ? document.documentId.notarizationField.name === filter.field : true;

        const matchesStatus = filter.status ? document.status === filter.status : true;

        return matchesSearch && matchesField && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.documentId.createdAt);
        const dateB = new Date(b.documentId.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  };

  const setTextBaseOnStatus = (status) => {
    switch (status) {
      case 'processing':
        return 'Đang xử lý';
      case 'digitalSignature':
        return 'Sẵn sàng ký số';
      case 'completed':
        return 'Hoàn thành';
      case 'rejected':
        return 'Không hợp lệ';
      default:
        return 'Không xác định';
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      {/* Title */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography
          sx={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        >
          Lịch Sử Công Chứng
        </Typography>
      </Box>

      {/* Main Box */}
      <Box sx={{ p: 2, borderRadius: 1, border: 1, borderColor: gray[200] }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            Tất Cả Yêu Cầu Công Chứng
          </Typography>

          <Tooltip
            title={
              sortOrder === 'asc' ? (
                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Sắp xếp tăng dần</Typography>
              ) : (
                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Sắp xếp giảm dần</Typography>
              )
            }
            placement="left"
          >
            <IconButton
              size="small"
              onClick={() => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))}
              sx={{
                bgcolor: white[50],
                border: `1px solid ${gray[200]}`,
                '&:hover': {
                  bgcolor: gray[500],
                  color: white[50],
                },
              }}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Filters */}
        <Box display="flex" flexWrap="wrap" gap={2} sx={{ mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm yêu cầu công chứng"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            sx={{
              flex: 1,
              minWidth: { xs: 100, sm: 200 },
              '& .MuiOutlinedInput-root': {
                fontSize: 14,
                padding: '0px 8px',
                borderRadius: 1,
                '& fieldset': {
                  borderColor: black[100],
                },
                '&:hover fieldset': {
                  borderColor: black[200],
                },
                '&.Mui-focused fieldset': {
                  borderColor: black[900],
                  borderWidth: 1,
                },
                '&:active fieldset': {
                  borderColor: black[900],
                },
              },
              '& .MuiInputBase-input::placeholder': {
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
              minWidth: { xs: 100, sm: 200 },
              '& .MuiOutlinedInput-root': {
                fontSize: 14,
                borderRadius: 1,
                '& fieldset': {
                  borderColor: black[100],
                },
                '&:hover fieldset': {
                  borderColor: black[200],
                },
                '&.Mui-focused fieldset': {
                  borderColor: black[900],
                  borderWidth: 1,
                },
                '&:active fieldset': {
                  borderColor: black[900],
                },
              },
              '& .MuiSelect-select': {
                fontSize: 14,
              },
              '& .MuiInputLabel-root': {
                color: gray[400],
                fontSize: 14,
              },
            }}
          >
            <InputLabel>Chọn lĩnh vực</InputLabel>
            <Select
              value={filter.field}
              onChange={(e) => setFilter({ ...filter, field: e.target.value })}
              label="Chọn lĩnh vực"
              IconComponent={ArrowDropDownIcon}
            >
              <MenuItem value="">Tất cả lĩnh vực</MenuItem>
              {field.map((fieldName, index) => (
                <MenuItem key={index} value={fieldName}>
                  {fieldName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: { xs: 100, sm: 200 },
              '& .MuiOutlinedInput-root': {
                fontSize: 14,
                borderRadius: 1,
                '& fieldset': {
                  borderColor: black[100],
                },
                '&:hover fieldset': {
                  borderColor: black[200],
                },
                '&.Mui-focused fieldset': {
                  borderColor: black[900],
                  borderWidth: 1,
                },
                '&:active fieldset': {
                  borderColor: black[900],
                },
              },
              '& .MuiSelect-select': {
                fontSize: 14,
              },
              '& .MuiInputLabel-root': {
                color: gray[400],
                fontSize: 14,
              },
            }}
          >
            <InputLabel>Chọn trạng thái</InputLabel>
            <Select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              label="Chọn trạng thái"
              IconComponent={ArrowDropDownIcon}
            >
              <MenuItem value="">Tất cả trạng thái</MenuItem>
              {status.map((statusName, index) => (
                <MenuItem key={index} value={statusName}>
                  {setTextBaseOnStatus(statusName)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, minmax(200px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
            },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Box key={index} sx={{ flex: 1, minWidth: { xs: 100, sm: 300 }, minHeight: 180 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      bgcolor: white[50],
                      border: `1px solid ${gray[300]}`,
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        gap={2}
                        sx={{ marginBottom: 2 }}
                      >
                        <Skeleton variant="text" width="60%" height={20} />
                        <Skeleton variant="rectangular" width={80} height={30} />
                      </Box>
                      <Skeleton variant="text" width="80%" height={20} sx={{ marginBottom: 1 }} />
                      <Skeleton variant="text" width="70%" height={20} />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 2,
                          marginTop: 2,
                        }}
                      >
                        <Skeleton variant="text" width="40%" height={20} />
                        <Skeleton variant="text" width="50%" height={20} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))
            : applyFilter().map((document, index) => <HistoryCard key={index} document={document} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default NotarizedHistory;
