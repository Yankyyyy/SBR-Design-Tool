import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardHeader } from '@mui/material';
import sbrflow from '../attachments/SBR-Flow.png'; 


const Home = () => {
  return (
    <Container sx={{ minHeight: '100vh', py: 2 }}>
      <Box my={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
          Design of Sequencing Batch Reactor (SBR) 
        </Typography>
      </Box>

      <Card sx={{ my: 4, backgroundColor: '#a3d1ff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography paragraph>
            Welcome to the design of Sequencing Batch Reactor (SBR) for Small and Medium Towns. This web application platform provides comprehensive guidance and design calculations on the implementation and optimization of Sequencing batch reactors (SBRs).
          </Typography>
          <Typography paragraph>
            Also known as sequential batch reactors, are activated sludge batch reactors, unlike most of the other technologies which have plug flow reactors. SBRs has proved to be very popular with many ULBs in the country owing to their low footprint on account of integrating separate functions into a single treatment tank.
          </Typography>
        </CardContent>
      </Card>

      <Box my={4} textAlign="justify">
        <Card sx={{ my: 4, backgroundColor: '#e1bee7', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
          <CardHeader
            title={
              <Typography variant="h5" component="h2" align="center" sx={{ color: '#8e24aa' }}>
                Working of SBR
              </Typography>
            }
          />
          <CardContent>
            <Typography paragraph>
              Standard SBR setups usually include the reactor basin, sludge draw-off mechanism, effluent decanter, and process control system. As a batch reactor, SBR is a closed system where no flow is added or allowed to go out during the detention period. Reaction kinetics of a batch reactor are of first order and are based on the assumption that there is a complete mixing of reactants and their concentration is uniform throughout the reactor. There is considerable flexibility in fixing the timings of aeration, settling, decanting and idle periods. In many cases, the idle phase is eliminated without any adverse effect on the process.
            </Typography>
            <Typography paragraph>
              SBRs process wastewater in batches through single fill-and-draw tanks. Some designs may use two or more batch tanks in optimizing the effectiveness of their systems, depending on the expected volume of wastewater flow and treatment period.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box my={4} textAlign="justify">
        <Card sx={{ my: 4, backgroundColor: '#b3ffb5' }}>
          <CardHeader
            title={
              <Typography variant="h5" component="h2" align="center" sx={{ color: '#2d8030' }}>
                Flowchart showing the concept of timing of sequence of operations
              </Typography>
            }
          />
          <Container>
            <Box sx={{ margin: 4, textAlign: 'center' }}>
              <img src={sbrflow} alt="Ministry of Housing and Urban Affairs Home Page" style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Container>
          <CardContent>
            <Typography paragraph>
            Each tank operates under five commands of fill, react, settle, draw, and idle. Screening and grit removal is undertaken prior to introducing the wastewater in to the SBR reactor. In a new plant, each batch reactor is partially filled with biomass to facilitate the aerobic processes. The figure above shows the sequential processes of an SBR. The idle phase may sometimes be done away with and instead aeration may be continued during half of the fill phase duration also. Typical values of the different stages are also shown at the bottom of the figure.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
