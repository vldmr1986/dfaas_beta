require('dotenv').config();
const  mysql      = require('mysql');
const {DB_NAME="db", TABLE_NAME = "deployments", DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env;

const createDbQuery = `CREATE DATABASE ${DB_NAME};`;
const createTableQuery = `CREATE TABLE ${TABLE_NAME} (id int UNSIGNED AUTO_INCREMENT, name varchar(20), surname varchar(20), email varchar(50), country varchar(20), space varchar(20), ts TIMESTAMP, PRIMARY KEY(id));`;

const db_pipe_creation = async ()=>{
    const  create_db_connection = await mysql.createConnection({
        host     : DB_HOST || 'localhost',
        user     : DB_USERNAME,
        password : DB_PASSWORD,
    });
    await create_db_connection.connect();
    const errors = [];
    await create_db_connection.query(createDbQuery, async (error, results, fields) => {
            if (error) {
                errors.push("Can not create DB " + DB_NAME);
                throw error;
            }
    });
    await create_db_connection.end();

   const create_table_connection = await mysql.createConnection({
        host     : DB_HOST || 'localhost',
        user     : DB_USERNAME,
        password : DB_PASSWORD,
        database : DB_NAME
    });
    setTimeout(async ()=>{

    await create_table_connection.query(createTableQuery, async (error, results, fields) => {
        if (error) {
            errors.push("Can not create Table " + TABLE_NAME);
            throw error;
        }
    });

    if (!errors.length) {
        const successStr = `Database "${DB_NAME}" is ready to use with the tables: "${TABLE_NAME}";`;
        console.log(successStr);
    }
    await create_table_connection.end();
}, 500);
};

db_pipe_creation();
