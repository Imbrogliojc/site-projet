import mongoose from "mongoose";

const devisSchema = mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "service",
            required: true
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address",
            required: true
        },
        typeClient: {
            type: String,
            required: true
        },
        marqueVehicule: {
            type: String,
            required: true
        },
        modeleVehicule: {
            type: String,
            required: true
        },
        pieceJointe: {
            type: [String],
            default: []
        },
        dateIt: {
            type: Date
        },
        heureIt: {
            type: String
        },
        prixTtc: {
            type: Number
        },
        status: {
            type: String,
            enum: ["pending", "validated", "archived"],
            default: "pending"
        }
    },
    { timestamps: true }
);

export default mongoose.model("devis", devisSchema)