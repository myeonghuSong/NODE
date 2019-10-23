const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);



app.listen(3000, ()=> {
    console.log('start server on 3000 port');
})
