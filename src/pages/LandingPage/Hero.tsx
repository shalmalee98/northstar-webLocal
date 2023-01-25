import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
const myteam = require('./myteam.jpg');


const Hero = () => {

    return (
        <div className="heroBox" style={{ display: 'flex', width: '100%', }}>
            <div className="gridContainer_hero">
                <div className="grid_hero">
                    <Typography variant="h3" fontWeight={700} className="title_hero">
                        Let's scale your business
                    </Typography>
                    <Typography variant="h6" className="subtitle_hero">
                        Hire professionals who will help your business make 10X your
                        previous income. With over 5years experience in Marketing & Business
                        strategy, we are your best client.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                    >
                        HIRE US
                    </Button>
                </div>
                <div className="myteamImage_hero">
                    <img src={myteam} alt="My Team" className="largeImage" />
                </div>
            </div>
        </div>
    );
};

export default Hero;