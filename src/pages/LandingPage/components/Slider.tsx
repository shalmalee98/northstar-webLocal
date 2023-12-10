import { Typography, Button, Box, useMediaQuery } from '@mui/material';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";
import './Slider.css';

function Slider() {

    const isBigScreen = useMediaQuery('(min-width:600px)');

    const products = productData.map((item, index) => (
        <Product
            name={item.name}
            path={item.path}
        />
    ));

    return (
        <Box style={{ paddingLeft: isBigScreen ? '10%' : '5%', paddingRight: isBigScreen ? '10%' : '5%', marginTop: '80px', marginBottom: '80px' }}>
            <Carousel showDots={false} responsive={responsive}>
                {products}
            </Carousel>

            {/* <Box style={{ marginTop: '100px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h5' style={isBigScreen ? {} : { textAlign: 'center' }}>
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
            </Box> */}
        </Box>
    );
}
export default Slider;