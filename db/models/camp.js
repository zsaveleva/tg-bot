import mongoose from 'mongoose';

const CampSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        geo: {
            type: String,
            required: true,
        },
        info: {
            address: { type: String, required: true },
            person: { type: String, required: true },
            contacts: { type: String, required: true },
            tax: { type: String, required: true },
            opf: { type: String, required: true },
            comment: { type: String, required: false },
        },
        shifts: {
            first: { type: Array, required: true },
            second: { type: Array, required: true },
            third: { type: Array, required: true },
            fourth: { type: Array, required: true },
        },
        vacancy: {
            value: { type: String, required: true },
            description: { type: String, required: false }
        },
        date: {
            summer: { type: String, required: false },
            tematic: { type: String, required: false }
        },
        seasons: { type: Number, required: true },
        feedback: { type: String, required: false }
    }
);

export default mongoose.model('Camp', CampSchema);