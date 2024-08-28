//cpheeo manual table value for Reactor Mixed Liquor Concentration

const SBRProcessParameters = [
    { id: 1, parameters: "F/M ratio	d⁻¹", continuousFlowandIntermittentDecant: 0.05 - 0.8 , intermittentFlowandIntermittentDecant: 0.05 - 0.3 },
    { id: 2, parameters: "Sludge Age d", continuousFlowandIntermittentDecant: 15 - 20, intermittentFlowandIntermittentDecant: 4 - 20 },
    { id: 3, parameters: "Sludge Yield kg dry solids/kg BOD", continuousFlowandIntermittentDecant: 0.75 - 0.85, intermittentFlowandIntermittentDecant: 0.75 - 1.0 },
    { id: 4, parameters: "MLSS	mg/L", continuousFlowandIntermittentDecant: 3000 - 4000, intermittentFlowandIntermittentDecant: 3500 - 5000 },
    { id: 5, parameters: "Cycle Time h", continuousFlowandIntermittentDecant: 4 - 8 , intermittentFlowandIntermittentDecant: 2.5 - 6 },
    { id: 6, parameters: "Settling Time	h", continuousFlowandIntermittentDecant: "> 0.5", intermittentFlowandIntermittentDecant: "> 0.5" },
    { id: 7, parameters: "Decant Depth m", continuousFlowandIntermittentDecant: 1.5, intermittentFlowandIntermittentDecant: 2.5 },
    { id: 8, parameters: "Fill Volume Base", continuousFlowandIntermittentDecant: "Peak Flow", intermittentFlowandIntermittentDecant: "Peak Flow" },
    { id: 9, parameters: "Process Oxygen - BOD kg O₂/kg BOD", continuousFlowandIntermittentDecant: 1.1, intermittentFlowandIntermittentDecant: 1.1 },
    { id: 9, parameters: "Process Oxygen - TKN kg O₂/kg TN", continuousFlowandIntermittentDecant: 4.6, intermittentFlowandIntermittentDecant: 4.6 }
  ];
  
  export default SBRProcessParameters;