import React from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import ExportPDF from '../utils/ExportPDF';

const SBRDesignOutput = ({ outputs }) => {

  const handleClick = () => {
    ExportPDF('divToPrint');
  };

  const getColor = (condition) => {
    return condition ? 'green' : 'red';
  };

  const computedSRTCondition = outputs.SRTdays >= 4 && outputs.SRTdays <= 20;

  // List of output fields and labels to be rendered
  const outputFields = [
    { label: 'Influent Flow (MLD)', value: outputs.influentFlowMLD },
    { label: 'Influent Flow (m³/day)', value: outputs.influentFlowm3perday },
    { label: 'Influent Flow (m³/sec)', value: outputs.influentFlowm3persec },
    { label: 'Peak Factor', value: outputs.peakFactor },
    { label: 'Peak Flow (MLD)', value: outputs.peakFlowMLD },
    { label: 'Peak Flow (m³/day)', value: outputs.peakFlowm3perday },
    { label: 'Peak Flow (m³/sec)', value: outputs.peakFlowm3persec },
    { label: 'Temperature (°C)', value: outputs.temperatureC },
    { label: 'Reactor Mixed Liquor Concentration (mg/L)', value: outputs.reactorMixedLiquorConcentrationmgperl },
    { label: 'Influent BOD (mg/L)', value: outputs.influentBODmgperl },
    { label: 'sBOD (mg/L)', value: outputs.sBODmgperl },
    { label: 'COD (mg/L)', value: outputs.CODmgperl },
    { label: 'sCOD (mg/L)', value: outputs.sCODmgperl },
    { label: 'rbCOD (mg/L)', value: outputs.rbCODmgperl },
    { label: 'TSS (mg/L)', value: outputs.TSSmgperl },
    { label: 'VSS (mg/L)', value: outputs.VSSmgperl },
    { label: 'Number of Tanks', value: outputs.numberOfTanks },
    { label: 'Total Liquid Depth (m)', value: outputs.totalLiquidDepthm },
    { label: 'Decant Depth (%)', value: outputs.decantDepthPercentage },
    { label: 'SVI (mg/L)', value: outputs.SVImgperl },
    { label: 'Minimum DO Concentration (mg/L)', value: outputs.minimumDOConcentrationmgperl },
    { label: 'bCOD/BOD Ratio', value: outputs.bCODBODRatio },
    { label: 'Effluent TSS (mg/L)', value: outputs.effluentTSSmgperl },
    { label: 'Effluent BOD (mg/L)', value: outputs.effluentBODmgperl },
    { label: 'Effluent COD (mg/L)', value: outputs.effluentCODmgperl },
    { label: 'Estimated Effluent COD (mg/L)', value: outputs.estimatedEffluentCODmgperl },
    { label: 'µm', value: outputs.µm },
    { label: 'Ks', value: outputs.Ks },
    { label: 'kd', value: outputs.kd },
    { label: 'fd', value: outputs.fd },
    { label: 'Y', value: outputs.Y },
    { label: 'Ɵµm', value: outputs.Ɵµm },
    { label: 'ƟKs', value: outputs.ƟKs },
    { label: 'Ɵkd', value: outputs.Ɵkd },
    { label: 'bCOD (mg/L)', value: outputs.bCODmgperl },
    { label: 'nbVSS (mg/L)', value: outputs.nbVSSmgperl },
    { label: 'iTSS (mg/L)', value: outputs.iTSSmgperl },
    { label: 'Aeration Time (hrs)', value: outputs.aerationTimehrs },
    { label: 'Settling Time (hrs)', value: outputs.settlingTimehrs },
    { label: 'Decantation Time (hrs)', value: outputs.decantationTimehrs },
    { label: 'Idle Time (hrs)', value: outputs.idleTimehrs },
    { label: 'Fill Period (hrs)', value: outputs.fillPeriodhrs },
    { label: 'Total Cycle Time', value: outputs.totalCycletime },
    { label: 'Number of Cycles Per Tank Per Day', value: outputs.numberOfCyclesPerTankPerDay },
    { label: 'Total Number of Cycles Per Day', value: outputs.totalNumberOfCyclesPerDay },
    { label: 'Fill Volume Per Cycle', value: outputs.fillVolumePerCycle },
    { label: 'Settled MLSS Concentration (mg/L)', value: outputs.settledMLSSConcentrationmgperl },
    { label: 'Liquid Above Sludge (%)', value: outputs.liquidAboveSludgePercentage },
    { label: 'Ratio of Vs/Vt', value: outputs.ratioOfVsVtwithextraliquidAboveSludge },
    { label: 'Fill Fraction', value: outputs.fillFraction },
    { label: 'Decant Depth (m)', value: outputs.decantDepthm },
    { label: 'Total Volume Per Tank (m³)', value: outputs.totalVolumePerTankm3 },
    { label: 'Overall Time (hrs)', value: outputs.overallTimehrs },
    { label: 'Free Board (m)', value: outputs.freeBoardm },
    { label: 'Length to Width Ratio', value: outputs.lengthToWidthRatio },
    { label: 'Length of the Tank (m)', value: outputs.lengthOfTheTankm },
    { label: 'Width of the Tank (m)', value: outputs.widthOfTheTankm },
    { label: 'Adopted Volume of One Tank (m³)', value: outputs.adoptedVolumeOfOneTankm3 },
    { label: 'kdtC', value: outputs.kdtC },
    { label: 'pxtssSRT (g)', value: outputs.pxtssSRTg },
    { label: 'So (mg/L)', value: outputs.Somgperl },
    { label: 'SRT (days)', value: outputs.SRTdays },
    { label: 'Higher Oxygen Factor', value: outputs.higherOxygenFactor },
    { label: 'Blower Outlet Pressure (bar)', value: outputs.blowerOutletPressurebar },
    { label: 'Oxygen Needed Per Kg BOD (kg O₂/kg BOD)', value: outputs.oxygenNeededPerKgBODkgO2perkgBOD },
    { label: 'SOTR Depth Function', value: outputs.SOTRDepthFunction },
    { label: 'AOTR/SOTR Ratio', value: outputs.AOTRSOTRRatio },
    { label: 'Diffusers Depth (m)', value: outputs.diffusersDepthm },
    { label: 'Specific Weight of Water (KN/m³)', value: outputs.specificWeightOfWaterKNperm3 },
    { label: 'Oxygen Content in Air (kg/m³)', value: outputs.oxygenContentInAirKgperm3 },
    { label: 'Oxygen Content in Air (%)', value: outputs.oxygenContentInAirPercentage },
    { label: 'Diffuser Fouling Factor', value: outputs.diffuserFoulingFactor },
    { label: 'Oxygen Transfer Ratio', value: outputs.oxygenTransferRatio },
    { label: 'DO Saturation Ratio', value: outputs.DOSaturationRatio },
    { label: 'Site Elevation (m)', value: outputs.siteElevationm },
    { label: 'DO Saturation to Clean Water (mg/L)', value: outputs.DOSaturationToCleanWatermgperl },
    { label: 'DO Concentration at Design Temp (mg/L)', value: outputs.DOConcentrationDesignTempmgperl },
    { label: 'Standard Atmospheric Pressure (KN/m³)', value: outputs.standardAtmosphericPressureKNperm3 },
    { label: 'Oxygen Concentration Leaving Tank', value: outputs.oxygenConcentrationLeavingTank },
    { label: 'Fine Bubble Diffusers Efficiency (%)', value: outputs.fineBubbleDiffusersEfficiency }
  ];

  return (
    <div>
      <div id="divToPrint">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            <b>SBR Design Output</b>
          </Typography>
          <Grid container spacing={2}>
            {outputFields.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {field.label}: <b>{field.value}</b>
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <Typography variant="h4" align="center" gutterBottom>
        <Button type="submit" variant="contained" color="primary" onClick={handleClick} sx={{ mt: 3 }}>
          Download
        </Button>
      </Typography>
    </div>
  );
};

export default SBRDesignOutput;