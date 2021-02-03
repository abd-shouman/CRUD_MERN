import { IUser } from '../../interfaces/types'
type UserProps = {
    userindex: number,
    user: IUser,
    currentlyEditingIndex: number,
    updateUserInfo: React.ChangeEventHandler<HTMLTextAreaElement>,
    startEditing: React.MouseEventHandler<HTMLButtonElement>,
    saveUser: React.MouseEventHandler<HTMLButtonElement>,
    removeUser: React.MouseEventHandler<HTMLButtonElement>
};

export default function UserItem({
    userindex, user, currentlyEditingIndex,
    updateUserInfo, startEditing,
    saveUser, removeUser }: UserProps) {
    const getDisplayName = (firstName: string, lastName: string) => {
        return `${lastName}, ${firstName}`
    }
    return (
        <tr>
            <td>
                {currentlyEditingIndex == userindex ?
                    <span>
                        <textarea
                            name="firstName"
                            value={user.firstName}
                            data-userindex={userindex}
                            data-userattribute="firstName"
                            onChange={updateUserInfo}>
                        </textarea><br />
                        <textarea
                            name="lastName"
                            value={user.lastName}
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
                {currentlyEditingIndex == userindex ?
                    <span><textarea
                        name="firstName"
                        value={user.email}
                        data-userindex={userindex}
                        data-userattribute="email"
                        onChange={updateUserInfo}></textarea><br /></span>
                    :
                    user.email
                }
            </td>
            <td>
                {currentlyEditingIndex == userindex ?
                    <button data-userindex={userindex} onClick={saveUser}>Save</button>
                    :
                    <button data-userindex={userindex} onClick={startEditing}>Edit</button>
                }
                <button data-userindex={userindex} onClick={removeUser}>Delete</button>
            </td>
        </tr >

        // <li className="userItem">{getDisplayName(user.firstName, user.lastName)}</li>
    )
}
