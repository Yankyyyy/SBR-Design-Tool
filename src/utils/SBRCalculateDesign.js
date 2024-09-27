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
    oxygenNeededPerKgBODkgO2perkgBOD, levelOfDiffusersm, SOTEDepthFunction, AOTESOTERatio, diffusersDepthm, specificWeightOfWaterKNperm3, 
    oxygenContentInAirKgperm3, oxygenContentInAirPercentage, diffuserFoulingFactor, oxygenTransferRatio, DOSaturationRatio, siteElevationm, 
    DOSaturationinCleanWatermgperl, DOConcentrationDesignTempmgperl, standardAtmosphericPressureKNperm3, oxygenConcentrationLeavingTank, 
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
  const totalCycletimehrs = parseFloat(numberOfTanks) * parseFloat(fillPeriodhrs);
  const numberOfCyclesPerTankPerDay = 24 / totalCycletimehrs;
  const totalNumberOfCyclesPerDay = parseFloat(numberOfTanks) * parseFloat(numberOfCyclesPerTankPerDay);
  const fillVolumePerCyclem3 = parseFloat(peakFlowm3perday) / parseFloat(totalNumberOfCyclesPerDay);
  const settledMLSSConcentrationmgperl = (1000 * 1000) / SVImgperl;
  const ratioOfVsVtwithextraliquidAboveSludge = ( parseFloat(reactorMixedLiquorConcentrationmgperl) / parseFloat(settledMLSSConcentrationmgperl) ) * ( 1 + (liquidAboveSludgePercentage / 100) );
  const fillFraction = 1 - parseFloat(ratioOfVsVtwithextraliquidAboveSludge);
  const decantDepthm = ( parseFloat(decantDepthPercentage) / 100 ) * parseFloat(totalLiquidDepthm);
  const totalVolumePerTankm3 = parseFloat(fillVolumePerCyclem3) / ( parseFloat(decantDepthPercentage) / 100 );
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
  const pxvssSRTgperday = parseFloat(A.toFixed(3)) + parseFloat(B.toFixed(3)) + parseFloat(D.toFixed(3));
  const Xmlvssmgperl = parseFloat(pxvssSRTgperday.toFixed(4)) / parseFloat(totalVolumePerTankm3);
  const XmlvssXmlssRatio = parseFloat(Xmlvssmgperl.toFixed(4)) / parseFloat(reactorMixedLiquorConcentrationmgperl);
  const A1 = ( (peakFlowm3perday / numberOfTanks) * Y * Somgperl ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const B1 = ( fd * parseFloat(kdtC.toFixed(4)) * Y * (peakFlowm3perday / numberOfTanks) * Somgperl * parseFloat(SRTdays.toFixed(2)) ) / ( 1 + (parseFloat(kdtC.toFixed(4)) * parseFloat(SRTdays.toFixed(2))) );
  const Pxbiogperday = parseFloat(A1) + parseFloat(B1);
  const decantPumpingRatem3permin = fillVolumePerCyclem3 / ( decantationTimehrs * 60 );
  const Rokgperdaypertank = ( (peakFlowm3perday / numberOfTanks) * (Somgperl / 1000) ) - ( 1.42 * Pxbiogperday / 1000 );
  const totalAerationTimehrsperday = parseFloat(fillPeriodhrs) * parseFloat(numberOfCyclesPerTankPerDay);
  const averageOxygenTransferRatekgperhour = parseFloat(Rokgperdaypertank) / parseFloat(totalAerationTimehrsperday);
  const practicalAverageOxygenTransferRatekgperhour = parseFloat(averageOxygenTransferRatekgperhour) * parseFloat(higherOxygenFactor);
  const Pxtsskgperday = ( numberOfTanks * totalVolumePerTankm3 * reactorMixedLiquorConcentrationmgperl ) / ( SRTdays * 1000 );
  const bCODRemovalRatekgperday = peakFlowm3perday * bCODmgperl / 1000;
  const BODRemovalRatekgperday = parseFloat(bCODRemovalRatekgperday) / parseFloat(bCODBODRatio);
  const TSSObservedYeild = parseFloat(Pxtsskgperday) / parseFloat(BODRemovalRatekgperday);
  const VSSObservedYeild = parseFloat(TSSObservedYeild) * parseFloat(XmlvssXmlssRatio);
  const TSSbCODRatioObservedYeild = parseFloat(Pxtsskgperday) / parseFloat(bCODRemovalRatekgperday);
  const sludgeWastingRateFromFullTankm3perday = Pxtsskgperday / ( reactorMixedLiquorConcentrationmgperl / 1000);
  const sludgeWastingRateFromSettledSludgem3perday = Pxtsskgperday / ( settledMLSSConcentrationmgperl / 1000 );
  const FMRatio = ( parseFloat(peakFlowm3perday) / parseFloat(numberOfTanks) ) * parseFloat(influentBODmgperl) / ( parseFloat(Xmlvssmgperl) * parseFloat(totalVolumePerTankm3) );
  const BODVolumetricLoading = peakFlowm3perday * influentBODmgperl / ( numberOfTanks * totalVolumePerTankm3 * 1000);
  const ruleOfThumbRoForRemovalOfBODkgperhour = peakFlowm3perday * ( influentBODmgperl - effluentBODmgperl) * oxygenNeededPerKgBODkgO2perkgBOD / ( 24 * 1000 );
  const SOTE = parseFloat(SOTEDepthFunction) * ( parseFloat(totalLiquidDepthm) - parseFloat(levelOfDiffusersm) );
  const AOTE = parseFloat(SOTE) * parseFloat(AOTESOTERatio);
  const ruleOfThumbRequiredAOTRPerTankkgperhour = ( parseFloat(ruleOfThumbRoForRemovalOfBODkgperhour) / parseFloat(numberOfTanks) ) * ( parseFloat(totalCycletimehrs) / parseFloat(aerationTimehrs) );
  const airRequirementNm3perhour = ruleOfThumbRequiredAOTRPerTankkgperhour / ( (AOTE / 100) * 0.293 ); //As per Standard Atmospheric Data, oxygen content in the air is 0.293 Kg/m³
  const ruleOfThumbDesignAirflowRateNm3perhour = parseFloat(airRequirementNm3perhour) * parseFloat(higherOxygenFactor);
  const biologicalKineticsAOTRPerTankkgperhour = Rokgperdaypertank / 24;
  const biologicalKineticsRequiredAOTRPerTankkgperhour = parseFloat(biologicalKineticsAOTRPerTankkgperhour.toFixed(3)) * ( parseFloat(totalCycletimehrs) / parseFloat(aerationTimehrs) );
  const PbPaRatio = Math.exp(-( 9.81 * 28.97 * parseFloat(siteElevationm)) / ( 8314 * ( 273.15 + parseFloat(temperatureC) )));
  const oxygenConcentrationAtDesignTempmgperl = parseFloat(DOConcentrationDesignTempmgperl) * parseFloat(PbPaRatio);
  const atmosphericPressureAtDesignTempinmofwater = parseFloat(PbPaRatio.toFixed(4)) * parseFloat(standardAtmosphericPressureKNperm3) / parseFloat(specificWeightOfWaterKNperm3);
  const averageDOSaturationConcentrationmgperl = oxygenConcentrationAtDesignTempmgperl * 0.5 * ( ((atmosphericPressureAtDesignTempinmofwater + (totalLiquidDepthm - levelOfDiffusersm)) / atmosphericPressureAtDesignTempinmofwater ) + (19 / 21) );
  const SOTR = biologicalKineticsRequiredAOTRPerTankkgperhour * ( DOSaturationinCleanWatermgperl / ( 0.7 * 0.9 * (0.95 * averageDOSaturationConcentrationmgperl - 2) ) ) * 1.024**(20 - temperatureC);
  const densityOfAirAtDesignTempkgperm3 = parseFloat(PbPaRatio) * parseFloat(standardAtmosphericPressureKNperm3) * 1000 * 28.97 / ( 8314 * (273.15 + parseFloat(temperatureC)));
  const amountOfOxygenByWeightAtDesignTempkgperm3 = 0.2318 * densityOfAirAtDesignTempkgperm3;
  const airFlowRatem3perhour = parseFloat(SOTR) / ( (parseFloat(fineBubbleDiffusersEfficiency) / 100) * parseFloat(amountOfOxygenByWeightAtDesignTempkgperm3) );
  const designAirFlowRateNm3perhour = parseFloat(airFlowRatem3perhour) * parseFloat(higherOxygenFactor);

  return {
    //INPUT DATA AND SEWAGE CHARACTERISTICS
    influentFlowMLD,  //Inflow rate into the STP
    influentFlowm3perday: influentFlowm3perday.toFixed(3),  //Inflow rate into the STP
    influentFlowm3persec: influentFlowm3persec.toFixed(3),  //Inflow rate into the STP
    peakFactor, //Peak Factor
    peakFlowMLD,  //Peak Factor into the STP
    peakFlowm3perday: peakFlowm3perday.toFixed(3),  //Peak Factor into the STP
    peakFlowm3persec: peakFlowm3persec.toFixed(3),  //Peak Factor into the STP
    temperatureC, //Temperature
    reactorMixedLiquorConcentrationmgperl,  //X, Reactor mixed liquor concentration (MLSS)
    influentBODmgperl,  //Influent BOD
    sBODmgperl, //sBOD
    CODmgperl,  //Influent COD
    sCODmgperl, //sCOD
    rbCODmgperl,  //rbCOD
    TSSmgperl,  //TSS
    VSSmgperl,  //VSS
    //DESIGN PARAMETERS AND ASSUMPTIONS
    numberOfTanks,  //Number of tanks to be used
    totalLiquidDepthm,  //Total liquid depth when full
    decantDepthPercentage,  //Decant depth percentage
    SVImgperl,  //SVI
    minimumDOConcentrationmgperl, //Minimum D.O. concentration in Reactor
    bCODBODRatio, //bCOD/BOD Ratio
    blowerOutletPressurebar,  //Blower Outlet Pressure
    //EFFLUENT STANDARDS
    effluentTSSmgperl,  //Effluent TSS
    effluentBODmgperl,  //Effluent BOD
    effluentCODmgperl,  //Effluent COD
    estimatedEffluentCODmgperl: estimatedEffluentCODmgperl.toFixed(3),  //Estimated Effluent COD
    //STANDARD KINETIC COEFFICIENTS
    µm,
    Ks,
    kd,
    fd,
    Y,
    //Ɵ VALUES
    Ɵµm,
    ƟKs,
    Ɵkd,
    //WASTEWATER DESIGN PARAMETERS
    bCODmgperl: bCODmgperl.toFixed(3),  //bCOD
    nbVSSConcentrationmgperl: nbVSSConcentrationmgperl.toFixed(3),  //bpCOD/pCOD
    nbVSSmgperl: nbVSSmgperl.toFixed(3),  //nbVSS
    iTSSmgperl: iTSSmgperl.toFixed(3),  //iTSS
    //CHOICE OF SBR OPERATING CYCLE
    aerationTimehrs,  //Reaction or Aeration time, tA
    settlingTimehrs,  //Settling time, tS
    decantationTimehrs, //Decantation time, tD
    idleTimehrs,  //Idle time, tI
    fillPeriodhrs,  //Fill period, tF for each tank
    totalCycletimehrs,  //Total cycle time, Tc
    numberOfCyclesPerTankPerDay,  //No. of cycles / tank per day
    totalNumberOfCyclesPerDay,  //Total No. of cycles / day for 2 tanks
    fillVolumePerCyclem3: fillVolumePerCyclem3.toFixed(2),  //Fill volume / cycle
    //DETERMINATION OF FILL FRACTION
    settledMLSSConcentrationmgperl: settledMLSSConcentrationmgperl.toFixed(2),  //XS based on the SVI value
    liquidAboveSludgePercentage,  //Percent liquid above sludge blanket to avoid removal of solids during decantation
    ratioOfVsVtwithextraliquidAboveSludge: ratioOfVsVtwithextraliquidAboveSludge.toFixed(2),  //VS/VT
    fillFraction: fillFraction.toFixed(2),  //VF/VT - Should be greater than decant depth percentage
    decantDepthm: decantDepthm.toFixed(2),  //Decant Depth
    totalVolumePerTankm3: totalVolumePerTankm3.toFixed(2),  //VT
    overallTimehrs, //Overall Time, τ
    //DETERMINATION OF TANK DIMENSIONS
    freeBoardm, //Tank freeboard
    totalTankDepthm,  //Total tank depth
    lengthToWidthRatio, //Length to width ratio of the tank
    lengthOfTheTankm: lengthOfTheTankm.toFixed(2),  //Length of the tank
    widthOfTheTankm: widthOfTheTankm.toFixed(2),  //Width of the tank
    adoptedVolumeOfOneTankm3: adoptedVolumeOfOneTankm3.toFixed(2),  //Adopted Volume of one tank
    //DETERMINATION OF SOLIDS RETENTION TIME (SRT)
    kdtC: kdtC.toFixed(4),  //kd @ Given Temperature
    pxtssSRTg: pxtssSRTg.toFixed(3),  //(PX,TSS)SRT = VT * XMLSS
    Somgperl: Somgperl.toFixed(3),  //Assume So = So - S
    SRTdays: SRTdays.toFixed(2),  //SRT (Obtained by solving Equation 8.16 of Metcalf and Eddy)
    //DETERMINATION OF MLVSS CONCENTRATION
    pxvssSRTgperday: pxvssSRTgperday.toFixed(3),  //(PX,VSS)SRT = VT * XMLVSS
    Xmlvssmgperl: Xmlvssmgperl.toFixed(3),  //XMLVSS (MLVSS Concentration)
    XmlvssXmlssRatio: XmlvssXmlssRatio.toFixed(3),  //Fraction of MLVSS (XMLVSS/XMLSS)
    //DETERMINATION OF BIOMASS AS VSS WASTED PER DAY
    Pxbiogperday: Pxbiogperday.toFixed(2),  //PX,BIO
    //DETERMINATION OF DECANT PUMPING RATE
    decantPumpingRatem3permin: decantPumpingRatem3permin.toFixed(2),  //Decant pumping rate
    //DETERMINATION OF OXYGEN REQUIRED PER TANK
    Rokgperdaypertank: Rokgperdaypertank.toFixed(3),  //Oxygen required, Ro
    totalAerationTimehrsperday, //Total Aeration time per tank
    averageOxygenTransferRatekgperhour: averageOxygenTransferRatekgperhour.toFixed(3),  //Average oxygen transfer rate
    higherOxygenFactor, //Factor for higher oxygen in the beginning
    practicalAverageOxygenTransferRatekgperhour: practicalAverageOxygenTransferRatekgperhour.toFixed(3),  //Practical average oxygen transfer rate
    //DETERMINATION OF SLUDGE PRODUCTION
    Pxtsskgperday: Pxtsskgperday.toFixed(3),  //PX,TSS Sludge production rate
    bCODRemovalRatekgperday: bCODRemovalRatekgperday.toFixed(3),  //bCOD removal rate
    BODRemovalRatekgperday: BODRemovalRatekgperday.toFixed(3),  //BOD Removal rate
    TSSObservedYeild: TSSObservedYeild.toFixed(4),  //TSS Observed yield
    VSSObservedYeild: VSSObservedYeild.toFixed(4),  //VSS Observed yield
    TSSbCODRatioObservedYeild: TSSbCODRatioObservedYeild.toFixed(5),  //TSS / bCOD Observed yield
    sludgeWastingRateFromFullTankm3perday: sludgeWastingRateFromFullTankm3perday.toFixed(3),  //Sludge wasting rate from full tank at MLSS concentration
    sludgeWastingRateFromSettledSludgem3perday: sludgeWastingRateFromSettledSludgem3perday.toFixed(3),  //Sludge wasting rate from settled sludge
    //DETERMINATION OF F/M AND BOD VOLUMETRIC LOADING
    FMRatio: FMRatio.toFixed(5),  //F/M
    BODVolumetricLoading: BODVolumetricLoading.toFixed(3),  //BOD Volumetric Loading
    //DIFFUSER DATA
    oxygenNeededPerKgBODkgO2perkgBOD, 
    SOTEDepthFunction,
    AOTESOTERatio,
    levelOfDiffusersm,
    diffusersDepthm,
    specificWeightOfWaterKNperm3,
    oxygenContentInAirKgperm3,
    oxygenContentInAirPercentage,
    diffuserFoulingFactor,
    oxygenTransferRatio,
    DOSaturationRatio,
    siteElevationm,
    DOSaturationinCleanWatermgperl,
    DOConcentrationDesignTempmgperl,
    standardAtmosphericPressureKNperm3,
    oxygenConcentrationLeavingTank,
    fineBubbleDiffusersEfficiency,
    //DETERMINATION OF AIR FLOW RATE AS PER RULE OF THUMB
    ruleOfThumbRoForRemovalOfBODkgperhour: ruleOfThumbRoForRemovalOfBODkgperhour.toFixed(5),  //Oxygen Requirement a per rule of thumb
    SOTE: SOTE.toFixed(5),  //Standard oxygen transfer efficiency for diffusers (SOTE)
    AOTE: AOTE.toFixed(5),  //Actual oxygen transfer efficiency for diffusers (SOTE)
    ruleOfThumbRequiredAOTRPerTankkgperhour: ruleOfThumbRequiredAOTRPerTankkgperhour.toFixed(5),  //Required average oxygen transfer rate during aeration AOTR
    airRequirementNm3perhour: airRequirementNm3perhour.toFixed(5),  //Air Requirement
    ruleOfThumbDesignAirflowRateNm3perhour: ruleOfThumbDesignAirflowRateNm3perhour.toFixed(5),  //Design airflow rate
    //DETERMINATION OF AIR FLOW RATE AS PER BIOLOGICAL KINETICS USING DIFFUSERS
    biologicalKineticsAOTRPerTankkgperhour: biologicalKineticsAOTRPerTankkgperhour.toFixed(5),  //Average oxygen transfer rate per tank
    biologicalKineticsRequiredAOTRPerTankkgperhour: biologicalKineticsRequiredAOTRPerTankkgperhour.toFixed(5),  //Required average oxygen transfer rate during aeration AOTR
    //BUBBLE AERATION DESIGN
    PbPaRatio: PbPaRatio.toFixed(5),  //Pb / Pa computed as per equation in Appendix B of Metcalf and Eddy
    oxygenConcentrationAtDesignTempmgperl: oxygenConcentrationAtDesignTempmgperl.toFixed(5),  //Oxygen concentration at design temperature and altitude, C S,T,H
    atmosphericPressureAtDesignTempinmofwater: atmosphericPressureAtDesignTempinmofwater.toFixed(5),  //Atmospheric pressure in m of water at design temperature and altitude as per Appendix B and C of Metcalf and Eddy
    averageDOSaturationConcentrationmgperl: averageDOSaturationConcentrationmgperl.toFixed(5),  //Average DO saturation concentration in clean water in aeration tank at design temperature and altitude, C S',T,H
    SOTR: SOTR.toFixed(5),  //Standard oxygen transfer rate (SOTR)
    densityOfAirAtDesignTempkgperm3: densityOfAirAtDesignTempkgperm3.toFixed(5),  //Density of air at design temperature
    amountOfOxygenByWeightAtDesignTempkgperm3: amountOfOxygenByWeightAtDesignTempkgperm3.toFixed(5),  //Amount of oxygen by weight
    airFlowRatem3perhour: airFlowRatem3perhour.toFixed(5),  //Air flow rate
    designAirFlowRateNm3perhour: designAirFlowRateNm3perhour.toFixed(5) //Design airflow rate
  };
};