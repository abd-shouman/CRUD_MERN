import { useEffect, useState, useRef } from 'react'
import { IUser } from '../../interfaces/types'
import "./user.css"
// import UserItem from './UserItem'
import { getAllUsers, updateUser, deleteUser } from './UserAPI'
import {
  DataGrid,
  // RowsProp, 
  ColDef,
  // SelectedRowCount 
} from '@material-ui/data-grid';
import {
  IconButton,
  // Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core'
import { Edit, Save, Clear, Delete } from '@material-ui/icons';
import SnackbarAlert, { VerticalDirection, HorizontalDirection } from '../../helpers/SnackbarAlert'

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

  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [sucessInteraction, setSucessInteraction] = useState<boolean>(false);
  const [failedInteraction, setFailedInteraction] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");
  const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(false)
  const [localEditableUser, setLocalEditableUser] = useState<IUser>({ firstName: "", lastName: "", email: "" })
  const [cursorPosition, setCursorPosition] = useState<number>(0)

  // const inputRefs = useRef([]);

  const saveUser = () => {
    // let userIndex: number = e.target.dataset["userindex"];
    let userIndex: number = selectedRowIndex
    let _id = users[userIndex]._id ? users[userIndex]._id : undefined;

    if (_id !== undefined) {
      updateUser(_id, localEditableUser)
        .then((updatedUser) => {
          if (!updatedUser._id)
            throw new Error("invalid user. no id provied")
          else if (!localEditableUser.id)
            throw new Error("invalid value for local editable user")
          else {
            let newUsersList: IUser[]
            newUsersList = [...users]
            updatedUser = { ...updatedUser, id: +(localEditableUser.id) }
            newUsersList.splice(userIndex, 1, updatedUser)
            setUsers(newUsersList);
            setCurrentlyEditing(false)
            setMessage("User Updated Succefully")
            setSucessInteraction(true)
          }
        }).catch(err => {
          console.error("failed to update user");
          console.error(err)
          // alert("Could not update user")
          setMessage("Could not update user")
          setFailedInteraction(true)
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

  const removeUser = () => {
    // console.log(e.target.dataset["userindex"])

    // let userIndex: number = e.target.dataset["userindex"];
    let userIndex: number = selectedRowIndex;
    let _id = users[userIndex]._id ? users[userIndex]._id : undefined;
    if (_id !== undefined) {
      deleteUser(_id)
        .then(() => {
          let newUsersList: IUser[]
          newUsersList = [...users]
          newUsersList.splice(userIndex, 1);
          setUsers(newUsersList);
          setMessage("User Deleted Succefully")
          setSucessInteraction(true)
        }).catch(err => {
          console.error("failed to delete user");
          console.error(err)
          setMessage("Failed to Delete User")
          setFailedInteraction(true)
          // alert("Could not delete user")
        })
    } else {
      // alert("Invalid user selected")
      setMessage("Failed to Delete User")
      setFailedInteraction(true)
    }
  }

  /*
  * equivlalled onComponentMound 
  * retrives all users
  */
  useEffect(() => {
    getAllUsers()
      .then((res: IUser[]) => {
        setUsers(
          res.map((user, index) => {
            return { ...user, id: index }
          }
          ));
      })
      .catch(err => {
        console.error("failed to rerives user");
        console.error(err)
      })
  }, [])

  /*
  * OnSelectionChanges: update localUser
  */
  useEffect(() => {
    setCursorPosition(0); //Reset cursor position
    setLocalEditableUser(users[selectedRowIndex])
  }, [selectedRowIndex])


  const inputList = ["firstName", "lastName", "email"]
  const updateUserInfo = (e: any) => {
    if (!localEditableUser) {
      alert("Invalid User. Can't update user info")
      return
    }
    if (e.target.dataset["userattribute"] !== undefined) {
      // let updatedInputIndex: number = inputList.findIndex(e.target.dataset["userattribute"])
      // let cursorPos;
      // if (inputRefs.current[updatedInputIndex] !== null)
      //   cursorPos = inputRefs.current[updatedInputIndex].selectionStart
      let cursorPos = e.target.selectionStart;

      let index: keyof IUser = e.target.dataset["userattribute"]
      let updatedLocalUser: IUser = { ...localEditableUser, [index]: e.target.value }
      setLocalEditableUser(updatedLocalUser)

      // if (inputRef !== null && inputRef.current !== null)
      //   inputRef!.current!.setSelectionRange(cursorPos, cursorPos);

      // inputRef!.current!.setSelectionRange(cursorPos, cursorPos);
      const element = e.target
      window.requestAnimationFrame(() => {
        element.selectionStart = cursorPos
        element.selectionEnd = cursorPos
      })


    }
  }
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const columns: ColDef[] = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      renderCell: (params) => {
        // if(true)
        //   return params;
        if (params.rowIndex === selectedRowIndex && currentlyEditing)
          return (
            <textarea
              name="firstName"
              data-userattribute="firstName"
              value={localEditableUser.firstName}
              onChange={(e) => { setCursorPosition(e.target.selectionStart); updateUserInfo(e); }}
              onFocus={(e) => { e.target.selectionStart = cursorPosition; }}
              ref={inputRef}
            />
          )
        else
          return (
            <>{params.value}</>
          )
      }
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      renderCell: (params) => {
        if (params.rowIndex === selectedRowIndex && currentlyEditing)
          return (
            <textarea
              name="lastName"
              data-userattribute="lastName"
              value={localEditableUser.lastName}
              onChange={updateUserInfo}>
            </textarea>
          )
        else
          return (
            <>{params.value}</>
          )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      renderCell: (params) => {
        if (params.rowIndex === selectedRowIndex && currentlyEditing)
          return (
            <textarea
              name="email"
              data-userattribute="email"
              value={localEditableUser.email}
              onChange={updateUserInfo}></textarea>
          )
        else
          return (
            <>{params.value}</>
          )
      }

    },
    {
      field: '',
      headerName: '',
      width: 250,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.rowIndex === selectedRowIndex && currentlyEditing)
          return (
            <>
              <IconButton
                aria-label="save"
                color="default"
                size="small"
                onClick={saveUser}
              >
                <Save />
              </IconButton>
              <IconButton
                aria-label="cancel"
                color="secondary"
                size="small"
                onClick={() => { setCurrentlyEditing(false) }}
              >
                <Clear />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => setOpenAlertDialog(true)}
              >
                <Delete />
              </IconButton>
            </>
          )
        else
          return (
            <>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => { setCurrentlyEditing(true) }}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => setOpenAlertDialog(true)}
              >
                <Delete />
              </IconButton>
            </>
          )
      }
    }
  ];


  return (
    <div style={{ display: 'flex', height: '70vh' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={users}
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelectedRowIndex(+newSelection.selectionModel[0])
          }}

        // checkboxSelection={true}
        />
        {(users.length > 0 && selectedRowIndex >= 0) &&
          <Dialog
            open={openAlertDialog}
            onClose={() => setOpenAlertDialog(false)}
            aria-labelledby="delete-user-dialog"
            aria-describedby="delete user dialog"
          >
            <DialogTitle id="alert-dialog-title">Delete {users[selectedRowIndex].firstName + " " + users[selectedRowIndex].lastName}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the user {users[selectedRowIndex].firstName + " " + users[selectedRowIndex].lastName}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAlertDialog(false)} color="primary" autoFocus>
                No
              </Button>
              <Button onClick={() => { setOpenAlertDialog(false); removeUser(); }} color="primary" >
                yes
              </Button>
            </DialogActions>
          </Dialog>
        }
        <SnackbarAlert
          vertical={VerticalDirection.top}
          horizontal={HorizontalDirection.center}
          open={sucessInteraction}
          onClose={setSucessInteraction}
          autoHideDuration={3000}
          snackKey='successSnackbar'
          severity="success"
          message={message}
        />
        <SnackbarAlert
          vertical={VerticalDirection.top}
          horizontal={HorizontalDirection.center}
          open={failedInteraction}
          onClose={setFailedInteraction}
          autoHideDuration={5000}
          snackKey='failedSnackbar'
          severity="error"
          message={message}
        />

      </div>
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

