import mongoose from "mongoose"

class DBConnection{
    private static dbconnectionSingltonInstance:DBConnection;

    public static getInstance(debugLog: debug.IDebugger): DBConnection {
        if (!DBConnection.dbconnectionSingltonInstance) {
            DBConnection.dbconnectionSingltonInstance = new DBConnection(debugLog);
        }

        return DBConnection.dbconnectionSingltonInstance;
    }

    constructor(debugLog: debug.IDebugger){
        debugLog("DBConnection Constructor")
        const url = process?.env?.DB_URL? process.env.DB_URL : ""; 

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        
        debugLog(`trying to establish connection to ${url}`)
        mongoose.connect(url).then(
            () => { debugLog('Mongoose connection established') },
            (err) => { 
                debugLog('Could not establish connection');
                debugLog(err);
            }
        );
        mongoose.connection.on('error', err => {
            debugLog(`loggin onConnection error`)
            debugLog(err)
        });
    }
}

//Exports Mongoose as a singleton
// export default new DBConnection();
export default DBConnection;