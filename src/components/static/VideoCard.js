import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useInView } from 'react-intersection-observer'

const VideoCard = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <Paper
            ref={ref}
            sx={{
                display: "flex",
                flexDirection: "row",
                width: 900,
                height: 350,
                alignItems: "center",
                justifyContent: "center",
                paddingX: 6,
                paddingY: 2,
                borderRadius: 2,
                overflow: "hidden",
                gap: 3,
                //boxShadow: "0px 0px 10px 0px rgba(210, 213, 219)",
                boxShadow: "0px 0px 10px 0px rgba(229, 231, 234)",
                '&:hover': {
                    boxShadow: "0px 0px 20px 0px rgba(221, 166, 177, 0.50)",
                },
                transform: inView ? 'translateY(0)' : 'translateY(150px)',
                opacity: inView ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
            }}
        >
            {/* Step Content */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: 1,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "100%",
                        gap: 3,
                    }}
                >
                    <Typography variant="h5" color="textPrimary">
                        Bạn vẫn còn thắc mắc?<br />Hãy xem video hướng dẫn này.
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Video hướng dẫn sử dụng dịch vụ công chứng trực tuyến của chúng tôi.
                    </Typography>
                </Box>
            </Box>
            {/* Video */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <video
                    src='https://youtu.be/35KDnej1hlI?si=C8QJyPy5tlLLtQUa'
                    controls
                    preload='metadata'
                    controlsList='nodownload'
                    data-testid = 'tutorial-video'
                    width={400}
                    height={225}
                    style={{ borderRadius: 8 }}
                />
            </Box>
        </Paper>
    )
}

export default VideoCard