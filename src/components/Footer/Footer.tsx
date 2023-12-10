import { Divider, Link, Slide, Typography } from "@mui/material/";
import { Box } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./Footer.css";
import GithubIcon from "@mui/icons-material/GitHub";
import FeedIcon from "@mui/icons-material/Feed";

export const Footer = () => {
  return (
    <Box>
      {/* <Slide in={true} direction='up' timeout={500}> */}
      <div className="FooterSection">
        <Divider variant="middle"></Divider>
        <div className="FooterContainer">
          <div className="FooterItemContainer">
            <CopyrightIcon color="primary" fontSize="small" />
            <Typography color="textSecondary" variant="body2">
              Alasia
            </Typography>
          </div>

          {/* <Divider orientation='vertical' flexItem></Divider>
          <div className='FooterItemContainer'>
            <Typography color='textSecondary' variant='body2'>
              northstar@buffalo.edu
            </Typography>
          </div> */}

          <Divider orientation="vertical" flexItem></Divider>
          {/* <Link href='https://docs.google.com/forms/d/e/1FAIpQLSfYHlvyJNzbWP7V1maMiTkrj2-fq86qKpe4_9gx9jE7Yyx8cg/viewform?usp=sf_link'><GithubIcon fontSize='inherit' />          Submit an Issue</Link> */}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfYHlvyJNzbWP7V1maMiTkrj2-fq86qKpe4_9gx9jE7Yyx8cg/viewform?usp=sf_link"
            target="_blank"
          >
            <FeedIcon fontSize="inherit" /> Submit an Issue
          </Link>
        </div>
      </div>
      {/* </Slide> */}
    </Box>
  );
};
