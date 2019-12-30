const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const faker = require('faker');
const start = Date.now()
let count = 1;
MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
    if(err){
        throw(err);
    }
    assert.equal(null, err);
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
        for(var i = (count - 1) * 2000000 + 1; i < count * 2000000 + 1; i += 1){
            arr.push({
                _id: i, 
                Address: faker.address.streetAddress(),
                Region: faker.address.zipCode(),
                Photos: photos()
            })
        }
        console.log('ARRAY completed')
        count ++;
        return arr;
    }
    let arr = array()
    collection.insertMany(arr, function(){
        console.log('INSERT TIME:', Date.now()-start, "ms")
        arr = [];
        arr = array();
        collection.insertMany(arr, function(){
            console.log('INSERT TIME:', Date.now()-start, "ms")
            arr = [];
            arr = array();
            collection.insertMany(arr, function(){
                console.log('INSERT TIME:', Date.now()-start, "ms")
                arr = [];
                arr = array();
                collection.insertMany(arr, function(){
                    console.log('INSERT TIME:', Date.now()-start, "ms")
                    arr = [];
                    arr = array();
                    collection.insertMany(arr, function(err){
                        if(err){
                            throw(err)
                        }
                        console.log('INSERT TIME:', Date.now()-start, "ms")
                        arr = [];   
                        client.close((error)=>{
                            if(error){
                                throw(error)
                            } else {
                                console.log('CONNECTION CLOSED')
                            }
                        })
                        // collection.createIndex({ID: 1}, {unique: true}).then(()=>{
                        //     console.log('INDEX TIME:', Date.now()-start, "ms")
                        //     client.close((error, result)=>{
                        //         if(error){
                        //             throw(error)
                        //         } else {
                        //             console.log('CONNECTION CLOSED')
                        //         }
                        //     })
                        // })
                    })
                })
            })
        })
    })
  })