import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import PeakFactor from '../cpheeo/PeakFactor';
import { Calculate } from '@mui/icons-material';


const AnimatedTextField = styled(TextField)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}));

const AnimatedFormControl = styled(FormControl)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #172aff 30%, #179eff 90%)',
  color: 'white',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'linear-gradient(45deg, #179eff 30%, #172aff 90%)',
  },
}));

const SBRForm = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    averageFlowMLD: '',
    peakFactor: '',
    minFlowFactor: '',
    SBROpeningMM: '',
    depthOfWaterInScreenM: '',
    velocityThroughScreenMPerSec: '',
    angleOfInclinationWithTheHorizontalDeg: '',
    freeBoardM: '',
    widthOfEachBarMM: '',
    widthOfEachSideWallMM: ''
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateInputs = (inputs) => {
    const errors = {};
    if (inputs.averageFlowMLD && inputs.averageFlowMLD <= 0) {
      errors.averageFlowMLD = 'Average Flow must be greater than 0';
    }
    if (inputs.minFlowFactor && inputs.minFlowFactor <= 0) {
      errors.minFlowFactor = 'Minimum Flow Factor must be greater than 0';
    }
    if (inputs.SBROpeningMM && inputs.SBROpeningMM <= 0) {
      errors.SBROpeningMM = 'Coarse Screen Opening must be greater than 0';
    }
    if (inputs.depthOfWaterInScreenM && inputs.depthOfWaterInScreenM <= 0) {
      errors.depthOfWaterInScreenM = 'Depth Of Water In Screen must be greater than 0';
    }
    if (inputs.velocityThroughScreenMPerSec && inputs.velocityThroughScreenMPerSec <= 0) {
      errors.velocityThroughScreenMPerSec = 'Velocity Through Screen must be greater than 0';
    }
    if (inputs.angleOfInclinationWithTheHorizontalDeg && inputs.angleOfInclinationWithTheHorizontalDeg <= 0) {
      errors.angleOfInclinationWithTheHorizontalDeg = 'Angle Of Inclination With The Horizontal must be greater than 0';
    }
    if (inputs.freeBoardM && inputs.freeBoardM <= 0) {
      errors.freeBoardM = 'Free Board must be greater than 0';
    }
    if (inputs.widthOfEachBarMM && inputs.widthOfEachBarMM <= 0) {
      errors.widthOfEachBarMM = 'Width Of Each Bar must be greater than 0';
    }
    if (inputs.widthOfEachSideWallMM && inputs.widthOfEachSideWallMM <= 0) {
      errors.widthOfEachSideWallMM = 'Width Of Each Side Wall must be greater than 0';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(inputs);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSnackbarOpen(true);
    } else {
      setErrors({});
      onCalculate(inputs);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        <b>Input Variables</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Average Flow (MLD)"
            name="averageFlowMLD"
            type="number"
            value={inputs.averageFlowMLD}
            onChange={handleChange}
            error={!!errors.averageFlowMLD}
            helperText={errors.averageFlowMLD}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Peak Factor</InputLabel>
            <Select
              label="Peak Factor"
              name="peakFactor"
              value={inputs.peakFactor}
              onChange={handleChange}
            >
              {PeakFactor.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.population} : {factor.value}
                </MenuItem>
              ))}
            </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Minimum Flow Factor"
            name="minFlowFactor"
            type="number"
            value={inputs.minFlowFactor}
            onChange={handleChange}
            error={!!errors.minFlowFactor}
            helperText={errors.minFlowFactor}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Coarse Screen Opening (mm)"
            name="SBROpeningMM"
            type="number"
            value={inputs.SBROpeningMM}
            onChange={handleChange}
            error={!!errors.SBROpeningMM}
            helperText={errors.SBROpeningMM}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Depth Of Water In Screen (m)"
            name="depthOfWaterInScreenM"
            type="number"
            value={inputs.depthOfWaterInScreenM}
            onChange={handleChange}
            error={!!errors.depthOfWaterInScreenM}
            helperText={errors.depthOfWaterInScreenM}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Velocity Through Screen (m/sec)"
            name="velocityThroughScreenMPerSec"
            type="number"
            value={inputs.velocityThroughScreenMPerSec}
            onChange={handleChange}
            error={!!errors.velocityThroughScreenMPerSec}
            helperText={errors.velocityThroughScreenMPerSec}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Angle Of Inclination (deg)"
            name="angleOfInclinationWithTheHorizontalDeg"
            type="number"
            value={inputs.angleOfInclinationWithTheHorizontalDeg}
            onChange={handleChange}
            error={!!errors.angleOfInclinationWithTheHorizontalDeg}
            helperText={errors.angleOfInclinationWithTheHorizontalDeg}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Free Board (m)"
            name="freeBoardM"
            type="number"
            value={inputs.freeBoardM}
            onChange={handleChange}
            error={!!errors.freeBoardM}
            helperText={errors.freeBoardM}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Width Of Each Bar (mm)"
            name="widthOfEachBarMM"
            type="number"
            value={inputs.widthOfEachBarMM}
            onChange={handleChange}
            error={!!errors.widthOfEachBarMM}
            helperText={errors.widthOfEachBarMM}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            fullWidth
            label="Width Of Each Side Wall (mm)"
            name="widthOfEachSideWallMM"
            type="number"
            value={inputs.widthOfEachSideWallMM}
            onChange={handleChange}
            error={!!errors.widthOfEachSideWallMM}
            helperText={errors.widthOfEachSideWallMM}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center'
              }
            }}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" align="center" gutterBottom>
        <AnimatedButton type="submit" variant="contained" sx={{ mt: 3 }} startIcon={<Calculate />}>
          Calculate
        </AnimatedButton>
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={Object.keys(errors).length > 0 ? 'error' : 'success'}>
          {Object.keys(errors).length > 0 ? 'Please fix the errors in the form!' : 'Calculation successful!'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SBRForm;