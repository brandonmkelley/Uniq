"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/uniq?replicaSet=rs0', { useNewUrlParser: true, useUnifiedTopology: true });
var userSchema = new mongoose.Schema({
    email: String
});
var User = mongoose.model('users', userSchema);
User.find(function (err, users) { return console.log(users); });
User.watch().on('change', console.log);
