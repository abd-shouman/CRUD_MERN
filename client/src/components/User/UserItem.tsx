import { IUser } from '../../interfaces/types'

type UserProps = { user: IUser };

export default function UserItem({ user }: UserProps) {
    const getDisplayName = (firstName: string, lastName: string) => {
        return `${lastName}, ${firstName}`
    }
    return (
        <tr>
            <td>
                {getDisplayName(user.firstName, user.lastName)}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>

        // <li className="userItem">{getDisplayName(user.firstName, user.lastName)}</li>
    )
}
