import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ActionAlerts(props) {
    const { notify, setNotify } = props;

    const handleClose = (event, reason) => {
        setNotify({ ...notify, isOpen: false })
    }

    return (
        <Stack spacing={2} sx={{ width: '100px' }}>
            <Snackbar open={notify.isOpen} autoHideDuration={5000} style={{ marginTop: '70px' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
                <Alert variant='filled' severity={notify.type} style={{ width: '100%' }} onClose={handleClose}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}