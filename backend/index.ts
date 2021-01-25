import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

// import * as winston from 'winston';
// import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './controllers/common.routes.config';
import {UsersRoutes} from './controllers/users.routes.config';
import Debug from "debug";
import DBConnection from "./config/database.mongoose.connection";
// import server from './config/server';
// import './config/database';

const app : express.Application = express();
const server: http.Server = http.createServer(app);
const PORT:Number = 8000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog : debug.IDebugger = Debug("CRUD APP");

//Initiate middleware
app.use(bodyparser.json())
app.use(cors()); //remove?
// app.use(expressWinston.logger({
//   transports: [
//       new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//   )
// }));

routes.push(new UsersRoutes(app, debugLog));

// app.use(expressWinston.errorLogger({
//   transports: [
//       new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//   )
// }));

DBConnection.getInstance(debugLog);

//Express Application starts listening 
app.get('/', (req, res) => res.send('Express + TypeScript Server after added nodemon and applied ts'));
app.listen(PORT, () => {
  debugLog(`⚡️⚡️⚡️ Server running at http://localhost:${PORT} ⚡️⚡️⚡️`);
  routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
  });
});
