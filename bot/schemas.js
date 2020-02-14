const Mongoose = require("mongoose")


let profiles = new Mongoose.Schema({
    account: String,
    guild: String,
    name: String,
    roles: Array,
    nickname: {type:String, max:32}
})
.index({guild:1, account: 1, name: 1}, {unique: true}).set('autoIndex', false);

let guild = new Mongoose.Schema({
    id: String,
    roles: {type:Map, default: new Map()},
    whitelist: {type:Map, default: new Map()},
    profileMode: {type: Boolean, default: false}
})


module.exports = {
    profiles: Mongoose.model('profiles', profiles),
    guilds: Mongoose.model('guilds',guild)
}