function floatToFraction(number) {
  // Handle edge case if the number is an integer
  if (Number.isInteger(number)) {
    return `${number}/1`;
  }

  // Get the absolute value and sign of the number
  const sign = number < 0 ? -1 : 1;
  number = Math.abs(number);

  // Get decimal places
  const precision = 1e9; // Arbitrary large number for precision
  const gcd = (a, b) => (b ? gcd(b, a % b) : a); // Greatest Common Divisor function

  const temp_numerator = Math.round(number * precision);
  const temp_denominator = precision;

  // Reduce the fraction by dividing by the GCD
  const divisor = gcd(temp_numerator, temp_denominator);

  const numerator = sign * temp_numerator / divisor;
  const denominator = temp_denominator / divisor;

  return { numerator, denominator };
}

function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c;

  if (discriminant > 0) {
    // Two real solutions
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    if(x1 > 0){
      return x1;
    }
    else{
      return x2;
    }
  } else if (discriminant === 0) {
    // One real solution
    const x = -b / (2 * a);
    return x;
  } else {
    // Complex solutions
    return 0; //Not applicable in this implementation
  }
}

export const calculateSBRDesign = (inputs) => {
  const { influentFlowMLD, peakFactor, temperatureC, reactorMixedLiquorConcentrationmgperl, influentBODmgperl, sBODmgperl, CODmgperl, sCODmgperl, 
    rbCODmgperl, TSSmgperl, VSSmgperl, numberOfTanks, totalLiquidDepthm, decantDepthPercentage, SVImgperl, minimumDOConcentrationmgperl, bCODBODRatio, 
    effluentTSSmgperl, effluentBODmgperl, effluentCODmgperl, µm, Ks, kd, fd, Y, Ɵµm, ƟKs, Ɵkd, aerationTimehrs, settlingTimehrs, decantationTimehrs, 
    idleTimehrs, liquidAboveSludgePercentage, freeBoardm, lengthToWidthRatio, higherOxygenFactor, blowerOutletPressurebar, 
    oxygenNeededPerKgBODkgO2perkgBOD, SOTRDepthFunction, AOTRSOTRRatio, diffusersDepthm, specificWeightOfWaterKNperm3, 
    oxygenContentInAirKgperm3, oxygenContentInAirPercentage, diffuserFoulingFactor, oxygenTransferRatio, DOSaturationRatio, siteElevationm, 
    DOSaturationToCleanWatermgperl, DOConcentrationDesignTempmgperl, standardAtmosphericPressureKNperm3, oxygenConcentrationLeavingTank, 
    fineBubbleDiffusersEfficiency } = inputs;
  
  const lenToWidthRatio = floatToFraction(lengthToWidthRatio);
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
  const areaRequiredm2 = parseFloat(totalVolumePerTankm3) / parseFloat(totalLiquidDepthm);
  const lengthOfTheTankm = Math.ceil(10 * lenToWidthRatio.numerator * Math.sqrt( parseFloat(areaRequiredm2) / (lenToWidthRatio.numerator * lenToWidthRatio.denominator) )) / 10;
  const widthOfTheTankm = Math.ceil(10 * lenToWidthRatio.denominator * Math.sqrt( parseFloat(areaRequiredm2) / (parseFloat(lenToWidthRatio.numerator) * parseFloat(lenToWidthRatio.denominator)) )) / 10;
  const adoptedVolumeOfOneTankm3 = Math.ceil(10 * parseFloat(lengthOfTheTankm) * parseFloat(widthOfTheTankm) * parseFloat(totalLiquidDepthm)) / 10;
  const kdtC = kd * 1.04**(temperatureC - 20);
  const pxtssSRTg = parseFloat(totalVolumePerTankm3) * parseFloat(reactorMixedLiquorConcentrationmgperl);
  const Somgperl = bCODmgperl;
  const a = ( 1.1765 * fd * kdtC * (peakFlowm3perday / numberOfTanks) * Y * Somgperl ) + ( (peakFlowm3perday / numberOfTanks) * nbVSSmgperl * kdtC ) + ( (peakFlowm3perday / numberOfTanks) * iTSSmgperl * kdtC );
  const b = ( 1.1765 * (peakFlowm3perday / numberOfTanks) * Y * Somgperl ) + ( (peakFlowm3perday / numberOfTanks) * nbVSSmgperl ) + ( (peakFlowm3perday / numberOfTanks) * iTSSmgperl ) - ( pxtssSRTg * kdtC );
  const c = parseFloat(-pxtssSRTg);
  const SRTdays = solveQuadratic( a, b, c );
  const A = ( (peakFlowm3perday / numberOfTanks) * Y * Somgperl * parseFloat(SRTdays.toFixed(2)) ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const B = ( fd * parseFloat(kdtC.toFixed(4)) * Y * (peakFlowm3perday / numberOfTanks) * Somgperl * parseFloat(SRTdays.toFixed(2)) * parseFloat(SRTdays.toFixed(2)) ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const D = (peakFlowm3perday / numberOfTanks) * parseFloat(nbVSSmgperl.toFixed(3)) * parseFloat(SRTdays.toFixed(2));
  const pxvssSRTgperday = A + B + D;
  const Xmlvssmgperl = parseFloat(pxvssSRTgperday.toFixed(3)) / parseFloat(totalVolumePerTankm3);
  const XmlvssXmlssRatio = parseFloat(Xmlvssmgperl) / parseFloat(reactorMixedLiquorConcentrationmgperl);
  const A1 = ( (peakFlowm3perday / numberOfTanks) * Y * Somgperl ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const B1 = ( fd * parseFloat(kdtC.toFixed(4)) * Y * (peakFlowm3perday / numberOfTanks) * Somgperl * parseFloat(SRTdays.toFixed(2)) ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const Pxbiogperday = A1 + B1;
  const decantPumpingRatem3permin = fillVolumePerCycle / ( decantationTimehrs * 60 );
  const Rokgperdaypertank = ( (peakFlowm3perday / numberOfTanks) * (Somgperl / 1000) ) - ( 1.42 * Pxbiogperday / 1000 );
  const totalAerationTimehrsperday = parseFloat(fillPeriodhrs) * parseFloat(numberOfCyclesPerTankPerDay);
  const averageOxygenTransferRatekgperhour = parseFloat(Rokgperdaypertank) / parseFloat(totalAerationTimehrsperday);
  const practicalAverageOxygenTransferRatekgperhour = parseFloat(averageOxygenTransferRatekgperhour) * parseFloat(higherOxygenFactor);

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
    settledMLSSConcentrationmgperl: settledMLSSConcentrationmgperl.toFixed(2),
    liquidAboveSludgePercentage,
    ratioOfVsVtwithextraliquidAboveSludge: ratioOfVsVtwithextraliquidAboveSludge.toFixed(2),
    fillFraction: fillFraction.toFixed(2),
    decantDepthm: decantDepthm.toFixed(2),
    totalVolumePerTankm3,
    overallTimehrs,
    freeBoardm,
    totalTankDepthm,
    lengthToWidthRatio,
    lengthOfTheTankm: lengthOfTheTankm.toFixed(2),
    widthOfTheTankm: widthOfTheTankm.toFixed(2),
    adoptedVolumeOfOneTankm3: adoptedVolumeOfOneTankm3.toFixed(2),
    kdtC: kdtC.toFixed(4),
    pxtssSRTg: pxtssSRTg.toFixed(3),
    Somgperl,
    SRTdays: SRTdays.toFixed(2),
    pxvssSRTgperday: pxvssSRTgperday.toFixed(3),
    Xmlvssmgperl: Xmlvssmgperl.toFixed(3),
    XmlvssXmlssRatio: XmlvssXmlssRatio.toFixed(3),
    Pxbiogperday: Pxbiogperday.toFixed(2),
    decantPumpingRatem3permin: decantPumpingRatem3permin.toFixed(2),
    Rokgperdaypertank: Rokgperdaypertank.toFixed(3),
    totalAerationTimehrsperday,
    averageOxygenTransferRatekgperhour: averageOxygenTransferRatekgperhour.toFixed(3),
    higherOxygenFactor,
    practicalAverageOxygenTransferRatekgperhour: practicalAverageOxygenTransferRatekgperhour.toFixed(3),
    blowerOutletPressurebar,
    oxygenNeededPerKgBODkgO2perkgBOD,
    SOTRDepthFunction,
    AOTRSOTRRatio,
    diffusersDepthm,
    specificWeightOfWaterKNperm3,
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