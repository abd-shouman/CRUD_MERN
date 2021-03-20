//In large projects this should be divded into smaller files where relvant types are grouped together
export interface IUser {
    _id?: string,
    email: string,
    firstName: string,
    lastName: string,
    dob?: Date,
    id?: number
}  