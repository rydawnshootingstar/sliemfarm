const { Pool } = require('pg');
const config = require('./secrets/dbConfig');

const pool = new Pool(config);

module.exports = pool;

