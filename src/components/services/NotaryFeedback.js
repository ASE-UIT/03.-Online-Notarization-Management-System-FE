import { Error, FiberManualRecord, CheckCircleRounded, AccessTimeFilledRounded, SendRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { red, black, white, yellow, green } from '../../config/theme/themePrimitives';

const NotaryFeedback = ({ feedback, missingFiles }) => {
  if (feedback === 'Hồ sơ công chứng đã sẵn sàng' || feedback === 'Hồ sơ công chứng đang được xử lý') {
    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: white[50],
          boxShadow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          height: '90%',
          borderRadius: 1,
          border: `1px solid ${black[50]}`,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>Ghi chú</Typography>
        {feedback === 'Hồ sơ công chứng đã sẵn sàng' ? (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRadius: 1,
              backgroundColor: '#ECF8EF',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
            }}
          >
            <SendRounded fontSize={'small'} sx={{ color: green[500] }} />
            <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>{feedback}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
              backgroundColor: '#FFF7E6',
            }}
          >
            <AccessTimeFilledRounded fontSize={'small'} sx={{ color: yellow[500] }} />
            <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>{feedback}</Typography>
          </Box>
        )}
        <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1, textAlign: 'left' }}>Trạng thái hồ sơ công chứng</Typography>
        {feedback === 'Hồ sơ công chứng đã sẵn sàng' ? (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
            }}
          >
            <FiberManualRecord sx={{ color: black[900], width: '12px', height: '12px' }} />
            <Typography sx={{ color: black[900], fontSize: 13, fontWeight: 400 }}>
              Hồ sơ công chứng của bạn đã được gửi đi và chờ xử lý
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
            }}
          >
            <FiberManualRecord sx={{ color: black[900], width: '12px', height: '12px' }} />
            <Typography sx={{ color: black[900], fontSize: 13, fontWeight: 400 }}>
              Hồ sơ công chứng của bạn đã được tiếp nhận và đang xử lý bởi công chứng viên
            </Typography>
          </Box>
        )}
      </Box>
    );
  } else if (feedback === 'Hồ sơ cần bổ sung thêm giấy tờ') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '10px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: white[50],
            boxShadow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            height: '85%',
            borderRadius: 1,
            border: `1px solid ${black[50]}`,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>Ghi chú</Typography>
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRadius: 1,
              backgroundColor: red[50],
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
            }}
          >
            <Error fontSize={'small'} sx={{ color: red[500] }} />
            <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>{feedback}</Typography>
          </Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1, textAlign: 'left' }}>Tài liệu cần bổ sung</Typography>
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              borderRadius: 1,
              alignItems: 'left',
              justifyContent: 'space-between',
              width: 'fit-content',
              my: 2,
            }}
          >
            {missingFiles.map((filename) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                  }}
                >
                  <FiberManualRecord sx={{ color: black[900], width: '12px', height: '12px' }} />
                  <Typography sx={{ color: black[900], fontSize: 13, fontWeight: 400 }}>{filename}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ flex: 1 }}></Box>
          <Button
            sx={{
              width: 'fit-content',
              borderRadius: '8px',
              background: '#A91D3A',
              color: white[50],
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
            }}
          >
            Bổ sung tài liệu
          </Button>
        </Box>
      </Box>
    );
  } else if (feedback === '') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: white[50],
            boxShadow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            height: '90%',
            borderRadius: 1,
            border: `1px solid ${black[50]}`,
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}></Box>
          <Button
            sx={{
              width: 'fit-content',
              borderRadius: '8px',
              background: '#000',
              color: white[50],
              fontWeight: 700,
              textTransform: 'none',
              p: '8px 32px',
              fontSize: '13px',
            }}
          >
            Xóa
          </Button>
          <Button
            sx={{
              width: 'fit-content',
              borderRadius: '8px',
              background: '#A91D3A',
              color: white[50],
              fontWeight: 700,
              textTransform: 'none',
              p: '8px 32px',
              fontSize: '13px',
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    );
  } else if (feedback === 'Công chứng tài liệu hoàn tất') {
    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: white[50],
          boxShadow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          height: '90%',
          borderRadius: 1,
          border: `1px solid ${black[50]}`,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>Ghi chú</Typography>
        <Box
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            borderRadius: 1,
            backgroundColor: green[50],
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'fit-content',
            my: 2,
          }}
        >
          <CheckCircleRounded fontSize={'small'} sx={{ color: green[500] }} />
          <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>{feedback}</Typography>
        </Box>
      </Box>
    );
  }
};

export default NotaryFeedback;
