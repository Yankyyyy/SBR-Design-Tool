import Fraction from "fraction.js";

function floatToFraction(float) {
  return Fraction(float).limit_denominator();
}

export const calculateSBRDesign = (inputs) => {
  const { influentFlowMLD, peakFactor, temperatureC, reactorMixedLiquorConcentrationmgperl, influentBODmgperl, sBODmgperl, CODmgperl, sCODmgperl, 
    rbCODmgperl, TSSmgperl, VSSmgperl, numberOfTanks, totalLiquidDepthm, decantDepthPercentage, SVImgperl, minimumDOConcentrationmgperl, bCODBODRatio, 
    effluentTSSmgperl, effluentBODmgperl, effluentCODmgperl, µm, Ks, kd, fd, Y, Ɵµm, ƟKs, Ɵkd, aerationTimehrs, settlingTimehrs, decantationTimehrs, 
    idleTimehrs, liquidAboveSludgePercentage, freeBoardm, lengthToWidthRatio, higherOxygenFactor, blowerOutletPressurebar, 
    oxygenNeededPerKgBODkgO2perkgBOD, SOTRDepthFunction, AOTRSOTRRatio, diffusersDepthm, specificWeightOfWaterKNperm3, designTemperatureC, 
    oxygenContentInAirKgperm3, oxygenContentInAirPercentage, diffuserFoulingFactor, oxygenTransferRatio, DOSaturationRatio, siteElevationm, 
    DOSaturationToCleanWatermgperl, DOConcentrationDesignTempmgperl, standardAtmosphericPressureKNperm3, oxygenConcentrationLeavingTank, 
    fineBubbleDiffusersEfficiency } = inputs;
  
  const lenToWidthRatio = floatToFraction(parseFloat(lengthToWidthRatio));
  const influentFlowm3perday = influentFlowMLD * 1000;
  const influentFlowm3persec = influentFlowm3perday / ( 24 * 60 * 60 );
  const peakFlowMLD = parseFloat(influentFlowMLD) * parseFloat(peakFactor);
  const peakFlowm3perday = parseFloat(peakFlowMLD) * 1000;
  const peakFlowm3persec = parseFloat(peakFlowm3perday) / ( 24 * 60 * 60 );
  const estimatedEffluentCODmgperl = parseFloat(CODmgperl) - ( parseFloat(bCODBODRatio) * parseFloat(influentBODmgperl) * ((parseFloat(influentBODmgperl) - parseFloat(effluentBODmgperl)) / parseFloat(influentBODmgperl)) );
  const bCODmgperl = parseFloat(bCODBODRatio) * parseFloat(influentBODmgperl);
  const nbVSSConcentrationmgperl = ( parseFloat(bCODBODRatio) * (parseFloat(influentBODmgperl) - parseFloat(sBODmgperl)) ) / ( parseFloat(CODmgperl) - parseFloat(sCODmgperl) ) ;
  const nbVSSmgperl = ( 1 - parseFloat(nbVSSConcentrationmgperl) ) * parseFloat(VSSmgperl) ;
  const iTSSmgperl = parseFloat(TSSmgperl) - parseFloat(VSSmgperl);
  const fillPeriodhrs = parseFloat(aerationTimehrs) + parseFloat(settlingTimehrs) + parseFloat(decantationTimehrs) + parseFloat(idleTimehrs);
  const totalCycletime = parseFloat(numberOfTanks) * parseFloat(fillPeriodhrs);
  const numberOfCyclesPerTankPerDay = 24 / totalCycletime;
  const totalNumberOfCyclesPerDay = parseFloat(numberOfTanks) * parseFloat(numberOfCyclesPerTankPerDay);
  const fillVolumePerCycle = parseFloat(peakFlowm3perday) / parseFloat(totalNumberOfCyclesPerDay);
  const settledMLSSConcentrationmgperl = (1000 * 1000) / SVImgperl;
  const ratioOfVsVtwithextraliquidAboveSludge = ( parseFloat(reactorMixedLiquorConcentrationmgperl) / parseFloat(settledMLSSConcentrationmgperl) ) * ( 1 + (liquidAboveSludgePercentage / 100) );
  const fillFraction = 1 - parseFloat(ratioOfVsVtwithextraliquidAboveSludge);
  const decantDepthm = ( parseFloat(decantDepthPercentage) / 100 ) * parseFloat(totalLiquidDepthm);
  const totalVolumePerTankm3 = parseFloat(fillVolumePerCycle) / ( parseFloat(decantDepthPercentage) / 100 );
  const overallTimehrs = ( numberOfTanks * totalVolumePerTankm3 * 24 ) / parseFloat(peakFlowm3perday);
  const totalTankDepthm = parseFloat(totalLiquidDepthm) + parseFloat(freeBoardm);
  const areaRequiredm2 = parseFloat(totalVolumePerTankm3) / parseFloat(totalTankDepthm);
  const lengthOfTheTankm = Math.ceil( 10 * (parseFloat(lenToWidthRatio.numerator) * Math.sqrt( parseFloat(areaRequiredm2) / (parseFloat(lenToWidthRatio.numerator) * parseFloat(lenToWidthRatio.denominator)) ))) / 10;
  const widthOfTheTankm = Math.ceil( 10 * (parseFloat(lenToWidthRatio.denominator) * Math.sqrt( parseFloat(areaRequiredm2) / (parseFloat(lenToWidthRatio.numerator) * parseFloat(lenToWidthRatio.denominator)) ))) / 10;
  const adoptedVolumeOfOneTankm3 = parseFloat(lengthOfTheTankm) * parseFloat(widthOfTheTankm) * parseFloat(totalLiquidDepthm);

  return {
    influentFlowMLD,
    influentFlowm3perday: influentFlowm3perday.toFixed(3),
    influentFlowm3persec: influentFlowm3persec.toFixed(3),
    peakFactor,
    peakFlowMLD,
    peakFlowm3perday: peakFlowm3perday.toFixed(3),
    peakFlowm3persec: peakFlowm3persec.toFixed(3),
    temperatureC,
    reactorMixedLiquorConcentrationmgperl,
    influentBODmgperl,
    sBODmgperl,
    CODmgperl,
    sCODmgperl,
    rbCODmgperl,
    TSSmgperl,
    VSSmgperl,
    numberOfTanks,
    totalLiquidDepthm,
    decantDepthPercentage,
    SVImgperl,
    minimumDOConcentrationmgperl,
    bCODBODRatio,
    effluentTSSmgperl,
    effluentBODmgperl,
    effluentCODmgperl,
    estimatedEffluentCODmgperl: estimatedEffluentCODmgperl.toFixed(3),
    µm,
    Ks,
    kd,
    fd,
    Y,
    Ɵµm,
    ƟKs,
    Ɵkd,
    bCODmgperl: bCODmgperl.toFixed(3),
    nbVSSmgperl: nbVSSmgperl.toFixed(3),
    iTSSmgperl: iTSSmgperl.toFixed(3),
    aerationTimehrs,
    settlingTimehrs,
    decantationTimehrs,
    idleTimehrs,
    fillPeriodhrs,
    totalCycletime,
    numberOfCyclesPerTankPerDay,
    totalNumberOfCyclesPerDay,
    fillVolumePerCycle,
    settledMLSSConcentrationmgperl: settledMLSSConcentrationmgperl.toFixed(3),
    liquidAboveSludgePercentage,
    ratioOfVsVtwithextraliquidAboveSludge: ratioOfVsVtwithextraliquidAboveSludge.toFixed(3),
    fillFraction: fillFraction.toFixed(3),
    decantDepthm,
    totalVolumePerTankm3,
    overallTimehrs,
    freeBoardm,
    lengthToWidthRatio,
    lengthOfTheTankm,
    widthOfTheTankm,
    adoptedVolumeOfOneTankm3: adoptedVolumeOfOneTankm3.toFixed(3),
    higherOxygenFactor,
    blowerOutletPressurebar,
    oxygenNeededPerKgBODkgO2perkgBOD,
    SOTRDepthFunction,
    AOTRSOTRRatio,
    diffusersDepthm,
    specificWeightOfWaterKNperm3,
    designTemperatureC,
    oxygenContentInAirKgperm3,
    oxygenContentInAirPercentage,
    diffuserFoulingFactor,
    oxygenTransferRatio,
    DOSaturationRatio,
    siteElevationm,
    DOSaturationToCleanWatermgperl,
    DOConcentrationDesignTempmgperl,
    standardAtmosphericPressureKNperm3,
    oxygenConcentrationLeavingTank,
    fineBubbleDiffusersEfficiency
  };
};