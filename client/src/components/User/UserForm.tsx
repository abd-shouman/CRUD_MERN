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
    Container,
    CircularProgress,
    Backdrop,
    Snackbar,
    makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


type UserFormProps = {
    users: Array<IUser>,
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

const useStyles = makeStyles({
    fullWidth: {
        width: '100%',
    },
});


export function UserForm(
    { users, setUsers }: UserFormProps
) {
    const [user, setUser] = useState<IUser>({ firstName: "", lastName: "", email: "", dob: undefined });
    const [dataTransmitting, setDataTransmitting] = useState<boolean>(false);
    const [submitSucesseded, setSubmitSucesseded] = useState<boolean>(false);
    const [submitFailed, setSubmitFailed] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<String>("");

    const classes = useStyles();

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        setDataTransmitting(true)
        addUser(user)
            .then(addedUser => {
                setUsers([...users, addedUser])
                setSubmitSucesseded(true)
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
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                required
                                disabled={dataTransmitting}
                                value={user.firstName}
                                onChange={e => setUser({
                                    ...user, firstName: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                required
                                disabled={dataTransmitting}
                                value={user.lastName}
                                onChange={e => setUser({
                                    ...user, lastName: e.target.value
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
                                    value={user.email}
                                    onChange={e => setUser({
                                        ...user, email: e.target.value
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
                                    value={user.dob}
                                    onChange={(date: Date | null) => {
                                        if (date != null)
                                            setUser({
                                                ...user, dob: date
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
        </Container>
    )
    // const [transmittingData]
    // return (
    //     <>
    //     < FormControl >
    //     <InputLabel htmlFor="firstName">First Name</InputLabel>
    //     <Input id="firstName" />
    // </FormControl >

    // <FormControl>
    //     <InputLabel htmlFor="lastName">Last Name</InputLabel>
    //     <Input id="lastName" />
    // </FormControl>

    // <FormControl>
    //     <InputLabel htmlFor="email">Email address</InputLabel>
    //     <Input id="email" aria-describedby="email-helper-text" />
    //     <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
    // </FormControl>
    //     </>
    // )
    // return (
    //     <div className="UserForm">
    // <form onSubmit={handleSubmit}>
    //     <label>
    //             First Name:
    //         <input
    //             type="text"
    //             placeholder="First Name"
    //             name="firstName"
    //             value={user.firstName}
    //             required
    //             disabled={dataTransmitting}
    //             onChange={e => setUser({
    //                 ...user, firstName: e.target.value
    //             })}
    //         />
    //     </label><br />
    //     <label>
    //             Last Name:
    //         <input
    //             type="text"
    //             placeholder="Last Name"
    //             name="lastName"
    //             value={user.lastName}
    //             disabled={dataTransmitting}
    //             required
    //             onChange={e => setUser({
    //                 ...user, lastName: e.target.value
    //             })}
    //         />
    //     </label><br />
    //     <label>
    //             Email:
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             name="email"
    //             value={user.email}
    //             disabled={dataTransmitting}
    //             required
    //             onChange={e => setUser({
    //                 ...user, email: e.target.value
    //             })}
    //         />
    //     </label><br />
    //     <label>
    //             Date of birth:
    //         <input
    //             type="date"
    //             placeholder="Last Name"
    //             name="lastName"
    //             value={user.dob}
    //             disabled={dataTransmitting}
    //             onChange={e => setUser({
    //                 ...user, dob: e.target.value
    //             })}
    //         />
    //     </label><br /><br />
    //     <input type="submit" value="Submit" />
    // </form>
    // <div hidden={!dataTransmitting}>Submitting...
    // </Grid >
    //     
    // </Grid >
    // )
}