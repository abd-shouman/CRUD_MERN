import { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/types'
import "./user.css"
import UserItem from './UserItem'
import { getAllUsers } from './UserService'

type UserProps = {
  users: Array<IUser>,
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export default function Users(
  { users, setUsers }: UserProps
) {
  // const [users, setUsers] = useState<Array<IUser>>([]);
  useEffect(() => {
    getAllUsers()
      .then((res: IUser[]) => {
        setUsers(res);
      })
      .catch(err => {
        console.error("failed to fetch");
        console.error(err)
      })

  }, [])

  return (
    <table>{users?.map((user, id) =>
      <UserItem key={id} user={user} />
    )}
    </table>
  );

}

