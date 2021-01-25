import mongoose, { Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import {isEmailValid} from "../helpers/validations.regx"

export interface IUser extends Document {
    _id?: string,
    email: string,
    firstName: string,
    lastName: string,
    dob?: string
}  

const userSchema = new Schema({
    email: {
        type: String, required: true, index: true, unique: true, dropDup: true,
        validate: [isEmailValid, 'Email addreess is not valid']
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dob: {type: Date, required: false}
});
userSchema.plugin(uniqueValidator);

//Todo fix later
let userMongooseModel = mongoose.model('User',userSchema);

export let userModel = Object();
userModel.getAll = () => {
    return userMongooseModel.find({}).exec();
}

userModel.getById = (_id:string) => userMongooseModel.findById(_id).exec();

userModel.updateUser = (_id:string, user: IUser) => {
    return userMongooseModel.findByIdAndUpdate(
        _id,
        // {firstName: user.firstName, lastName: user.lastName, email: user.email}, 
        user,
        {new: true, runValidators: true, context: 'query'}
    ).exec();
}

userModel.removeUser = (_id: IUser) => {
    return userMongooseModel.findByIdAndDelete(_id).exec();
}

userModel.addUser = (user: IUser) => new userMongooseModel(user).save();