import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        password: {
            type: String, required: true
        },
        Active: {
            type: Boolean, requiread: true, default: false
        },
        role: {
            type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user'
        }
    },
    { timeStamps: { createdAt: true } }
)

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('user', userSchema)