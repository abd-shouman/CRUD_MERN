import { useEffect, useState } from 'react';


interface IUser extends Document {
  _id?: string,
  email: string,
  firstName: string,
  lastName: string,
  dob?: string
}

type UserProps = { user: IUser };
function User({ user }: UserProps) {
  return (
    <li>{user.firstName} {user.lastName}</li>
  )
}

export default function Users() {
  const [users, setUsers] = useState<Array<IUser> | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(usersJson => setUsers(usersJson))
      .catch(err => {
        console.error("failed to fetch");
        console.error(err)
      })

  }, [])

  return (
    <div>
      User list
      {users?.map((user, id) =>
        <User key={id} user={user} />
      )}
    </div>
  );

}

