const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a Mongoose schema
const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String },
        role: { type: Schema.Types.ObjectId, ref: 'Role' },
    },
    { timestamps: true } // Adds createdAt & updatedAt
);

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
