
import axios from 'axios';
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
                return reject(err)
            })
    })
}