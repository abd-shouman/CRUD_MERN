
import axios from 'axios';
import { isConstructorDeclaration } from 'typescript';
import { IUser } from '../../interfaces/types';

export const getAllUsers = () => {
    return new Promise<IUser[]>((resolve, reject) => {
        axios.get('http://localhost:8000/users')
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })
}

export const addUser = (userData: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        axios.post("http://localhost:8000/users", userData)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                // console.error("UserAPI | addUser")
                // console.error(err)
                if (err.response) {
                    let message = Object.values(err.response.data)[0];
                    return reject(message);
                }
                return reject(err)
            })
    })
}
export const updateUser = (_userId: string, updatedUser: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        axios.patch(`http://localhost:8000/users/${_userId}`, updatedUser)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })
}

export const deleteUser = (_userId: string) => {
    return new Promise<IUser>((resolve, reject) => {
        axios.delete(`http://localhost:8000/users/${_userId}`)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })

}