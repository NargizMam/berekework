import mongoose, { Schema, Types } from 'mongoose';
import User from "../users/userModel";

const ApplicantSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                if (user) {
                    return true;
                }
            },
            message: "This artist doesn't exist",
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    secondName: String,
    photo: String,
    sex: {
        type: String,
        enum: ['женский', 'мужской'],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        default: false,
    },
    city: {
        type: String,
        default: false,
    },
    education: {
        type: String,
        required: true,
    },
    aboutApplicant: {
        type: String,
        required: true,
    },
    workExperience: {
        type: [{
            id: String,
            job: String,
        }],
    },
    wantedJob: String,
    wantedJobCity: String,
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Applicant = mongoose.model('Applicant', ApplicantSchema);

export default Applicant;
