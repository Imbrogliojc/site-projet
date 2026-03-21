import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
    {
        devis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "devis",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("reservation", reservationSchema)