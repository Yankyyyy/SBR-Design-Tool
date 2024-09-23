import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import PeakFactor from '../cpheeo/PeakFactor';
import SBRProcessParameters from '../cpheeo/SBRProcessParameters';
import SewageParameters from '../cpheeo/SewageParameters';
import KineticCoefficients from '../cpheeo/KineticCoefficients';
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
    influentFlowMLD: '',
    peakFactor: '',
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
    higherOxygenFactor: '',
    blowerOutletPressurebar: '',
    oxygenNeededPerKgBODkgO2perkgBOD: '',
    SOTRDepthFunction: '',
    AOTRSOTRRatio: '',
    diffusersDepthm: '',
    specificWeightOfWaterKNperm3: '',
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
      'influentFlowMLD', 'temperatureC',
      'sBODmgperl', 'sCODmgperl', 'rbCODmgperl',
      'numberOfTanks', 'totalLiquidDepthm',
      'SVImgperl', 'minimumDOConcentrationmgperl', 'effluentTSSmgperl',
      'effluentBODmgperl', 'effluentCODmgperl',
      'aerationTimehrs', 'settlingTimehrs', 'decantationTimehrs', 'idleTimehrs',
      'freeBoardm', 'higherOxygenFactor',
      'blowerOutletPressurebar', 'oxygenNeededPerKgBODkgO2perkgBOD',
      'diffusersDepthm', 'specificWeightOfWaterKNperm3',
      'oxygenContentInAirKgperm3', 'siteElevationm', 'DOSaturationToCleanWatermgperl',
      'DOConcentrationDesignTempmgperl', 'standardAtmosphericPressureKNperm3',
      'fineBubbleDiffusersEfficiency'
    ];

    positiveFields.forEach(field => {
      if (inputs[field] && parseFloat(inputs[field]) < 0) {
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

    if (inputs.bCODBODRatio && (parseFloat(inputs.bCODBODRatio) < 0)) {
      errors.bCODBODRatio = 'bCOD/BOD ratio must be greater than 0';
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
            name="influentFlowMLD"
            type="number"
            value={inputs.influentFlowMLD}
            onChange={handleChange}
            error={!!errors.influentFlowMLD}
            helperText={errors.influentFlowMLD}
            InputProps={{ inputProps: { step: 0.01 } }}
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
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
            </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Influent BOD (mg/l)</InputLabel>
            <Select
              label="Influent BOD (mg/l)"
              name="influentBODmgperl"
              value={inputs.influentBODmgperl}
              onChange={handleChange}
            >
              {SewageParameters.map((factor) => (
                <MenuItem key={factor.id} value={factor.concentration}>
                  {factor.item} : {factor.concentration}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="sBOD (mg/l)"
            name="sBODmgperl"
            type="number"
            value={inputs.sBODmgperl}
            onChange={handleChange}
            error={!!errors.sBODmgperl}
            helperText={errors.sBODmgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>COD (mg/l)</InputLabel>
            <Select
              label="COD (mg/l)"
              name="CODmgperl"
              value={inputs.CODmgperl}
              onChange={handleChange}
            >
              {SewageParameters.map((factor) => (
                <MenuItem key={factor.id} value={factor.concentration}>
                  {factor.item} : {factor.concentration}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="sCOD (mg/l)"
            name="sCODmgperl"
            type="number"
            value={inputs.sCODmgperl}
            onChange={handleChange}
            error={!!errors.sCODmgperl}
            helperText={errors.sCODmgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="rbCOD (mg/l)"
            name="rbCODmgperl"
            type="number"
            value={inputs.rbCODmgperl}
            onChange={handleChange}
            error={!!errors.rbCODmgperl}
            helperText={errors.rbCODmgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>TSS (mg/l)</InputLabel>
            <Select
              label="TSS (mg/l)"
              name="TSSmgperl"
              value={inputs.TSSmgperl}
              onChange={handleChange}
            >
              {SewageParameters.map((factor) => (
                <MenuItem key={factor.id} value={factor.concentration}>
                  {factor.item} : {factor.concentration}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>VSS (mg/l)</InputLabel>
            <Select
              label="VSS (mg/l)"
              name="VSSmgperl"
              value={inputs.VSSmgperl}
              onChange={handleChange}
            >
              {SewageParameters.map((factor) => (
                <MenuItem key={factor.id} value={factor.concentration}>
                  {factor.item} : {factor.concentration}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Number of Tanks"
            name="numberOfTanks"
            type="number"
            value={inputs.numberOfTanks}
            onChange={handleChange}
            error={!!errors.numberOfTanks}
            helperText={errors.numberOfTanks}
            InputProps={{ inputProps: { step: 1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Total Liquid Depth (m)"
            name="totalLiquidDepthm"
            type="number"
            value={inputs.totalLiquidDepthm}
            onChange={handleChange}
            error={!!errors.totalLiquidDepthm}
            helperText={errors.totalLiquidDepthm}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Decant Depth Percentage (%)"
            name="decantDepthPercentage"
            type="number"
            value={inputs.decantDepthPercentage}
            onChange={handleChange}
            error={!!errors.decantDepthPercentage}
            helperText={errors.decantDepthPercentage}
            InputProps={{ inputProps: { step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="SVI (mg/l)"
            name="SVImgperl"
            type="number"
            value={inputs.SVImgperl}
            onChange={handleChange}
            error={!!errors.SVImgperl}
            helperText={errors.SVImgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Minimum DO Concentration (mg/l)"
            name="minimumDOConcentrationmgperl"
            type="number"
            value={inputs.minimumDOConcentrationmgperl}
            onChange={handleChange}
            error={!!errors.minimumDOConcentrationmgperl}
            helperText={errors.minimumDOConcentrationmgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="bCOD/BOD Ratio"
            name="bCODBODRatio"
            type="number"
            value={inputs.bCODBODRatio}
            onChange={handleChange}
            error={!!errors.bCODBODRatio}
            helperText={errors.bCODBODRatio}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>µ (mg/l)</InputLabel>
            <Select
              label="µ (mg/l)"
              name="µm"
              value={inputs.µm}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Ks (mg/l)</InputLabel>
            <Select
              label="Ks (mg/l)"
              name="Ks"
              value={inputs.Ks}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>kd (mg/l)</InputLabel>
            <Select
              label="kd (mg/l)"
              name="kd"
              value={inputs.kd}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>fd</InputLabel>
            <Select
              label="fd"
              name="fd"
              value={inputs.fd}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Y (mg/l)</InputLabel>
            <Select
              label="Y (mg/l)"
              name="Y"
              value={inputs.Y}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Ɵµm</InputLabel>
            <Select
              label="Ɵµm"
              name="Ɵµm"
              value={inputs.Ɵµm}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>ƟKs</InputLabel>
            <Select
              label="ƟKs"
              name="ƟKs"
              value={inputs.ƟKs}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedFormControl fullWidth required>
            <InputLabel>Ɵkd</InputLabel>
            <Select
              label="Ɵkd"
              name="Ɵkd"
              value={inputs.Ɵkd}
              onChange={handleChange}
            >
              {KineticCoefficients.map((factor) => (
                <MenuItem key={factor.id} value={factor.value}>
                  {factor.parameters} : {factor.value}
                </MenuItem>
              ))}
          </Select>
          </AnimatedFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Aeration Time (hrs)"
            name="aerationTimehrs"
            type="number"
            value={inputs.aerationTimehrs}
            onChange={handleChange}
            error={!!errors.aerationTimehrs}
            helperText={errors.aerationTimehrs}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Settling Time (hrs)"
            name="settlingTimehrs"
            type="number"
            value={inputs.settlingTimehrs}
            onChange={handleChange}
            error={!!errors.settlingTimehrs}
            helperText={errors.settlingTimehrs}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Decantation Time (hrs)"
            name="decantationTimehrs"
            type="number"
            value={inputs.decantationTimehrs}
            onChange={handleChange}
            error={!!errors.decantationTimehrs}
            helperText={errors.decantationTimehrs}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Idle Time (hrs)"
            name="idleTimehrs"
            type="number"
            value={inputs.idleTimehrs}
            onChange={handleChange}
            error={!!errors.idleTimehrs}
            helperText={errors.idleTimehrs}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Liquid Above Sludge Percentage (%)"
            name="liquidAboveSludgePercentage"
            type="number"
            value={inputs.liquidAboveSludgePercentage}
            onChange={handleChange}
            error={!!errors.liquidAboveSludgePercentage}
            helperText={errors.liquidAboveSludgePercentage}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Free Board (m)"
            name="freeBoardm"
            type="number"
            value={inputs.freeBoardm}
            onChange={handleChange}
            error={!!errors.freeBoardm}
            helperText={errors.freeBoardm}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Length to Width Ratio"
            name="lengthToWidthRatio"
            type="number"
            value={inputs.lengthToWidthRatio}
            onChange={handleChange}
            error={!!errors.lengthToWidthRatio}
            helperText={errors.lengthToWidthRatio}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Higher Oxygen Factor"
            name="higherOxygenFactor"
            type="number"
            value={inputs.higherOxygenFactor}
            onChange={handleChange}
            error={!!errors.higherOxygenFactor}
            helperText={errors.higherOxygenFactor}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Blower Outlet Pressure (bar)"
            name="blowerOutletPressurebar"
            type="number"
            value={inputs.blowerOutletPressurebar}
            onChange={handleChange}
            error={!!errors.blowerOutletPressurebar}
            helperText={errors.blowerOutletPressurebar}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Oxygen Needed per kg BOD (kg O2/kg BOD)"
            name="oxygenNeededPerKgBODkgO2perkgBOD"
            type="number"
            value={inputs.oxygenNeededPerKgBODkgO2perkgBOD}
            onChange={handleChange}
            error={!!errors.oxygenNeededPerKgBODkgO2perkgBOD}
            helperText={errors.oxygenNeededPerKgBODkgO2perkgBOD}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="SOTR Depth Function"
            name="SOTRDepthFunction"
            type="number"
            value={inputs.SOTRDepthFunction}
            onChange={handleChange}
            error={!!errors.SOTRDepthFunction}
            helperText={errors.SOTRDepthFunction}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="AOTR/SOTR Ratio"
            name="AOTRSOTRRatio"
            type="number"
            value={inputs.AOTRSOTRRatio}
            onChange={handleChange}
            error={!!errors.AOTRSOTRRatio}
            helperText={errors.AOTRSOTRRatio}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Diffusers Depth (m)"
            name="diffusersDepthm"
            type="number"
            value={inputs.diffusersDepthm}
            onChange={handleChange}
            error={!!errors.diffusersDepthm}
            helperText={errors.diffusersDepthm}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Specific Weight of Water (kN/m3)"
            name="specificWeightOfWaterKNperm3"
            type="number"
            value={inputs.specificWeightOfWaterKNperm3}
            onChange={handleChange}
            error={!!errors.specificWeightOfWaterKNperm3}
            helperText={errors.specificWeightOfWaterKNperm3}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Oxygen Content in Air (kg/m3)"
            name="oxygenContentInAirKgperm3"
            type="number"
            value={inputs.oxygenContentInAirKgperm3}
            onChange={handleChange}
            error={!!errors.oxygenContentInAirKgperm3}
            helperText={errors.oxygenContentInAirKgperm3}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Percentage Oxygen Content in Air (%)"
            name="oxygenContentInAirPercentage"
            type="number"
            value={inputs.oxygenContentInAirPercentage}
            onChange={handleChange}
            error={!!errors.oxygenContentInAirPercentage}
            helperText={errors.oxygenContentInAirPercentage}
            InputProps={{ inputProps: { step: 0.1 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Diffuser Fouling Factor"
            name="diffuserFoulingFactor"
            type="number"
            value={inputs.diffuserFoulingFactor}
            onChange={handleChange}
            error={!!errors.diffuserFoulingFactor}
            helperText={errors.diffuserFoulingFactor}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Oxygen Transfer Ratio"
            name="oxygenTransferRatio"
            type="number"
            value={inputs.oxygenTransferRatio}
            onChange={handleChange}
            error={!!errors.oxygenTransferRatio}
            helperText={errors.oxygenTransferRatio}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="DO Saturation Ratio"
            name="DOSaturationRatio"
            type="number"
            value={inputs.DOSaturationRatio}
            onChange={handleChange}
            error={!!errors.DOSaturationRatio}
            helperText={errors.DOSaturationRatio}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Site Elevation (m)"
            name="siteElevationm"
            type="number"
            value={inputs.siteElevationm}
            onChange={handleChange}
            error={!!errors.siteElevationm}
            helperText={errors.siteElevationm}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="DO Saturation to Clean Water (mg/l)"
            name="DOSaturationToCleanWatermgperl"
            type="number"
            value={inputs.DOSaturationToCleanWatermgperl}
            onChange={handleChange}
            error={!!errors.DOSaturationToCleanWatermgperl}
            helperText={errors.DOSaturationToCleanWatermgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="DO Concentration Design Temp (mg/l)"
            name="DOConcentrationDesignTempmgperl"
            type="number"
            value={inputs.DOConcentrationDesignTempmgperl}
            onChange={handleChange}
            error={!!errors.DOConcentrationDesignTempmgperl}
            helperText={errors.DOConcentrationDesignTempmgperl}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Standard Atmospheric Pressure (kN/m3)"
            name="standardAtmosphericPressureKNperm3"
            type="number"
            value={inputs.standardAtmosphericPressureKNperm3}
            onChange={handleChange}
            error={!!errors.standardAtmosphericPressureKNperm3}
            helperText={errors.standardAtmosphericPressureKNperm3}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Percentage Oxygen Concentration Leaving Tank (%)"
            name="oxygenConcentrationLeavingTank"
            type="number"
            value={inputs.oxygenConcentrationLeavingTank}
            onChange={handleChange}
            error={!!errors.oxygenConcentrationLeavingTank}
            helperText={errors.oxygenConcentrationLeavingTank}
            InputProps={{ inputProps: { step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimatedTextField
            required
            fullWidth
            label="Fine Bubble Diffusers Efficiency (%)"
            name="fineBubbleDiffusersEfficiency"
            type="number"
            value={inputs.fineBubbleDiffusersEfficiency}
            onChange={handleChange}
            error={!!errors.fineBubbleDiffusersEfficiency}
            helperText={errors.fineBubbleDiffusersEfficiency}
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