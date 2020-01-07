const { Pool } = require('pg')
const pool = new Pool({
    user: 'ec2-user',
    password: 'yourpassword',
    host: '172.31.15.104',
    database: 'related',
    port: '5432'
})
let current = {};

module.exports = {
    get: (callback, id) => {
        let homeID = id.houseID
        pool.query(`Select * from homes where home_id = ${homeID}`, (err, data) => {
            if(err){
                callback(err, null)
            } else {
                current = data.rows[0]
                console.log(current)
                callback(null, data.rows[0])
            }
        })
    },
    post: (callback, data) => {
        pool.query(`Insert into homes (address, rating, price, owner, region_id) values ('${data.address}', ${data.rating}, ${data.price}, '${data.owner}', ${data.region_id})`, (err, results) => {
            if(err){
                console.log(err)
                callback(err, null);
            }
            else {
                callback(null, results)
            }
        })
    },
    update: (callback, id, data) => {
        let homeID = id.houseID
        let query = `Update homes set address = '${data.address}', owner = '${data.owner}', region_id = ${data.region_id} where home_id = ${homeID}`
        pool.query(query, (err, result) => {
            if(err){
                callback(err, null)
            } else {
                callback(null, result)
            }
        }) 
    },
    delete: (callback, id) => {
        let homeID = id.houseID
        pool.query(`Delete from photos where home_id = ${homeID}; Delete from homes where home_id = ${homeID}`, (err, results) => {
            if(err){
                console.log(err)
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getAll: (callback, id) => {
        let homeID = id.houseID
        pool.query(`select * from homes where region_id = (select region_id from homes where home_id = ${homeID}) and rating > 4.5 and price < 200 limit 12;`, (err, results) => {
            if(err){
                callback(err, null)
            } else {
                console.log(results.rowCount)
                callback(null, results.rows)
            }
        })
    }
}