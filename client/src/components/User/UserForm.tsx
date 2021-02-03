import { useState } from "react"
import { IUser } from "../../interfaces/types";
import { addUser } from "./UserAPI"

type UserFormProps = {
    users: Array<IUser>,
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export function UserForm(
    { users, setUsers }: UserFormProps
) {
    const [user, setUser] = useState<IUser>({ firstName: "", lastName: "", email: "" });
    const [dataTransmitting, setDataTransmitting] = useState<boolean>(false);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        setDataTransmitting(true)
        addUser(user)
            .then(addedUser => {
                setUsers([...users, addedUser])
                console.log("user added")
                alert("user added")
            })
            .catch(err => {
                console.error(err)
                alert("failed to add user")
            })
            .finally(() => {
                setDataTransmitting(false)
            })
    }
    // const [transmittingData]
    return (
        <div className="UserForm">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={user.firstName}
                        required
                        disabled={dataTransmitting}
                        onChange={e => setUser({
                            ...user, firstName: e.target.value
                        })}
                    />
                </label><br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={user.lastName}
                        disabled={dataTransmitting}
                        required
                        onChange={e => setUser({
                            ...user, lastName: e.target.value
                        })}
                    />
                </label><br />
                <label>
                    Email:
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        disabled={dataTransmitting}
                        required
                        onChange={e => setUser({
                            ...user, email: e.target.value
                        })}
                    />
                </label><br />
                <label>
                    Date of birth:
                    <input
                        type="date"
                        placeholder="Last Name"
                        name="lastName"
                        value={user.dob}
                        disabled={dataTransmitting}
                        onChange={e => setUser({
                            ...user, dob: e.target.value
                        })}
                    />
                </label><br /><br />
                <input type="submit" value="Submit" />
            </form>
            <div hidden={!dataTransmitting}>Submitting...</div>
        </div>
    )
}