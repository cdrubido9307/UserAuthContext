import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Success(props) {
    return (
        <Box>
            <Collapse in={props.show}>
                <Alert severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.onClickHideSuccess();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>success</AlertTitle>
                    {props.message} — <strong>{props.submessage}</strong>
                </Alert>
            </Collapse>
        </Box>
    );
}