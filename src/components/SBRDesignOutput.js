import React from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import { exportToPDF, exportToExcel } from '../utils/ExportPDF';

const SBRDesignOutput = ({ outputs }) => {

  const title = "SBR Design Output";

  const getColor = (condition) => {
    return condition ? 'green' : 'red';
  };

  const computedSRTCondition = outputs.SRTdays >= 4 && outputs.SRTdays <= 20;
  const fillFractionCondition = outputs.fillFraction > outputs.decantDepthPercentage * 0.01;

  // List of output fields and labels to be rendered
  const outputFields = [
    { label: 'INPUT DATA AND SEWAGE CHARACTERISTICS' },
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
    { label: 'DESIGN PARAMETERS AND ASSUMPTIONS' },
    { label: 'Number of Tanks', value: outputs.numberOfTanks },
    { label: 'Total Liquid Depth (m)', value: outputs.totalLiquidDepthm },
    { label: 'Decant Depth (%)', value: outputs.decantDepthPercentage },
    { label: 'SVI (mg/L)', value: outputs.SVImgperl },
    { label: 'Minimum DO Concentration (mg/L)', value: outputs.minimumDOConcentrationmgperl },
    { label: 'bCOD/BOD Ratio', value: outputs.bCODBODRatio },
    { label: 'Blower Outlet Pressure (bar)', value: outputs.blowerOutletPressurebar },
    { label: 'EFFLUENT STANDARDS' },
    { label: 'Effluent TSS (mg/L)', value: outputs.effluentTSSmgperl },
    { label: 'Effluent BOD (mg/L)', value: outputs.effluentBODmgperl },
    { label: 'Effluent COD (mg/L)', value: outputs.effluentCODmgperl },
    { label: 'Estimated Effluent COD (mg/L)', value: outputs.estimatedEffluentCODmgperl },
    { label: 'STANDARD KINETIC COEFFICIENTS' },
    { label: 'µm', value: outputs.µm },
    { label: 'Ks', value: outputs.Ks },
    { label: 'kd', value: outputs.kd },
    { label: 'fd', value: outputs.fd },
    { label: 'Y', value: outputs.Y },
    { label: 'Ɵ VALUES' },
    { label: 'Ɵµm', value: outputs.Ɵµm },
    { label: 'ƟKs', value: outputs.ƟKs },
    { label: 'Ɵkd', value: outputs.Ɵkd },
    { label: 'WASTEWATER DESIGN PARAMETERS' },
    { label: 'bCOD (mg/L)', value: outputs.bCODmgperl },
    { label: 'nbVSS Concentration, bpCOD/pCOD', value: outputs.nbVSSConcentrationmgperl },
    { label: 'nbVSS (mg/L)', value: outputs.nbVSSmgperl },
    { label: 'iTSS (mg/L)', value: outputs.iTSSmgperl },
    { label: 'CHOICE OF SBR OPERATING CYCLE' },
    { label: 'Reaction or Aeration time, tA (hrs)', value: outputs.aerationTimehrs },
    { label: 'Settling time, tS (hrs)', value: outputs.settlingTimehrs },
    { label: 'Decantation time, tD (hrs)', value: outputs.decantationTimehrs },
    { label: 'Idle time, tI (hrs)', value: outputs.idleTimehrs },
    { label: 'Fill period, tF for each tank (hrs)', value: outputs.fillPeriodhrs },
    { label: 'Total cycle time, Tc (hrs)', value: outputs.totalCycletimehrs },
    { label: 'Number of Cycles Per Tank Per Day', value: outputs.numberOfCyclesPerTankPerDay },
    { label: 'Total Number of Cycles Per Day', value: outputs.totalNumberOfCyclesPerDay },
    { label: 'Fill Volume Per Cycle (m³)', value: outputs.fillVolumePerCyclem3 },
    { label: 'FILL FRACTION' },
    { label: 'Settled MLSS Concentration, XS based on the SVI value (mg/L)', value: outputs.settledMLSSConcentrationmgperl },
    { label: 'Liquid Above Sludge (%)', value: outputs.liquidAboveSludgePercentage },
    { label: 'Ratio of Vs/Vt', value: outputs.ratioOfVsVtwithextraliquidAboveSludge },
    { label: 'Fill Fraction', value: outputs.fillFraction },
    { label: 'Decant Depth (m)', value: outputs.decantDepthm },
    { label: 'Total Volume Per Tank, VT (m³)', value: outputs.totalVolumePerTankm3 },
    { label: 'Overall Time, τ (hrs)', value: outputs.overallTimehrs },
    { label: 'TANK DIMENSIONS' },
    { label: 'Free Board (m)', value: outputs.freeBoardm },
    { label: 'Total tank depth (m)', value: outputs.totalTankDepthm },
    { label: 'Length to Width Ratio', value: outputs.lengthToWidthRatio },
    { label: 'Length of the Tank (m)', value: outputs.lengthOfTheTankm },
    { label: 'Width of the Tank (m)', value: outputs.widthOfTheTankm },
    { label: 'Adopted Volume of One Tank (m³)', value: outputs.adoptedVolumeOfOneTankm3 },
    { label: 'SOLIDS RETENTION TIME (SRT)' },
    { label: 'kd @ Given Temperature, kdt (C)', value: outputs.kdtC },
    { label: '(PX,TSS)SRT = VT * XMLSS (g)', value: outputs.pxtssSRTg },
    { label: 'Assume So = So - S (mg/L)', value: outputs.Somgperl },
    { label: 'SRT (Obtained by solving Equation 8.16 of Metcalf and Eddy) (days)', value: outputs.SRTdays },
    { label: 'MLVSS CONCENTRATION' },
    { label: '(PX,VSS)SRT = VT * XMLVSS (g/day)', value: outputs.pxvssSRTgperday },
    { label: 'XMLVSS (MLVSS Concentration) (mg/l)', value: outputs.Xmlvssmgperl },
    { label: 'Fraction of MLVSS(XMLVSS/XMLSS)', value: outputs.XmlvssXmlssRatio },
    { label: 'BIOMASS AS VSS WASTED PER DAY' },
    { label: 'PX,BIO (g/day)', value: outputs.Pxbiogperday },
    { label: 'DECANT PUMPING RATE' },
    { label: 'Decant pumping rate (m³/min)', value: outputs.decantPumpingRatem3permin },
    { label: 'OXYGEN REQUIRED PER TANK' },
    { label: 'Oxygen required per tank (Kg/day/tank)', value: outputs.Rokgperdaypertank },
    { label: 'Total aeration time (hrs/day)', value: outputs.totalAerationTimehrsperday },
    { label: 'Average oxygen transfer rate (Kg/hour)', value: outputs.averageOxygenTransferRatekgperhour },
    { label: 'Higher Oxygen Factor', value: outputs.higherOxygenFactor },
    { label: 'Practical average oxygen transfer rate (Kg/hour)', value: outputs.practicalAverageOxygenTransferRatekgperhour },
    { label: 'SLUDGE PRODUCTION' },
    { label: 'PX,TSS Sludge production rate (kg/day)', value: outputs.Pxtsskgperday },
    { label: 'bCOD Removal rate (kg/day)', value: outputs.bCODRemovalRatekgperday },
    { label: 'BOD Removal rate (kg/day)', value: outputs.BODRemovalRatekgperday },
    { label: 'TSS Observed Yeild (g TSS/gBOD)', value: outputs.TSSObservedYeild },
    { label: 'VSS Observed Yeild (g VSS/gTSS)', value: outputs.VSSObservedYeild },
    { label: 'TSS/bCOD Observed yield (g TSS / gbCOD)', value: outputs.TSSbCODRatioObservedYeild },
    { label: 'Sludge wasting rate from full tank at MLSS concentration (m³/day)', value: outputs.sludgeWastingRateFromFullTankm3perday },
    { label: 'Sludge wasting rate from settled sludge (m³/day)', value: outputs.sludgeWastingRateFromSettledSludgem3perday },
    { label: 'F/M AND BOD VOLUMETRIC LOADING' },
    { label: 'F/M Ratio', value: outputs.FMRatio },
    { label: 'BOD Volumetric Loading', value: outputs.BODVolumetricLoading },
    { label: 'DIFFUSER DATA' },
    { label: 'Oxygen Needed Per Kg BOD (kg O₂/kg BOD)', value: outputs.oxygenNeededPerKgBODkgO2perkgBOD },
    { label: 'SOTE Depth Function', value: outputs.SOTEDepthFunction },
    { label: 'AOTE/SOTE Ratio', value: outputs.AOTESOTERatio },
    { label: 'Level of Diffusers (m)', value: outputs.levelOfDiffusersm },
    { label: 'Diffusers Depth (m)', value: outputs.diffusersDepthm },
    { label: 'Specific Weight of Water at design Temp (KN/m³)', value: outputs.specificWeightOfWaterKNperm3 },
    { label: 'Oxygen Content in Air (kg/m³)', value: outputs.oxygenContentInAirKgperm3 },
    { label: 'Oxygen Content in Air (%)', value: outputs.oxygenContentInAirPercentage },
    { label: 'Diffuser Fouling Factor', value: outputs.diffuserFoulingFactor },
    { label: 'Oxygen Transfer Ratio', value: outputs.oxygenTransferRatio },
    { label: 'DO Saturation Ratio', value: outputs.DOSaturationRatio },
    { label: 'Site Elevation (m)', value: outputs.siteElevationm },
    { label: 'DO Saturation in Clean Water (mg/L)', value: outputs.DOSaturationinCleanWatermgperl },
    { label: 'DO Concentration at Design Temp (mg/L)', value: outputs.DOConcentrationDesignTempmgperl },
    { label: 'Standard Atmospheric Pressure (KN/m³)', value: outputs.standardAtmosphericPressureKNperm3 },
    { label: 'Oxygen Concentration Leaving Tank', value: outputs.oxygenConcentrationLeavingTank },
    { label: 'Fine Bubble Diffusers Efficiency (%)', value: outputs.fineBubbleDiffusersEfficiency },
    { label: 'AIR FLOW RATE AS PER RULE OF THUMB' },
    { label: 'Oxygen Requirement a per rule of thumb', value: outputs.ruleOfThumbRoForRemovalOfBODkgperhour },
    { label: 'Standard oxygen transfer efficiency for diffusers (SOTE)', value: outputs.SOTE },
    { label: 'Actual oxygen transfer efficiency for diffusers (AOTE)', value: outputs.AOTE },
    { label: 'Required average oxygen transfer rate during aeration (AOTR)', value: outputs.ruleOfThumbRequiredAOTRPerTankkgperhour },
    { label: 'Air Requirement (Normal m³/hour)', value: outputs.airRequirementNm3perhour },
    { label: 'Design airflow rate (Normal m³/hour)', value: outputs.ruleOfThumbDesignAirflowRateNm3perhour },
    { label: 'AIR FLOW RATE AS PER BIOLOGICAL KINETICS USING DIFFUSERS' },
    { label: 'Average oxygen transfer rate per tank (kg/hour)', value: outputs.biologicalKineticsAOTRPerTankkgperhour },
    { label: 'Required average oxygen transfer rate during aeration AOTR (kg/hour)', value: outputs.biologicalKineticsRequiredAOTRPerTankkgperhour },
    { label: 'BUBBLE AERATION DESIGN' },
    { label: 'Pb/Pa', value: outputs.PbPaRatio },
    { label: 'Oxygen concentration at design temperature and altitude, C S,T,H', value: outputs.oxygenConcentrationAtDesignTempmgperl },
    { label: 'Atmospheric pressure in m of water at design temperature and altitude', value: outputs.atmosphericPressureAtDesignTempinmofwater },
    { label: 'Average DO saturation concentration in clean water at design temperature and altitude, C S`,T,H', value: outputs.averageDOSaturationConcentrationmgperl },
    { label: 'Standard oxygen transfer rate (SOTR)', value: outputs.SOTR },
    { label: 'Density of air at design temperature (kg/m³)', value: outputs.densityOfAirAtDesignTempkgperm3 },
    { label: 'Amount of oxygen by weight (kg/m³)', value: outputs.amountOfOxygenByWeightAtDesignTempkgperm3 },
    { label: 'Air flow rate (m³/hour)', value: outputs.airFlowRatem3perhour },
    { label: 'Design airflow rate (m³/hour)', value: outputs.designAirFlowRateNm3perhour }
  ];

    // Handlers for exporting
    const handleExportPDF = () => {
      exportToPDF(outputFields, title);
    };
  
    const handleExportExcel = () => {
      exportToExcel(outputFields, title);
    };

  return (
    <div>
      <div id="divToPrint">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            <b>SBR Design Output</b>
          </Typography>
          <Grid container spacing={2}>
            {outputFields.map((field, index) => (
            <Grid 
              item 
              xs={12} 
              sm={field.value !== undefined ? 6 : 12}  // Use sm={12} for the header, sm={6} for others
              key={index}
            > 
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="body2">
                  {field.value !== undefined ? (
                    <>
                      {field.label}: <b>{field.value}</b>
                    </>
                  ) : (
                    <b>{field.label}</b>
                  )}
                </Typography>
              </Paper>
            </Grid>
            ))}      
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  <b>Design Viability Remarks</b>
                </Typography>
                <Typography variant="body2" sx={{ color: getColor(computedSRTCondition) }}>
                  {computedSRTCondition ? 'The SRT lies between 4 to 20 days. Hence OK.' : 'The SRT doesn\'t lie between 4 to 20 days. Hence not OK.'}
                </Typography>
                <Typography variant="body2" sx={{ color: getColor(fillFractionCondition) }}>
                  {fillFractionCondition ? 'VF/VT - is greater than decant depth percentage. Hence OK.' : 'VF/VT - isn\'t greater than decant depth percentage. Hence not OK.'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Grid item xs={12} sm={12}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleExportPDF}>
            Export to PDF
          </Button>
          <Button variant="contained" color="secondary" onClick={handleExportExcel} sx={{ ml: 2 }}>
            Export to Excel
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default SBRDesignOutput;