import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    location: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

userSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
    phone: 'text',
    location: 'text'
});

export default mongoose.model('User', userSchema);
