const { Pool } = require('pg')
const pool = new Pool({
    user: 'mattshin64',
    host: 'localhost',
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
                console.log(data.rows[0]);
                callback(null, data.rows[0])
            }
        })
    },
    post: (callback, data) => {
        console.log(data)
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
        console.log(data)
        let query = `Update homes set address = '${data.address}', rating = ${data.rating}, price = ${data.price}, owner = '${data.owner}', region_id = ${data.region_id} where home_id = ${homeID}`
        pool.query(query, (err, result) => {
            console.log('Hi')
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
                console.log(results)
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
                console.log(results.rows.length)
            }
        })
    }
}