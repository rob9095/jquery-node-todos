var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://test:testuser@ds059365.mlab.com:59365/todo-db');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');