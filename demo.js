var express = require('express');
var app = express();
const port = process.env.PORT;

app.use(express.static('demo'));

app.listen(port);