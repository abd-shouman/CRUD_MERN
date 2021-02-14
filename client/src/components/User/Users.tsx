import { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/types'
import "./user.css"
import UserItem from './UserItem'
import { getAllUsers, updateUser, deleteUser } from './UserAPI'

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

  return (
    <table>
      <tbody>
        {users?.map((user, i) =>
          <UserItem key={i} userindex={i} user={user}
            // currentlyEditingIndex={currentlyEditingIndex} updateUserInfo={updateUserInfo} startEditing={startEditing} 
            saveUser={saveUser}
            removeUser={removeUser} />
        )}
      </tbody>
    </table>
  );

}

