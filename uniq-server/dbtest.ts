
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/uniq?replicaSet=rs0', { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    email: String
})

const User = mongoose.model('users', userSchema)



User.find((err: any, users: any) => console.log(users))

User.watch().on('change', console.log)
