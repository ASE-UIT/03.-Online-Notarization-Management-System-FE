import { ErrorRounded, FiberManualRecordRounded, HelpRounded, OpenInNewRounded, WarningRounded } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMemo, useRef } from 'react';
import { red, black, white, yellow, gray } from '../../config/theme/themePrimitives';
import { getDocumentNameByCode } from '../../utils/constants';
import SignatureCanvas from 'react-signature-canvas';
import useWindowSize from '../../hooks/useWindowSize';

const NotaryFeedback = ({ signature, output, feedback, onSignatureSave, loading }) => {
  const { width } = useWindowSize();
  const sigCanvasRef = useRef(null);

  const onClear = () => {
    sigCanvasRef.current.clear();
  };

  const onSave = () => {
    sigCanvasRef.current.getTrimmedCanvas().toBlob((blob) => {
      onSignatureSave(blob);
    });
  };

  const { content, type, missingFiles } = useMemo(() => {
    if (!feedback) {
      return {
        content: 'Chưa có ghi chú từ phía công chứng viên',
        type: 'none',
        missingFiles: [],
      };
    }

    if (feedback.startsWith('Missing documents')) {
      const rawFiles = feedback
        .slice(19, -1)
        .split(',')
        .map((file) => file.trim());
      const missingFiles = rawFiles.map(getDocumentNameByCode);
      return {
        content: 'Hồ sơ cần bổ sung thêm giấy tờ',
        type: 'error',
        missingFiles,
      };
    }

    return {
      content: feedback,
      type: 'warning',
      missingFiles: [],
    };
  }, [feedback]);

  const feedbackStyles = useMemo(() => {
    switch (type) {
      case 'error':
        return { backgroundColor: red[50], icon: <ErrorRounded sx={{ color: red[500] }} /> };
      case 'warning':
        return { backgroundColor: yellow[50], icon: <WarningRounded sx={{ color: yellow[500] }} /> };
      default:
        return { backgroundColor: gray[50], icon: <HelpRounded sx={{ color: gray[500] }} /> };
    }
  }, [type]);

  const renderOutputSection = () => {
    if (output.length > 0) {
      return output.map((item, index) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            borderRadius: 1,
            backgroundColor: white[50],
            border: `1px solid ${black[50]}`,
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Xem tài liệu phản hồi</Typography>
          <Box
            sx={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: 100,
              backgroundColor: gray[100],
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: gray[200],
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: black[500],
                marginRight: 1,
                userSelect: 'none',
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => window.open(item.firebaseUrl, '_blank')}
            >
              {item.filename}
            </Typography>
            <OpenInNewRounded sx={{ color: black[500], fontSize: 16 }} />
          </Box>
        </Box>
      ));
    }
  };

  const renderSignaturePad = () => {
    if (output.length > 0) {
      if (!signature?.approvalStatus.user.approved) {
        return (
          <Box sx={{ backgroundColor: gray[50], mt: 2, px: 2, py: 1, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Điền chữ ký của bạn vào phần dưới đây</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="text" onClick={onClear}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: black[900], textTransform: 'none' }}>
                    Huỷ bỏ
                  </Typography>
                </Button>
                <Button variant="contained" onClick={onSave}>
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: white[50], textTransform: 'none' }}>
                      Lưu thay đổi
                    </Typography>
                  )}
                </Button>
              </Box>
            </Box>
            <Box sx={{ backgroundColor: white[50], borderRadius: 1, border: `1px solid ${black[50]}`, mt: 1 }}>
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{ width: width - 600, height: 300, className: 'sigCanvas' }}
              />
            </Box>
          </Box>
        );
      } else if (signature?.signatureImage !== null) {
        return (
          <Box sx={{ backgroundColor: gray[50], mt: 2, px: 2, py: 1, borderRadius: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Chữ ký của bạn</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <img src={signature.signatureImage} alt="Your signature" />
            </Box>
          </Box>
        );
      }
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        backgroundColor: white[50],
        boxShadow: 1,
        flexDirection: 'column',
        p: 2,
        borderRadius: 1,
        border: `1px solid ${black[50]}`,
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Ghi chú</Typography>
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
          backgroundColor: feedbackStyles.backgroundColor,
        }}
      >
        {feedbackStyles.icon}
        <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>{content}</Typography>
      </Box>

      {type === 'error' && (
        <>
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1, textAlign: 'left' }}>Tài liệu cần bổ sung</Typography>
          {missingFiles.map((file, index) => (
            <Box
              key={index}
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
              <FiberManualRecordRounded sx={{ color: black[500], width: '12px', height: '12px' }} />
              <Typography sx={{ color: black[900], fontSize: 13, fontWeight: 400 }}>
                {index + 1}. {file}
              </Typography>
            </Box>
          ))}
        </>
      )}
      {renderOutputSection()}
      {renderSignaturePad()}
    </Box>
  );
};

export default NotaryFeedback;
