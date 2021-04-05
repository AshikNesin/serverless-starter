const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    permissions: { type: [String], enum: ['ADMIN', 'USER'], default: 'USER' },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Duplicate the ID field.
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


export default mongoose.models.User || mongoose.model('User', userSchema);
