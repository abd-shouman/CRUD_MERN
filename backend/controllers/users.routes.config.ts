import { CommonRoutesConfig } from './common.routes.config';
import express, { response } from 'express';
import { userModel, IUser } from '../models/users.model';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application, debugLog: debug.IDebugger) {
        super(app, 'UsersRoutes', debugLog);
    }

    configureRoutes() {
        this.app.route('/users')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                let origin: string | undefined = req.headers.origin;
                this.debugLog(`Recieved Request from Origin: ${origin}`)
                if (origin && this.allowedDomains.indexOf(origin) > -1) {
                    this.debugLog(`Origin: ${origin} is included in the lsit of allowed domains`)
                    res.setHeader('Access-Control-Allow-Origin', origin);
                }

                res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
                res.setHeader('Access-Control-Allow-Credentials', 1);

                next();
            })
            .get((req: express.Request, res: express.Response) => {
                userModel.getAll()
                    .then((users: Array<IUser>) => {
                        this.debugLog("Users found")
                        res.status(200).send(users)
                    })
                    .catch((err: any) => {
                        this.debugLog("could not find users")
                        this.debugLog(err);
                        res.status(404)
                    })
                // res.status(200).send("get all users")
            })
            .post((req: express.Request, res: express.Response) => {
                this.debugLog(`posting user`)
                this.debugLog(req.body)
                userModel.addUser(req.body)
                    .then((user: IUser) => {
                        this.debugLog("User added")
                        res.status(200).send(user)
                    })
                    .catch((err: any) => {
                        this.debugLog("Could not add user")
                        this.sendErrorList(res, err.errors);
                    })
            });

        this.app.route(`/users/:userId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // middleware function runs before any request to /users/:userId
                //hanles authorization/authentication
                //Check if cors is allowed
                let origin: string | undefined = req.headers.origin;
                if (origin && this.allowedDomains.indexOf(origin) > -1) {
                    res.setHeader('Access-Control-Allow-Origin', origin);
                }

                res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
                res.setHeader('Access-Control-Allow-Credentials', 1);

                next();
            })
            .get((req: express.Request, res: express.Response) => {
                userModel.getById(req.params.userId)
                    .then((user: IUser) => {
                        this.debugLog("User found")
                        res.status(200).send(user)
                    })
                    .catch((err: any) => {
                        this.debugLog("Could not find user")
                        this.sendErrorList(res, err.errors);
                    })
            })
            .patch((req: express.Request, res: express.Response) => {
                this.debugLog('updating user')
                this.debugLog(req.params.userId, req.body)
                userModel.updateUser(req.params.userId, req.body)
                    .then((user: IUser) => {
                        this.debugLog("user updated")
                        res.status(200).send(user)
                    })
                    .catch((err: any) => {
                        this.debugLog("Could not update user")
                        this.sendErrorList(res, err.errors);
                    })
            })
            .delete((req: express.Request, res: express.Response) => {
                userModel.removeUser(req.params.userId)
                    .then((user: IUser) => {
                        this.debugLog("user delete")
                        res.status(200).send(user)
                    })
                    .catch((err: any) => {
                        this.debugLog("Could not delete user")
                        this.sendErrorList(res, err.errors);
                    })
            });

        return this.app;
    }

}
