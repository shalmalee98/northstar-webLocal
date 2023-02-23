import * as React from 'react';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(props) {
  return (
        <Popover 
            open
            anchorReference="anchorPosition"
            anchorPosition={{ top: 200, left: 400 }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            >
                <Alert onClose={() => props.onCloseAlert()}>Roadmap successfully added to your learning list!</Alert>
        </Popover>
      
  );
}