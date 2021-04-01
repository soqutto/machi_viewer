require('dotenv').config();

const {Pool} = require('pg');
const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT 
});

class SQLClient {
    async init(){
        this.client = await pool.connect();
    }

    async execute(query, params = []){
        return (await this.client.query(query, params)).rows;
    }

    async release(){
        await this.client.release(true);
    }

    async begin(){
        await this.client.query('BEGIN');
    }

    async commit(){
        await this.client.query('COMMIT');
    }

    async rollback(){
        await this.client.query('ROLLBACK');
    }
}

const getClient = async () => {
    const postgres = new SQLClient();
    await postgres.init();
    return postgres;
};

module.exports.getSQLClient = getClient;