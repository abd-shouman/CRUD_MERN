import { useState } from "react"
import { IUser } from "../../interfaces/types";
import { addUser } from "./UserAPI"
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Grid,
    Paper,
    Button,
    CircularProgress,
    Backdrop,
    Snackbar,
    makeStyles,
    Modal,
    IconButton,
    Slide
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


type UserFormProps = {
    users: Array<IUser>,
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

const top = 25
const useStyles = makeStyles({
    fullWidth: {
        width: '100%',
    },
    addButton: {
        fontSize: '3rem'
    },
    modal: {
        top: `${top}% !important`
    }
});


export function UserForm(
    { users, setUsers }: UserFormProps
) {
    const [localUser, setLocalUser] = useState<IUser>({ firstName: "", lastName: "", email: "", dob: undefined });
    const [dataTransmitting, setDataTransmitting] = useState<boolean>(false);
    const [submitSucesseded, setSubmitSucesseded] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [submitFailed, setSubmitFailed] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<String>("");

    const classes = useStyles();

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        setDataTransmitting(true)
        addUser(localUser)
            .then(addedUser => {
                setUsers([...users, addedUser])
                setSubmitSucesseded(true)
                setOpen(false)
                setLocalUser({ firstName: "", lastName: "", email: "", dob: undefined }) //Reset the form
            })
            .catch(err => {
                //console.error(err)
                setErrorMsg(err)
                setSubmitFailed(true);
            })
            .finally(() => {
                setDataTransmitting(false)
            })
    }

    return (
        // <Container maxWidth="sm">
        <>
            <Grid
                container
                direction="row"
                justify="flex-end"
                spacing={2}>
                <Grid item>
                    <IconButton
                        aria-label="add"
                        color="primary"
                        onClick={() => setOpen(true)}
                    >
                        <AddCircle className={classes.addButton} />
                    </IconButton>

                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="add user modal"
                aria-describedby="modal containing add user form"
                disableBackdropClick={true}
                className={classes.modal}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Grid container >
                        <Grid item xs={1} sm={2}></Grid>
                        <Grid item xs={10} sm={8}>
                            <form onSubmit={handleSubmit}>
                                <Paper elevation={3} style={{ padding: 20 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="firstName"
                                                label="First Name"
                                                required
                                                disabled={dataTransmitting}
                                                value={localUser.firstName}
                                                onChange={e => setLocalUser({
                                                    ...localUser, firstName: e.target.value
                                                })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="lastName"
                                                label="Last Name"
                                                required
                                                disabled={dataTransmitting}
                                                value={localUser.lastName}
                                                onChange={e => setLocalUser({
                                                    ...localUser, lastName: e.target.value
                                                })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControl className={classes.fullWidth} required disabled={dataTransmitting}>
                                                <InputLabel htmlFor="email">Email address</InputLabel>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    aria-describedby="email-helper-text"
                                                    value={localUser.email}
                                                    onChange={e => setLocalUser({
                                                        ...localUser, email: e.target.value
                                                    })}
                                                />
                                                <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    className={classes.fullWidth}
                                                    margin="normal"
                                                    id="dob"
                                                    label="Date of Birth"
                                                    format="dd/MM/yyyy"
                                                    value={localUser.dob}
                                                    onChange={(date: Date | null) => {
                                                        if (date != null)
                                                            setLocalUser({
                                                                ...localUser, dob: date
                                                            })
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    disabled={dataTransmitting}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                type="submit"
                                                disabled={dataTransmitting}>
                                                Submit
                        </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Backdrop open={dataTransmitting}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    open={submitSucesseded}
                                    onClose={() => setSubmitSucesseded(false)}
                                    autoHideDuration={3000}
                                    key='successSnackbar'
                                >
                                    <Alert severity="success">
                                        User Added Successfully!
                    </Alert>
                                </Snackbar>
                                <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    open={submitFailed}
                                    onClose={() => setSubmitFailed(false)}
                                    autoHideDuration={5000}
                                    key='failedSnackbar'
                                >
                                    <Alert severity="error">
                                        {errorMsg}
                                    </Alert>
                                </Snackbar>
                            </form>
                        </Grid>
                    </Grid>
                </Slide>
            </Modal>
        </>
        // </Container>
    )
}