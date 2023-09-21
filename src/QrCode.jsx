import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  IconButton,
} from '@mui/material';
import QRCode from 'qrcode.react';
import ShareIcon from '@mui/icons-material/Share';

function QrCode() {
  const [text, setText] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (isLoading) {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(loadingTimer);
    }
  }, [isLoading]);

  const generateQRCode = () => {
    if (text.trim() === '') {
      setError('Please enter text, URL, or contact name.');
    } else {
      setError('');
      setIsLoading(true);
      setQRCodeValue(text);
    }
  };

  const generateContactQRCode = () => {
    if (text.trim() === '') {
      setError('Please enter contact name.');
    } else {
      
      const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${text}
END:VCARD`;

      setError('');
      setIsLoading(true);
      setQRCodeValue(vCard);
    }
  };

  const handleShareClick = () => {

    if (navigator.share) {
      navigator.share({
        title: 'QR Code',
        text: 'Check out this QR code!',
        url: qrCodeValue, 
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Sharing failed:', error));
    } else {
      console.log('Web Share API not supported');
    }
  };


  return (<>

      <Container maxWidth='xl' style={{backgroundColor: '', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="sm" >
          <Paper elevation={3} style={{
            padding: '20px',
            marginTop: '20px',
            backgroundColor: '#283048',
            color: '#fff',            
            transition: 'transform 0.3s ease-out',
            transform: isLoading ? 'scale(0.95)' : 'scale(1)',
          }}>
            <Typography variant="h4" align="center" gutterBottom>
              QR Code Generator
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              sx={{ fontStyle: 'italic' }}
            >
              Generate and share QR codes easily!
            </Typography>
            <TextField
              label="Enter text, URL, or contact number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
              error={!!error}
              helperText={error}
              inputProps={{ style: { color: 'white' } }} 
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={generateQRCode}
              style={{ marginBottom: '10px', backgroundColor: '#3f51b5', color: '#fff' }}
              sx={{ '&:hover': { backgroundColor: '#303f9f' } }}
            >
              Generate Text QR Code
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={generateContactQRCode}
              style={{ backgroundColor: '#f50057', color: '#fff' }}
              sx={{ '&:hover': { backgroundColor: '#c51162' } }}
            >
              Generate Contact QR Code
            </Button>
            <Container maxWidth='xl' style={{ marginTop: '20px', textAlign: 'center', background: '#fff', padding: '10px' }}>
              {isLoading ? (
                <div className="loading-bubbles"></div> 
              ) : qrCodeValue && (
                <>
                  <QRCode value={qrCodeValue} size={256} />
                  <IconButton onClick={handleShareClick} style={{ marginTop: '10px', color: '#fff' }}>
                    <ShareIcon />
                  </IconButton>
                </>
              )}
            </Container>
          </Paper>
        </Container>     
    </Container>
  </>
);
}

export default QrCode;
