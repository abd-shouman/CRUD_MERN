import { useEffect, useState } from 'react';
import { IUser } from '../../interfaces/types'
type UserProps = {
    userindex: number,
    user: IUser,
    // currentlyEditingIndex: number,
    // updateUserInfo: React.ChangeEventHandler<HTMLTextAreaElement>,
    // startEditing: React.MouseEventHandler<HTMLButtonElement>,
    saveUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, updatedUser: IUser): void,
    removeUser: React.MouseEventHandler<HTMLButtonElement>
};

export default function UserItem({
    userindex, user,
    // currentlyEditingIndex, updateUserInfo, startEditing,
    saveUser, removeUser }: UserProps) {

    const getDisplayName = (firstName: string, lastName: string) => {
        return `${lastName}, ${firstName}`
    }

    // const saveUser = (e: any) => {
    //     // let userIndex: number = e.target.dataset["userindex"];
    //     let _id = localUser._id ? localUser._id : undefined;
    //     // let newUsersList: IUser[]

    //     if (_id !== undefined) {
    //         updateUser(_id, localUser)
    //             .then((updatedUser) => {
    //                 newUsersList = [...users]
    //                 newUsersList.splice(userIndex, 1, updatedUser)
    //                 setUsers(newUsersList);
    //             }).catch(err => {
    //                 console.error("failed to update user");
    //                 console.error(err)
    //             })
    //         // .finally(() => {
    //         //   // setEditingIndex(-1)
    //         // })
    //     } else {
    //         alert("Invalid user selected")
    //     }
    // }

    // let localUser: (IUser) = user

    const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(false)

    const [localUser, setLocalUser] = useState<IUser>(user)
    //Always sync localUser with user props
    useEffect(() => {
        if (user != localUser) {
            console.log("User prop changed. Updating local user")
            setLocalUser(user)
        } else {
            console.log("User prop changed. local user remains the same")
        }

    }, [user])

    const startEditing = (e: any) => {
        setCurrentlyEditing(true);
    }
    const updateUserInfo = (e: any) => {
        if (!localUser) {
            alert("Invalid User. Can't update user info")
            return
        }
        let index: keyof IUser = e.target.dataset["userattribute"]
        let updatedLocalUser = { ...localUser }
        updatedLocalUser[index] = e.target.value
        setLocalUser(updatedLocalUser)
    }

    return (
        <tr>
            <td>
                {currentlyEditing ?
                    <span>
                        <textarea
                            name="firstName"
                            value={localUser.firstName}
                            data-userindex={userindex}
                            data-userattribute="firstName"
                            onChange={updateUserInfo}>
                        </textarea><br />
                        <textarea
                            name="lastName"
                            value={localUser.lastName}
                            data-userindex={userindex}
                            data-userattribute="lastName"
                            onChange={updateUserInfo}>
                        </textarea>
                    </span>
                    :
                    getDisplayName(user.firstName, user.lastName)
                }
            </td>
            <td>
                {currentlyEditing ?
                    <span><textarea
                        name="email"
                        value={localUser.email}
                        data-userindex={userindex}
                        data-userattribute="email"
                        onChange={updateUserInfo}></textarea><br /></span>
                    :
                    user.email
                }
            </td>
            <td>
                {currentlyEditing ?
                    <span>
                        <button data-userindex={userindex} onClick={(e) => { setCurrentlyEditing(false); saveUser(e, localUser) }}>Save</button>
                        <button data-userindex={userindex} onClick={(e) => { setCurrentlyEditing(false) }}>Cancel</button>
                    </span>
                    :
                    <button data-userindex={userindex} onClick={startEditing}>Edit</button>
                }
                <button data-userindex={userindex} onClick={removeUser}>Delete</button>
            </td>
        </tr >

        // <li className="userItem">{getDisplayName(user.firstName, user.lastName)}</li>
    )
}
