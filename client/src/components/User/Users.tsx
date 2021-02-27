import { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/types'
import "./user.css"
import UserItem from './UserItem'
import { getAllUsers, updateUser, deleteUser } from './UserAPI'
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core'

type UserProps = {
  users: Array<IUser>,
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export default function Users(
  { users, setUsers }: UserProps) {
  // const [currentlyEditingIndex, setEditingIndex] = useState<number>(-1);

  // const updateUserInfo = (e: any) => {
  //   let userIndex: number = e.target.dataset["userindex"];
  //   let userattribute: keyof IUser = e.target.dataset["userattribute"]
  //   let newArr = [...users];
  //   newArr[userIndex][userattribute] = e.target.value; // replace e.target.value with whatever you want to change it to
  //   setUsers(newArr)
  // }

  const saveUser = (e: any, updatedUser: IUser) => {
    let userIndex: number = e.target.dataset["userindex"];
    let _id = users[userIndex]._id ? users[userIndex]._id : undefined;

    if (_id !== undefined) {
      updateUser(_id, updatedUser)
        .then((updatedUser) => {
          let newUsersList: IUser[]
          newUsersList = [...users]
          newUsersList.splice(userIndex, 1, updatedUser)
          setUsers(newUsersList);
        }).catch(err => {
          console.error("failed to update user");
          console.error(err)
          alert("Could not update user")
        })
      // .finally(() => {
      //   // setEditingIndex(-1)
      // })
    } else {
      alert("Invalid user selected")
    }
  }

  // const startEditing = (e: any) => {
  //   console.log(e.target.dataset["userindex"])

  //   let userIndex: number = e.target.dataset["userindex"];
  //   setEditingIndex(userIndex)
  // }

  const removeUser = (e: any) => {
    // console.log(e.target.dataset["userindex"])

    let userIndex: number = e.target.dataset["userindex"];
    let _id = users[userIndex]._id ? users[userIndex]._id : undefined;
    if (_id !== undefined) {
      deleteUser(_id)
        .then(() => {
          let newUsersList: IUser[]
          newUsersList = [...users]
          newUsersList.splice(userIndex, 1);
          setUsers(newUsersList);
        }).catch(err => {
          console.error("failed to delete user");
          console.error(err)
          alert("Could not delete user")
        })
    } else {
      alert("Invalid user selected")
    }
  }

  useEffect(() => {
    getAllUsers()
      .then((res: IUser[]) => {
        setUsers(res);
      })
      .catch(err => {
        console.error("failed to add user");
        console.error(err)
      })

  }, [])

  const columns: ColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 }
  ];

  // const rows: RowsProp = [
  //   { id: 1, firstName: "Abd", lastName: "Shouman", email: "hello" },
  //   { id: 2, firstName: "Abd", lastName: "Shouman", email: "hello" },
  //   { id: 3, firstName: "Abd", lastName: "Shouman", email: "hello" },
  //   { id: 4, firstName: "Abd", lastName: "Shouman", email: "hello" }
  // ]

  // const rows: RowsProp = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  //   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  // ];

  // const columns: ColDef[] = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={users} columns={columns} getRowId={(row) => row._id} />
    </div>
    //   
    // 
    // <table>
    //   <tbody>
    //     {users?.map((user, i) =>
    //       <UserItem key={i} userindex={i} user={user}
    //         // currentlyEditingIndex={currentlyEditingIndex} updateUserInfo={updateUserInfo} startEditing={startEditing} 
    //         saveUser={saveUser}
    //         removeUser={removeUser} />
    //     )}
    //   </tbody>
    // </table>
  );

}

