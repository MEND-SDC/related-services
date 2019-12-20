const faker = require('faker');
const start = Date.now()
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'guest',
    host: 'localhost',
    database: 'related',
    port: '5432'
})
pool.connect()
pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  pool.end()
})