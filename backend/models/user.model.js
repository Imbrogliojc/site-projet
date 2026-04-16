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
        isVerified: {
            type: Boolean, default: false
        },
        verificationToken: {
            type: String
        },
        resetToken: {
            type: String
        },
        resetTokenExpire: {
            type: Date
        },
        role: {
            type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user'
        }
    },
    { timestamps: { createdAt: true } }
)

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('user', userSchema)