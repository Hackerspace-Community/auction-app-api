/**
 * Node module imports.
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bidSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;