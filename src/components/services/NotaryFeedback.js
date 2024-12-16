import { ErrorRounded, FiberManualRecordRounded, HelpRounded, WarningRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { red, black, white, yellow, gray } from '../../config/theme/themePrimitives';
import { getDocumentNameByCode } from '../../utils/constants';

const NotaryFeedback = ({ feedback }) => {
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
    </Box>
  );
};

export default NotaryFeedback;
