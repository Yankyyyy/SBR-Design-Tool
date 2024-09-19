import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import PeakFactor from '../cpheeo/PeakFactor';
import SBRProcessParameters from '../cpheeo/SBRProcessParameters';
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
    inflowFlowMLD: '',
    peakfactor: '',
    temperatureC: '',
    reactorMixedLiquorConcentrationmgperl: '',
    influentBODmgperl: '',
    sBODmgperl: '',
    CODmgperl: '',
    sCODmgperl: '',
    rbCODmgperl: '',
    TSSmgperl: '',
    VSSmgperl: '',
    numberOfTanks: '',
    totalLiquidDepthm: '',
    decantDepthPercentage: '',
    SVImgperl: '',
    minimumDOConcentrationmgperl: '',
    bCODBODRatio: '',
    effluentTSSmgperl: '',
    effluentBODmgperl: '',
    effluentCODmgperl: '',
    µm: '',
    Ks: '',
    kd: '',
    fd: '',
    Y: '',
    Ɵµm: '',
    ƟKs: '',
    Ɵkd: '',
    aerationTimehrs: '',
    settlingTimehrs: '',
    decantationTimehrs: '',
    idleTimehrs: '',
    liquidAboveSludgePercentage: '',
    freeBoardm: '',
    lengthToWidthRatio: '',
    solidsRetentionTimeday: '',
    higherOxygenFactor: '',
    blowerOutletPressurebar: '',
    oxygenNeededPerKgBODkgO2perkgBOD: '',
    SOTRDepthFunction: '',
    AOTRSOTRRatio: '',
    diffusersDepthm: '',
    specificWeightOfWaterKNperm3: '',
    designTemperatureC: '',
    oxygenContentInAirKgperm3: '',
    oxygenContentInAirPercentage: '',
    diffuserFoulingFactor: '',
    oxygenTransferRatio: '',
    DOSaturationRatio: '',
    siteElevationm: '',
    DOSaturationToCleanWatermgperl: '',
    DOConcentrationDesignTempmgperl: '',
    standardAtmosphericPressureKNperm3: '',
    oxygenConcentrationLeavingTank: '',
    fineBubbleDiffusersEfficiency: '',
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
    const positiveFields = [
      'inflowFlowMLD', 'temperatureC', 'reactorMixedLiquorConcentrationmgperl',
      'influentBODmgperl', 'sBODmgperl', 'CODmgperl', 'sCODmgperl', 'rbCODmgperl',
      'TSSmgperl', 'VSSmgperl', 'numberOfTanks', 'totalLiquidDepthm',
      'SVImgperl', 'minimumDOConcentrationmgperl', 'effluentTSSmgperl',
      'effluentBODmgperl', 'effluentCODmgperl', 'µm', 'Ks', 'kd', 'Y',
      'aerationTimehrs', 'settlingTimehrs', 'decantationTimehrs', 'idleTimehrs',
      'freeBoardm', 'solidsRetentionTimeday', 'higherOxygenFactor',
      'blowerOutletPressurebar', 'oxygenNeededPerKgBODkgO2perkgBOD',
      'diffusersDepthm', 'specificWeightOfWaterKNperm3', 'designTemperatureC',
      'oxygenContentInAirKgperm3', 'siteElevationm', 'DOSaturationToCleanWatermgperl',
      'DOConcentrationDesignTempmgperl', 'standardAtmosphericPressureKNperm3',
      'fineBubbleDiffusersEfficiency'
    ];

    positiveFields.forEach(field => {
      if (inputs[field] && parseFloat(inputs[field]) <= 0) {
        errors[field] = `${field} must be greater than 0`;
      }
    });

    const percentageFields = [
      'decantDepthPercentage', 'liquidAboveSludgePercentage',
      'oxygenContentInAirPercentage'
    ];

    percentageFields.forEach(field => {
      if (inputs[field] && (parseFloat(inputs[field]) < 0 || parseFloat(inputs[field]) > 100)) {
        errors[field] = `${field} must be between 0 and 100`;
      }
    });

    if (inputs.bCODBODRatio && (parseFloat(inputs.bCODBODRatio) < 0 || parseFloat(inputs.bCODBODRatio) > 1)) {
      errors.bCODBODRatio = 'bCOD/BOD ratio must be between 0 and 1';
    }

    if (inputs.fd && (parseFloat(inputs.fd) < 0 || parseFloat(inputs.fd) > 1)) {
      errors.fd = 'fd must be between 0 and 1';
    }

    if (inputs.lengthToWidthRatio && parseFloat(inputs.lengthToWidthRatio) < 1) {
      errors.lengthToWidthRatio = 'Length to width ratio must be 1 or greater';
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
            label="Inflow Flow (MLD)"
            name="inflowFlowMLD"
            type="number"
            value={inputs.inflowFlowMLD}
            onChange={handleChange}
            error={!!errors.inflowFlowMLD}
            helperText={errors.inflowFlowMLD}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Peak Factor</InputLabel>
            <Select
              label="Peak Factor"
              name="peakfactor"
              value={inputs.peakfactor}
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
            label="Temperature (°C)"
            name="temperatureC"
            type="number"
            value={inputs.temperatureC}
            onChange={handleChange}
            error={!!errors.temperatureC}
            helperText={errors.temperatureC}
            InputProps={{ inputProps: { step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Reactor mixed liquor concentration (mg/l)</InputLabel>
            <Select
              label="Reactor mixed liquor concentration (mg/l)"
              name="reactorMixedLiquorConcentrationmgperl"
              value={inputs.reactorMixedLiquorConcentrationmgperl}
              onChange={handleChange}
            >
              {SBRProcessParameters.map((factor) => (
                <MenuItem key={factor.id} value={factor.intermittentFlowandIntermittentDecant}>
                  {factor.parameters} : {factor.intermittentFlowandIntermittentDecant}
                </MenuItem>
              ))}
            </Select>
          </AnimatedFormControl>
        </Grid>
        {Object.entries(inputs).map(([key, value]) => {
          if (!['inflowFlowMLD', 'peakfactor', 'temperatureC', 'reactorMixedLiquorConcentrationmgperl'].includes(key)) {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <AnimatedTextField
                  required
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  name={key}
                  type="number"
                  value={value}
                  onChange={handleChange}
                  error={!!errors[key]}
                  helperText={errors[key]}
                  InputProps={{ inputProps: { step: 0.01 } }}
                />
              </Grid>
            );
          }
          return null;
        })}
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