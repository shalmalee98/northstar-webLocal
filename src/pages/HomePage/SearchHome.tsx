import { Box, Grid, Typography, Slide, useMediaQuery, useTheme, Button, Autocomplete, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiLink } from "../../default";

const token = localStorage.getItem("userToken");

const SearchHome = () => {
    const isBigScreen = useMediaQuery("(min-width: 600px)");
    // const [query, setQuery] = useState("");
    const [roadmaps, setRoadmaps] = useState(Array());
    const [temp, setTemp] = useState("");
    const navigate = useNavigate();

    const getRoadmapSearchResults = async (searchTerm) => {
        try {
            const response = await fetch(`${apiLink}/search/roadmap/${searchTerm}`, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await response.json();
            const result = json.items;
            var arr = Array();
            result.map((work) => {
                arr.push({ label: work.name, uid: work.uid, data: work });
            });
            setRoadmaps(arr);
        } catch (error) {
            console.log(error);
        }
    };

    const onInputChange = (event, value, reason) => {
        if (value) {
            console.log(value);
            setTemp(value);
            getRoadmapSearchResults(value);
        } else {
            setRoadmaps([]);
        }
    };

    const handleSearch = async () => {
        navigate(`/search?q=${temp}`);
    };

    return (

        <Box style={{ marginLeft: '20px', marginRight: '20px', display: 'flex', flexDirection: 'row' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={roadmaps}
                onInputChange={onInputChange}
                noOptionsText="No results"
                // getOptionLabel={(roadmaps) => roadmaps.title}
                style={{ width: 400 }}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Search Roadmaps" sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",

                            legend: {
                                marginLeft: "30px"
                            }
                        },
                        "& .MuiAutocomplete-inputRoot": {
                            paddingLeft: "20px !important",
                            borderRadius: "50px"
                        },
                        "& .MuiInputLabel-outlined": {
                            paddingLeft: "20px"
                        },
                        "& .MuiInputLabel-shrink": {
                            marginLeft: "20px",
                            paddingLeft: "10px",
                            paddingRight: 0,
                            background: "white"
                        }
                    }} />
                )}
            />
            <IconButton aria-label="search" size="large" onClick={handleSearch}>
                <SearchIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};
export default SearchHome;