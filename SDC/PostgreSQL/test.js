const { Pool } = require('pg')
const pool = new Pool({
    user: 'ec2-user',
    password: 'yourpassword',
    host: '13.52.215.2',
    database: 'related',
    port: '5432'
})
console.log('hello')

pool.query('Select * from homes where home_id = 1', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data.rows[0])
})