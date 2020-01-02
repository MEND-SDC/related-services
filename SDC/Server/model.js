const { Pool } = require('pg')
const pool = new Pool({
    user: 'ec2-user',
    password: 'yourpassword',
    host: '13.52.215.2',
    database: 'related',
    port: '5432'
})

module.exports = {
    get: (callback, id) => {
        let homeID = id.houseID
        pool.query(`Select * from homes where home_id = ${homeID}`, (err, data) => {
            if(err){
                callback(err, null)
            } else {
                console.log(data);
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
        pool.query(`select * from homes where region_id = (select region_id from homes where home_id = ${homeID})`, (err, results) => {
            if(err){
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}