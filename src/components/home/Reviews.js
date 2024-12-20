import { Box, Container, Typography, IconButton } from '@mui/material';
import { ArrowCircleLeftRounded, ArrowCircleRightRounded, StarHalfRounded, StarRounded } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { dark, primary } from '../../config/theme/themePrimitives';

const Reviews = () => {
  const reviews = useMemo(
    () => [
      {
        star: 4,
        comment: 'Dễ dàng sử sử dụng.',
        username: 'Nguyễn Thành Tài',
        datetime: '2024-09-18T10:00:00Z',
      },
      {
        star: 4.5,
        comment: 'Dịch vụ tuyệt vời.',
        username: 'Trương Lê Vĩnh Phúc',
        datetime: '2024-09-01T10:00:00Z',
      },
      {
        star: 4.5,
        comment: 'Giao dịch nhanh chóng.',
        username: 'Nguyễn Quốc Thắng',
        datetime: '2024-09-05T14:00:00Z',
      },
      {
        star: 4,
        comment: 'Hỗ trợ khách hàng tốt.',
        username: 'Trần Tuệ Tánh',
        datetime: '2024-09-10T16:00:00Z',
      },
      {
        star: 4.5,
        comment: 'Dễ dàng sử dụng.',
        username: 'Huỳnh Gia Bảo',
        datetime: '2024-09-15T18:00:00Z',
      },
      {
        star: 5,
        comment: '10 điểm.',
        username: 'Nguyễn Trịnh Đông',
        datetime: '2024-09-20T20:00:00Z',
      },
    ],
    [],
  );

  reviews.sort((a, b) => b.star - a.star);

  const [currentReviews, setCurrentReviews] = useState(reviews.slice(0, 3));
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevReviews = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
      setCurrentReviews(reviews.slice(startIndex - 3, startIndex));
    }
  };

  const handleNextReviews = () => {
    if (startIndex + 3 < reviews.length) {
      setStartIndex(startIndex + 3);
      setCurrentReviews(reviews.slice(startIndex + 3, startIndex + 6));
    }
  };

  const DateToText = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = Math.abs(today - targetDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));

    if (diffDays === 0) {
      return 'Hôm nay';
    } else if (diffDays === 1) {
      return '1 ngày trước';
    } else if (diffDays <= 7) {
      return `${diffDays} ngày trước`;
    } else if (diffWeeks === 1) {
      return '1 tuần trước';
    } else if (diffWeeks <= 4) {
      return `${diffWeeks} tuần trước`;
    } else if (diffMonths === 1) {
      return '1 tháng trước';
    } else if (diffMonths <= 12) {
      return `${diffMonths} tháng trước`;
    } else {
      return `${diffYears} năm trước`;
    }
  };

  const starAverage = useMemo(() => {
    const totalStars = reviews.reduce((acc, review) => acc + review.star, 0);
    return totalStars / reviews.length;
  }, [reviews]);

  const SatisfactionLevel = () => {
    if (starAverage > 4) {
      return 'Tuyệt vời';
    } else if (starAverage > 3) {
      return 'Tốt';
    } else if (starAverage > 2) {
      return 'Khá';
    } else if (starAverage > 1) {
      return 'Tệ';
    } else {
      return 'Rất tệ';
    }
  };

  return (
    <Container sx={{ py: 10, width: '100%' }}>
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" color={dark[500]}>
          Công chức trực tuyến số 1 tại Việt Nam
        </Typography>
      </Box>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ maxWidth: 1000, mx: 'auto', mt: 3, width: '80%', color: dark[500] }}
      >
        Người dùng hài lòng với sự tiện lợi, nhanh chóng và minh bạch trong quá trình sử dụng. Họ có thể tiết kiệm thời gian,
        công sức và xử lý công việc hiệu quả hơn bao giờ hết. Sự chuyên nghiệp và tận tâm của đội ngũ hỗ trợ cũng góp phần
        tạo nên trải nghiệm tuyệt vời, khiến khách hàng hoàn toàn yên tâm khi sử dụng dịch vụ.
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          py: 10,
          gap: 5,
          alignItems: 'center',
          height: '200px',
        }}
      >
        <Box sx={{ width: '30%' }}>
          <Typography variant="h4" fontWeight="bold" color={dark[500]}>
            {SatisfactionLevel()}
          </Typography>
          <Box display="flex" justifyContent="left" mt={2}>
            {[...Array(Math.floor(starAverage))].map((_, i) => (
              <StarRounded key={i} sx={{ color: primary[500] }} />
            ))}
            {starAverage % 1 !== 0 && <StarHalfRounded sx={{ color: primary[500] }} />}
          </Box>
          <Typography variant="body2" mt={1} color="#8791a5">
            Dựa trên <span style={{ textDecoration: 'underline', color: '#8791a5' }}>100.000 đánh giá</span>
          </Typography>
        </Box>
        <IconButton
          onClick={handlePrevReviews}
          sx={{
            color: primary[500],
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.2)' },
          }}
        >
          <ArrowCircleLeftRounded fontSize="large" />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          {currentReviews.map((review, index) => (
            <Box
              key={index}
              sx={{ width: '33.333%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}
            >
              <Box display="flex" justifyContent="left" mt={1}>
                {[...Array(Math.floor(review.star))].map((_, i) => (
                  <StarRounded key={i} sx={{ color: primary[500] }} />
                ))}
                {review.star % 1 !== 0 && <StarHalfRounded sx={{ color: primary[500] }} />}
              </Box>
              <Box justifyContent="left" alignItems="flex-end" mt={1}>
                <Typography variant="h6" fontWeight="bold" mb={4} color={dark[500]}>
                  {review.comment}
                </Typography>
                <Typography variant="body2" mb={0.1}>
                  <span style={{ fontWeight: 'bold', color: '#8791a5' }}>{review.username},</span>
                  <span style={{ color: '#324155' }}>&nbsp;</span>
                </Typography>
                <Typography variant="body2" mb={1}>
                  <span style={{ color: '#8791a5' }}>{DateToText(review.datetime)}</span>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <IconButton
          onClick={handleNextReviews}
          sx={{
            color: primary[500],
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.2)' },
          }}
        >
          <ArrowCircleRightRounded fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Reviews;
