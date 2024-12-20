import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Collapse, IconButton, Container } from '@mui/material';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import { black, dark, primary, white } from '../../config/theme/themePrimitives';

const Guide = () => {
  const [currentStep, setCurrentStep] = useState(-1);

  const guides = [
    {
      description:
        'Simply book a notary appointment online, register on our platform, have your notary appointment via a secure video call, and receive your digitally notarised documents if needed with an apostille seconds after the session ends',
      details: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ],
    },
    {
      description:
        'Simply book a notary appointment online, register on our platform, have your notary appointment via a secure video call, and receive your digitally notarised documents if needed with an apostille seconds after the session ends',
      details: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ],
    },
    {
      description:
        'Simply book a notary appointment online, register on our platform, have your notary appointment via a secure video call, and receive your digitally notarised documents if needed with an apostille seconds after the session ends',
      details: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ],
    },
    {
      description:
        'Simply book a notary appointment online, register on our platform, have your notary appointment via a secure video call, and receive your digitally notarised documents if needed with an apostille seconds after the session ends',
      details: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ],
    },
  ];

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % guides.length);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const toggleExpand = (index) => {
    setCurrentStep(currentStep === index ? -1 : index);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        py: 4,
      }}
    >
      <Box
        flex={1}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 100,
              fontWeight: 600,
            }}
            component="span"
          >
            0{currentStep + 1}
          </Typography>
          <Typography
            sx={{
              fontSize: 50,
              fontWeight: 400,
            }}
            component="span"
          >
            /
          </Typography>

          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 200,
            }}
            component="span"
          >
            0{guides.length}
          </Typography>
        </Box>
        <Typography variant="h6">Cách hoạt động</Typography>
        <Typography variant="body2" mt={1} mr={10}>
          {guides[currentStep]?.description}
        </Typography>
        <Box display="flex" mt={5} gap={2}>
          <IconButton
            onClick={handlePrevStep}
            sx={{
              color: black[900],
              border: 1,
              '&: hover': {
                color: primary[500],
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowBackIosNewRounded fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNextStep}
            sx={{
              color: black[900],
              border: 1,
              '&: hover': {
                color: primary[500],
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowForwardIosRounded fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box
        flex={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <List>
          {guides.map((guide, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 1,
                p: 2,
                backgroundColor: currentStep === index ? primary[50] : white[50],
              }}
            >
              <ListItem button sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                <IconButton
                  sx={{ cursor: 'pointer', p: 0 }}
                  onClick={() => {
                    toggleExpand(index);
                  }}
                >
                  {currentStep === index ? (
                    <KeyboardArrowRightRounded
                      sx={{
                        color: dark[500],
                        borderRadius: 100,
                        backgroundColor: white[50],
                        p: 1,
                      }}
                      fontSize="large"
                    />
                  ) : (
                    <KeyboardArrowDownRounded
                      sx={{
                        color: dark[500],
                        borderRadius: 100,
                        p: 1,
                      }}
                      fontSize="large"
                    />
                  )}
                </IconButton>

                <ListItemText
                  primary={`Bước ${index + 1}`}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: dark[500],
                    ml: 2,
                  }}
                  sx={{ cursor: 'default', padding: 0, width: '80%' }}
                />
              </ListItem>

              <Collapse in={currentStep === index}>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 2,
                    fontSize: 18,
                    color: dark[500],
                    cursor: 'default',
                  }}
                >
                  {guide.details[0]}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mx: 2,
                    my: 2,
                    fontSize: 18,
                    color: dark[500],
                    cursor: 'default',
                  }}
                >
                  {guide.details[1]}
                </Typography>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Guide;
