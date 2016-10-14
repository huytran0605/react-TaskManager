const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/TaskMng';
mongoose.connect(dbUrl);
var  db = mongoose.connection;
//return
module.exports = db;