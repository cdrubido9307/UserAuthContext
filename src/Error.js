import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Error(props) {
    return (
        <Box>
            <Collapse in={props.show}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.onClickHideError();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>Error</AlertTitle>
                    {props.message} — <strong>check it out!</strong>
                </Alert>
            </Collapse>
        </Box>
    );
}