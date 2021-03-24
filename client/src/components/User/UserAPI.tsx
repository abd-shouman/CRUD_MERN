
import axios from 'axios';
import { IUser } from '../../interfaces/types';

const resourcesURL = (process.env.NODE_ENV === 'production') ?
    "https://shouman-mern-backend.herokuapp.com/"
    : "http://localhost:8000/"

export const getAllUsers = () => {
    return new Promise<IUser[]>((resolve, reject) => {
        axios.get(`${resourcesURL}users`)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })
}

export const addUser = (userData: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        axios.post(`${resourcesURL}users`, userData)
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
        axios.patch(`${resourcesURL}${_userId}`, updatedUser)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })
}

export const deleteUser = (_userId: string) => {
    return new Promise<IUser>((resolve, reject) => {
        axios.delete(`${resourcesURL}${_userId}`)
            .then(response => {
                return resolve(response.data)
            }).catch(err => {
                return reject(err)
            })
    })

}