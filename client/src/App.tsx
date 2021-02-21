import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { UserForm } from './components/User/UserForm';
import Users from './components/User/Users'
import { IUser } from './interfaces/types';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import { CssBaseline, Container, Grid } from '@material-ui/core'

function App() {
  const [users, setUsers] = useState<Array<IUser>>([]);

  return (
    <>
      <CssBaseline>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UserForm users={users} setUsers={setUsers} />
            </Grid>
            <Grid item xs={12}>
              <Users users={users} setUsers={setUsers} />
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </>
  );
}


export default App;
