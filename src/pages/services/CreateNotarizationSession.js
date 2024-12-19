import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { black, dark, gray, primary, white } from '../../config/theme/themePrimitives';
import SessionCard from '../../components/services/SessionCard';
import NotarySessionForm from './NotarySessionForm';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SessionService from '../../services/session.service';
import JoinSessionModal from './JoinSessionModal';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileSuccess } from '../../stores/slices/sessionSlice';

const CreateNotarizationSession = () => {
  const [openNotarySessionForm, setOpenNotarySessionForm] = useState(false);
  const [openJoinSessionModal, setOpenJoinSessionModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [searchingSessions, setSearchingSessions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const sessionsPerPage = 6;
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { uploadFileSuccessState } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await SessionService.getSessionsByUserId();

      const sessions = response.results.filter((session) => {
        return session.users.every((user) => user.status !== 'rejected');
      });

      setSessions(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleAddSessionSuccess = useCallback(() => {
    fetchSessions();
  }, []);

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const handleSearch = useCallback(
    debounce((value) => {
      if (value === '') {
        setSearchingSessions([]);
      } else {
        const searchResult = sessions.filter((session) => session.sessionName.toLowerCase().includes(value.toLowerCase()));
        setSearchingSessions(searchResult);
      }
    }, 300),
    [sessions],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
    setCurrentPage(1);
  };

  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions =
    Array.isArray(searchingSessions) && searchingSessions.length > 0
      ? searchingSessions.slice(indexOfFirstSession, indexOfLastSession)
      : Array.isArray(sessions)
        ? sessions.slice(indexOfFirstSession, indexOfLastSession)
        : [];

  const totalSessions = searchingSessions.length > 0 ? searchingSessions.length : sessions.length;
  const totalPages = Math.ceil(totalSessions / sessionsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const skeletons = Array.from({ length: sessionsPerPage }).map((_, index) => (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 'calc(50% - 24px)',
          md: 'calc(33.33% - 24px)',
        },
        mb: 2,
      }}
      key={index}
    >
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Skeleton width="60%" height={30} sx={{ mt: 1 }} />
      <Skeleton width="80%" height={20} />
      <Skeleton width="40%" height={20} />
    </Box>
  ));

  useEffect(() => {
    if (sessionId) {
      setOpenJoinSessionModal(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (uploadFileSuccessState) {
      fetchSessions();
      dispatch(uploadFileSuccess(false));
    }
  }, [uploadFileSuccessState]);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          p: 3,
          backgroundColor: white[50],
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          },
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Tạo phiên công chứng nhiều người
          </Typography>
          <Typography variant="caption">Toàn bộ phiên công chứng của bạn sẽ hiển thị ở đây</Typography>
        </Box>
        <Button
          onClick={() => setOpenNotarySessionForm(true)}
          startIcon={<WorkHistoryIcon />}
          variant="contained"
          disableElevation
          color="white"
          sx={{
            display: 'flex',
            border: `1px solid ${black[50]}`,
            '&:hover': {
              border: `1px solid ${primary[500]}`,
              color: primary[500],
            },
            height: 'fit-content',
            mt: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0,
              xl: 0,
            },
          }}
          size="small"
        >
          <Typography variant="button" sx={{ textTransform: 'none', padding: 0 }}>
            Tạo phiên công chứng
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          p: 2,
          backgroundColor: gray[50],
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: white[50],
            p: 2,
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: {
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: '40%',
                xl: '100%',
              },
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Tìm kiếm phiên công chứng..."
              variant="outlined"
              onChange={handleChange}
              value={searchValue}
              sx={{
                width: '100%',
                '& fieldset': { border: 'none' },
                backgroundColor: gray[50],
                borderRadius: 1,
                '& .MuiInputBase-input': {
                  fontSize: 14,
                  p: 1.5,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: black[300] }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mt: 2,
                justifyContent: { sm: 'center', md: 'center', lg: 'space-between', xl: 'space-between' },
                position: 'relative',
                '&:after': {
                  content: '""',
                  flexBasis: {
                    xs: '100%',
                    sm: 'calc(50%)',
                    md: 'calc(33.33%)',
                  },
                  display: 'block',
                  visibility: 'hidden',
                },
                '& > *': {
                  mx: 1,
                },
              }}
            >
              {skeletons}
            </Box>
          ) : sessions.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mt: 2,
                justifyContent: { sm: 'center', md: 'center', lg: 'space-between', xl: 'space-between' },
                position: 'relative',
                '&:after': {
                  content: '""',
                  flexBasis: {
                    xs: '100%',
                    sm: 'calc(50%)',
                    md: 'calc(33.33%)',
                  },
                  display: 'block',
                  visibility: 'hidden',
                },
                '& > *': {
                  mx: 1,
                },
              }}
            >
              {currentSessions.map((session, index) => (
                <SessionCard key={session._id} session={session} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography variant="body2" sx={{ color: black[300] }}>
                Không có phiên công chứng nào
              </Typography>
            </Box>
          )}
        </Box>
        {/* Pagination Controls */}
        <Stack spacing={2} sx={{ alignItems: 'flex-end', mr: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: gray[400],
                border: `1px solid ${gray[300]}`,
                fontSize: 14,
                '&.Mui-selected': {
                  border: `1px solid ${dark[500]}`,
                  color: dark[500],
                  backgroundColor: 'transparent',
                },
                '&:hover': {
                  border: `1px solid ${dark[500]}`,
                  color: dark[500],
                  backgroundColor: 'transparent',
                },
                borderRadius: '4px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              },
            }}
          />
        </Stack>

        {/* Creating Session Modal */}
        <NotarySessionForm
          open={openNotarySessionForm}
          setOpen={setOpenNotarySessionForm}
          handleSuccess={handleAddSessionSuccess}
        />
        <JoinSessionModal sessionId={sessionId} open={openJoinSessionModal} setOpen={setOpenJoinSessionModal} />
      </Box>
    </Box>
  );
};

export default CreateNotarizationSession;
