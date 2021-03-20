import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
    Snackbar
} from '@material-ui/core';

export enum VerticalDirection {
    top = "top",
    bottom = "bottom"
}

export enum HorizontalDirection {
    right = "right",
    center = "center",
    left = "left"
}

type SnackbarAlertProps = {
    vertical: VerticalDirection,
    horizontal: HorizontalDirection,
    open: boolean | undefined,
    onClose: Function,
    severity: 'error' | 'info' | 'success' | 'warning',
    message: String,
    snackKey: string | number | null | undefined,
    autoHideDuration: number
}



function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarAlert({
    vertical,
    horizontal,
    open,
    onClose,
    severity,
    message,
    snackKey,
    autoHideDuration
}: SnackbarAlertProps) {
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={() => onClose(false)}
            autoHideDuration={autoHideDuration}
            key={snackKey}
        >
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

