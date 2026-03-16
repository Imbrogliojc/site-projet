import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        serviceName: {
            type: String, required: true
        },
    },
    { timestamps: true }
)
export default mongoose.model('service', serviceSchema)