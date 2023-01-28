import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";
import './Slider.css';
const image1 = require('./assets/image1.jpeg');
const image2 = require('./assets/image2.jpeg');

function Slider() {

    const product = productData.map((item) => (
        <Product
            name={item.name}
            path={item.path}
        />
    ));

    return (
        <Box style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            <Carousel showDots={false} responsive={responsive}>
                {product}
            </Carousel>

            <Box style={{ marginTop: '80px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h5'>
                    Get download for Android and IOS here!
                </Typography>
                <Button
                    variant="contained"
                    color='success'
                    sx={{ width: '150px', fontSize: '16px', marginTop: '20px' }}
                    onClick={() => { }}
                >
                    Android
                </Button>

                <Button
                    variant="contained"
                    color='success'
                    sx={{ width: '150px', fontSize: '16px', marginTop: '20px' }}
                    onClick={() => { }}
                >
                    IOS
                </Button>
            </Box>
            {/* <Grid container spacing={0} style={{ marginTop: '20px' }}>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ width: '200px', fontSize: '16px' }}
                        href="https://drive.google.com/file/d/1N-_qeQGRP6mP1-RA0RzXB-pchqBOOS_8/view?usp=share_link"
                        onClick={() => { }}
                    >
                        Android
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ width: '200px', fontSize: '16px' }}
                        onClick={() => { }}
                    >
                        IOS
                    </Button>
                </Grid>
            </Grid> */}
        </Box>
    );
}
export default Slider;