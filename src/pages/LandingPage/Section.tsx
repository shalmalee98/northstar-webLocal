import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SaveIcon from '@mui/icons-material/Save';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


const Section = () => {

    const sectionItems = [
        {
            id: 1,
            icon: <AllInclusiveIcon sx={{ fontSize: 100, color: 'gray' }} />,
            sentence:
                'A wide range of research papers from various disciplines and fields, including science, technology, medicine, and more.',
        },
        {
            id: 2,
            icon: <SaveIcon sx={{ fontSize: 100, color: 'gray' }} />,
            sentence:
                'The ability to save and organize your favorite research papers for easy access later.',
        },
        {
            id: 3,
            icon: <PeopleOutlineIcon sx={{ fontSize: 100, color: 'gray' }} />,
            sentence: 'A user-friendly interface that allows you to easily search for and access research papers',
        },
    ];
    return (
        <Box sx={{ flexGrow: 1, marginY: '50px' }}>
            <Grid container spacing={0} xs={12} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                {sectionItems.map((item) => (
                    <Grid
                        container
                        xs={3}
                        minHeight={250}
                        key={item.id}
                        style={{ backgroundColor: 'aliceblue', border: '5px', borderRadius: '5%', padding: '20px', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {item.icon}
                        <Typography style={{ textAlign: 'center' }}>{item.sentence}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Section;