const dotenv = require('dotenv');
const path = require('path');

function isntallEnvVaraibles(){
    const currentDeployEnv = process.env.NODE_ENV; // package.json :  PRODUCTION | INTEGRATION
    const pathToEnv = currentDeployEnv === "PRODUCTION"
    ? path.resolve( ".env.prod")
        : path.resolve( ".env.integration");

    dotenv.config({path: pathToEnv})
}

module.exports = {
    isntallEnvVaraibles
}