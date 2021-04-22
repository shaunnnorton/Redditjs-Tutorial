import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    password: { type: String, select: false },
    username: { type: String, required: true },
    posts: [{type: Schema.Types.ObjectId, ref: "post"}],
    comments: [{type: Schema.Types.ObjectId, ref: "comment"}]
},
    {timestamps: {createdAt: 'created_at'}}
)

UserSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
}
)

UserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch)
    })
}

module.exports = mongoose.model("User", UserSchema)