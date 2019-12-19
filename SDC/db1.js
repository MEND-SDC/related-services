const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const faker = require('faker');
const start = Date.now()
MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
    if(err){
        throw(err);
    }
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db('related')
    const collection = db.collection('houses')
    function photos(){
        var photoarr = [];
        for(var i = 0; i < 5; i++){
            photoarr.push(`https://sdc-images-airbnb.s3-us-west-1.amazonaws.com/img_${faker.random.number({min: 1, max: 919})}.jpeg`)
        }
        return photoarr
    }
    function array (){
        let arr=[];
        for(var i = 1; i < 500001; i += 1){
            arr.push({
                ID: i,
                Address: faker.address.streetAddress(),
                Region: '93193',
                Photos: photos()
            })
        }
        console.log('ARRAY completed')
        return arr;
    }
    let promise = [];
    for(var i = 0; i< 2; i++){
        promise.push(collection.insertMany(array(), function(error, docs){
            if(error){
                throw(error)
            } else {
                console.log(Date.now()-start)
            }
        }))
    }
    return Promise.all(promise)
  });