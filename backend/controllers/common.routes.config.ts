import express from 'express';
import Debug from "debug";

export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    debugLog: debug.IDebugger;
    allowedDomains: string[];

    constructor(app: express.Application, name: string, debugLog: debug.IDebugger) {
        this.app = app;
        this.name = name;
        this.debugLog = debugLog;
        this.allowedDomains = ['http://localhost:3000', 'https://shouman-crud-mern.netlify.app'];

        this.configureRoutes();
    }
    getName(): string {
        return this.name;
    }

    // onOperationError(res : express.Response, errors: any){
    //     let errorsList : any ={}
    //     Object.keys(errors).forEach( (errorKey:any) => {
    //         errorsList[errorKey] =  errors[errorKey].message;
    //     });
    //     this.debugLog(errorsList)                
    //     res.status(400).send(errorsList)
    // }

    //errors : err.errors returned by mongoose in the event of an error
    sendErrorList(res: express.Response, errors: any) {
        let errorsList: any = {}
        Object.keys(errors).forEach((errorKey: any) => {
            errorsList[errorKey] = errors[errorKey].message;
        });
        this.debugLog(errorsList)
        res.status(400).send(errorsList)
    }

    abstract configureRoutes(): express.Application;
}
