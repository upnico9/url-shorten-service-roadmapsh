import mongoose from "mongoose";

const shortenSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        autoIncrement: true,
    },
    original_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    visits: {
        type: Number,
        default: 0,
    },
});

const Shorten = mongoose.model("Shorten", shortenSchema);

export default Shorten;