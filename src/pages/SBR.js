import React, { useState } from 'react';
import SBRForm from '../components/SBRForm';
import SBRDesignOutput from '../components/SBRDesignOutput';
import { calculateSBRDesign } from '../utils/SBRCalculateDesign';
import { Container, CssBaseline, Typography, Paper, Box, Button } from '@mui/material';
import { blue, green } from '@mui/material/colors';

const SBR = () => {
  const [outputs, setOutputs] = useState(null);

  const handleCalculate = (inputs) => {
    const calculatedOutputs = calculateSBRDesign(inputs);
    setOutputs(calculatedOutputs);
  };

  return (
    <div className="main">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            my: 4,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0)', // transparent background
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
              width: '100%',
              maxWidth: 800,
              backgroundColor: blue[50], 
              border: `1px solid ${blue[300]}`,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${blue[500]}, ${green[500]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
              }}
            >
              <b>SBR Design Calculator</b>
            </Typography>

            <SBRForm onCalculate={handleCalculate} />
            {outputs && <SBRDesignOutput outputs={outputs} />}

            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                px: 4,
                py: 1,
                background: `linear-gradient(90deg, ${blue[600]}, ${green[500]})`,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: `linear-gradient(90deg, ${blue[700]}, ${green[600]})`,
                },
              }}
            >
              Calculate Again
            </Button>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default SBR;
