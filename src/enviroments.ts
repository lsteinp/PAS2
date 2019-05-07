var env = process.env.NODE_ENV || "development";
var Environment = require("./config.json")["ambientes"][env];    

export default Environment;