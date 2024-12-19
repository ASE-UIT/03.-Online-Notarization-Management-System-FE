import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Divider, Typography, Avatar, CardActionArea, Badge } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { black, dark, green, red, white, yellow } from '../../config/theme/themePrimitives';
import AvatarIcon from '../static/AvatarIcon';
import NotarizationSessionDetailsModal from './NotarizationSessionDetailsModal';

const SessionCard = React.memo(({ session }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [remainingTimeColor, setRemainingTimeColor] = useState({
    color: black[500],
    backgroundColor: black[50],
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const endDate = new Date(session.endDate);
      const now = new Date();
      const durationRemaining = endDate - now;

      if (durationRemaining > 0) {
        const totalSecondsRemaining = Math.floor(durationRemaining / 1000);
        const daysRemaining = Math.floor(totalSecondsRemaining / (60 * 60 * 24));
        const hoursRemaining = Math.floor((totalSecondsRemaining % (60 * 60 * 24)) / (60 * 60));
        const minutesRemaining = Math.floor((totalSecondsRemaining % (60 * 60)) / 60);

        const timeStrings = [];
        if (daysRemaining > 0) {
          timeStrings.push(`${daysRemaining} ngày ${hoursRemaining} giờ`);
        } else {
          if (hoursRemaining > 0) {
            timeStrings.push(`${hoursRemaining} giờ ${minutesRemaining} phút`);
          } else {
            timeStrings.push(`${minutesRemaining} phút`);
          }
        }

        if (daysRemaining >= 5) {
          setRemainingTimeColor({ color: green[500], backgroundColor: green[50] });
        } else if (daysRemaining >= 2) {
          setRemainingTimeColor({ color: yellow[500], backgroundColor: yellow[50] });
        } else {
          setRemainingTimeColor({ color: red[500], backgroundColor: red[50] });
        }

        setTimeRemaining('Còn ' + timeStrings.join(' '));
      } else {
        setRemainingTimeColor({ color: black[500], backgroundColor: black[50] });
        setTimeRemaining('Đã kết thúc');
      }
    };

    calculateTimeRemaining();
  }, [session.endDate]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      sx={{
        flexBasis: {
          xs: '100%',
          sm: 'calc(70% - 24px)',
          md: 'calc(50% - 24px)',
        },
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NotarizationSessionDetailsModal open={openModal} onClose={handleCloseModal} session={session} />
      <CardActionArea
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
          p: 2,
          backgroundColor: white[50],
          boxShadow: '0px 4px 4px -2px rgba(19, 25, 39, 0.08)',
          borderRadius: 1,
          border: `1px solid ${black[50]}`,
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onClick={() => setOpenModal(true)}
      >
        <Box width={'100%'}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Avatar src="https://via.placeholder.com/40x40" sx={{ width: 40, height: 40, borderRadius: 1 }} />
          </Box>

          <CardContent sx={{ px: 0, fontWeight: 500 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: black[900] }}>{session.sessionName}</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: black[300] }}>tạo bởi {session.creator.name}</Typography>
          </CardContent>

          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 500 }}>Lĩnh vực:</Typography>
            <Box sx={{ px: 1, py: 0.5, backgroundColor: dark[50], borderRadius: 1, alignItems: 'center', display: 'flex' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: dark[500] }}>{session.notaryField.name}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 500 }}>Dịch vụ:</Typography>
            <Box sx={{ px: 1, py: 0.5, backgroundColor: dark[50], borderRadius: 1, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: dark[500] }}>{session.notaryService.name}</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" mt={2}>
            <AvatarIcon email={session.creator.email || 'Undefined'} />
            {session.users.map((user, index) => (
              <Badge
                variant="dot"
                color={user.status === 'pending' ? 'warning' : user.status === 'accepted' ? 'success' : 'error'}
              >
                <AvatarIcon key={index} email={user.email} />
              </Badge>
            ))}
          </Box>

          <Box
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: remainingTimeColor.backgroundColor,
              color: remainingTimeColor.color,
              gap: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              width: 'fit-content',
            }}
          >
            <ScheduleIcon sx={{ width: 12, height: 12 }} />
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{timeRemaining}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
});

export default SessionCard;
