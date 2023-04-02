import { cleanEnv, str, port } from "envalid";

//exporting sanitized version of env variables 
//ensures have valid values and won't cause errors later
export default cleanEnv(process.env, {MONGO_CONNECTION_STRING : str(), PORT: port()});