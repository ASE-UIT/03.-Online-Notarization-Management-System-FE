import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, IconButton, TextField, Typography, Modal } from '@mui/material';
import { Close, SendRounded } from '@mui/icons-material';
import { sendMessageToGemini } from '../services/chat.service';
import { primary } from '../config/theme/themePrimitives';
// reactmarkdown
import ReactMarkdown from 'react-markdown';

const Chatbox = ({ showChatbox, setShowChatbox }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setNewMessage('');
    setOnLoading(true);
    setShowWaitingMessage(true);
    if (newMessage.trim() !== '') {
      setMessages([...messages, { type: 'user', content: newMessage }]);
      const geminiResponse = await sendMessageToGemini(newMessage);
      setMessages([...messages, { type: 'user', content: newMessage }, { type: 'bot', content: geminiResponse }]);
      setShowWaitingMessage(false);
    }
    setOnLoading(false);
  };

  const handleClose = () => {
    setShowChatbox(false);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Modal open={showChatbox} onClose={handleClose} data-testid="chatbox-container">
        <Box
          sx={{
            width: '25vw',
            height: '60vh',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            position: 'fixed',
            bottom: '5%',
            right: '2%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              pl: 6,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Trợ lý ảo
            </Typography>
            <Button onClick={handleClose} data-testid="close-button">
              <Close />
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
            data-testid="messages-container"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: message.type === 'user' ? '#e0e0e0' : '#f0f0f0',
                  px: 1,
                  py: 0.8,
                  margin: 2,
                  borderRadius: 1,
                  maxWidth: '80%',
                  alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Typography variant="body1">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </Typography>
              </Box>
            ))}
            {showWaitingMessage && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 1,
                  margin: 2,
                  '& .dot': {
                    width: '0.5em',
                    height: '0.5em',
                    borderRadius: '50%',
                    backgroundColor: primary[500],
                    animation: 'bounce 1.4s infinite ease-in-out',
                  },
                  '& .dot:nth-of-type(1)': {
                    animationDelay: '0s',
                  },
                  '& .dot:nth-of-type(2)': {
                    animationDelay: '0.2s',
                  },
                  '& .dot:nth-of-type(3)': {
                    animationDelay: '0.4s',
                  },
                  '@keyframes bounce': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0)',
                    },
                    '40%': {
                      transform: 'scale(1.0)',
                    },
                  },
                }}
              >
                <Box className="dot" />
                <Box className="dot" />
                <Box className="dot" />
              </Box>
            )}
            <div ref={endOfMessagesRef} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Nhập tin nhắn..."
              size="small"
              disabled={onLoading}
            />
            <IconButton onClick={handleSubmit} disabled={onLoading} data-testid="send-button">
              <SendRounded fontSize="large" sx={{ color: primary[500] }} />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Chatbox;
