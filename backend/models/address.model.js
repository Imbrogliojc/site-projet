import mongoose from "mongoose";

const adressSchema = mongoose.Schema(
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      rue: {
        type: String, required: true
      },
      codePostal: {
        type: String, required: true
      },
      ville: {
        type: String, required: true
      },
      numeroTelephone: {
        type: String, required: true
      }
    },
    { timestamps: true }
);

export default mongoose.model("address", adressSchema)