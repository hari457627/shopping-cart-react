import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function SimpleSnackbar({openSnackbar, message, setOpenSnackBar}) {

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div>
            <Snackbar
                open={openSnackbar}
                onClose={handleClose}
                message={message}
            />
        </div>
    );
}