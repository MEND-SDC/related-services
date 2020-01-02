const fs = require('fs')

function createNumbers(){
    let string = ''
    for(var i = 1; i <= 1000000; i ++){
        string += i
        string += '\n'
    }
    return string
}
fs.writeFile('./artillery/id.csv', createNumbers(), (err) => {
    if(err){
        throw (err);
    } 
    console.log('DONE')
})