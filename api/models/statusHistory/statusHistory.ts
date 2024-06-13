import {model, Schema} from "mongoose";

const statusHistorySchema = new Schema({
    status: {
        type: String,
        required: true,
    },
    changedBy: {
        type: String,
        enum: ['employer', 'user'],
        required: true,
    },
    changedAt: {
        type: Date,
        default: Date.now,
    },
});

const StatusHistory = model('StatusHistory', statusHistorySchema);

export default StatusHistory;
