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
        <Box style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '80px', marginBottom: '80px' }}>
            <Carousel showDots={false} responsive={responsive}>
                {product}
            </Carousel>

            <Box style={{ marginTop: '100px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h5'>
                    Get download for Android and IOS here!
                </Typography>
                <Button
                    variant="contained"
                    color='success'
                    href="https://drive.google.com/file/d/1N-_qeQGRP6mP1-RA0RzXB-pchqBOOS_8/view?usp=share_link"
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
        </Box>
    );
}
export default Slider;