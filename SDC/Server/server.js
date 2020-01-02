require('newrelic');
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const port = 3003;
const cors = require('cors');
const Controller = require('./controller.js');

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));

// app.use('/', express.static(path.resolve(__dirname, '../public')));

app.post('/api/related/post', (req, res) => {
  Controller.post(req, res)
})
app.get('/api/related/:houseID/get', (req, res) => {
  Controller.get(req, res)
})
app.put('/api/related/:houseID/update', (req, res) => {
  Controller.put(req, res)
})
app.delete('/api/related/:houseID/delete', (req, res) => {
  Controller.delete(req, res)
})
app.get('/api/related/:houseID', (req, res) => {
  Controller.getAll(req, res )
})

app.listen(port, () => {
  console.log(`listenin to port ${port}`);
});