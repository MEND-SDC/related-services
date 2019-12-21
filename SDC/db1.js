const faker = require('faker');
const start = Date.now()
const { Pool } = require('pg')
const fs = require('fs')
const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PW','PA','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']
const pool = new Pool({
    user: 'mattshin64',
    host: 'localhost',
    database: 'related',
    port: '5432'
})

function createRegion (){
    let string = ''
    for(var i = 1; i <= 53; i++){
        string += states[i] 
        string += '\n'
    }
    return string
}
fs.writeFile('./sdc/region.csv', createRegion(), (err)=> {
    if(err){
        throw err;
    }
    pool.query("COPY regions(name) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/region.csv' DELIMITER ','")
})

function createPhoto (num){
    let string = ''
    for(var m = num; m < num + 2500000; m++){
        for(var j = 1; j <= 5; j++){
            string += `https://sdc-images-airbnb.s3-us-west-1.amazonaws.com/img_${faker.random.number({min: 1, max: 919})}.jpeg`
            string += ','
            string += m
            string += '\n'
        }
    }
    console.log('DONE!')
    return string
}

function createHome (num){
    let string = ''
    for(var i = num; i <= num+4999999; i++){
        string += faker.address.streetAddress()
        string += ','
        string += faker.random.number({min: 1, max: 5})
        string += ','
        string += faker.random.number({min: 40, max: 300})
        string += ','
        string += faker.name.findName()
        string += ','
        string += faker.random.number({min: 1, max: 53})
        string += '\n' 
    }
    return string
}
fs.writeFile('./sdc/home.csv', createHome(1), (err)=>{
    if(err){
        throw err;
    }
    pool.query("COPY homes(address,rating,price,owner,region_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/home.csv' DELIMITER ','", (err)=>{
        if(err){
            throw(err)
        }
        fs.writeFile('./sdc/home.csv', createHome(5000001), (err)=>{
            if(err){
                throw(err);
            }
            pool.query("COPY homes(address,rating,price,owner,region_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/home.csv' DELIMITER ','", (err)=>{
                if(err){
                    throw(err);
                }
                console.log(Date.now()- start)
                console.log('DONE WITH HOME')
                fs.writeFile('./sdc/photo.csv', createPhoto(1), (err) => {
                    if(err){
                        throw err;
                    }
                    pool.query("COPY photos(url, home_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/photo.csv' DELIMITER ','", (err)=>{
                        if(err){
                            throw(err)
                        }
                        console.log("First photo batch:", Date.now()- start)
                        fs.writeFile('./sdc/photo.csv', createPhoto(2500001), (err)=>{
                            if(err){
                                throw err;
                            }
                            pool.query("COPY photos(url, home_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/photo.csv' DELIMITER ','", (err)=>{
                                if(err){
                                    throw(err)
                                }
                                console.log("Second photo batch:",Date.now()- start)
                                fs.writeFile('./sdc/photo.csv', createPhoto(5000001), (err)=>{
                                    if(err){
                                        throw err;
                                    }
                                    pool.query("COPY photos(url, home_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/photo.csv' DELIMITER ','", (err)=>{
                                        if(err){
                                            throw(err)
                                        }
                                        console.log("Third photo batch:",Date.now()- start)
                                        fs.writeFile('./sdc/photo.csv', createPhoto(7500001), (err)=>{
                                            if(err){
                                                throw err;
                                            }
                                            pool.query("COPY photos(url, home_id) FROM '/Users/mattshin64/Documents/GitHub/related-services/SDC/photo.csv' DELIMITER ','", (err)=>{
                                                if(err){
                                                    throw(err)
                                                }
                                                console.log("Final photo batch:",Date.now()- start)
                                                console.log('COMPLETE!')
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
 