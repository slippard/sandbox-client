"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
;
exports.UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userid: { type: String, required: true },
    messageCount: { type: Number, required: true },
    bots: { type: Array, required: false },
    doctor: { type: Boolean, required: true },
    dev: { type: Boolean, required: true },
    repositories: { type: Array, required: false }
});
var DUser = mongoose.model('User', exports.UserSchema);
exports["default"] = DUser;
