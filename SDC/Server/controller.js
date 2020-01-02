const Model = require('./model.js');

module.exports = {
    get: (req, res) => {
        let start = Date.now()
        Model.get((error, data) => {
            if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(data);
            }
        }, req.params)
    },
    post: (req, res) => {
        let start = Date.now()
        Model.post((error, result) => {
            if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(result);
            }
        }, req.body)
    },
    put: (req, res) => {
        let start = Date.now()
        Model.update((error, result) => {
            if(error){
                res.status(400).send(error);
            } else {
                res.status(200).send(result);
            }
        }, req.params, req.body)
    },
    delete: (req, res) => {
        let start = Date.now()
        Model.delete((error, result) => {
            if(error){
                res.status(400).send(error);
            } else{
                res.status(200).send(result);
            }
        }, req.params)
    },
   getAll: (req, res) => {
        let start = Date.now()
       Model.getAll((error, data) => {
           if(error){
               res.status(400).send(error);
           } else {
            res.status(200).send(data);
           }
       }, req.params)
   } 
}