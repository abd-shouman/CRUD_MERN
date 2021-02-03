import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { UserForm } from './components/User/UserForm';
import Users from './components/User/Users'
import { IUser } from './interfaces/types';

function App() {
  const [users, setUsers] = useState<Array<IUser>>([]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <UserForm users={users} setUsers={setUsers} />
      <Users users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
