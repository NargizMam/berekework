import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LastNewsBlockSchema = new Schema({
    title: {
        type: String,
    },
    page: {
        type: String,
    },
    cards: {
        type: [{
            id: String,
            cardTitle: String,
            cardText: String,
            dateTime: Date,
            buttonUrl: String,
        }]
    }
});

const LastNewsBlock = mongoose.model('LastNewsBlock', LastNewsBlockSchema);

export default LastNewsBlock;
