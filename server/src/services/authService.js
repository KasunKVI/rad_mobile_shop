const { User } = require('../schemas/UserSchema');

async function signUpUser(dto) {
    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: dto.email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        // the password before saving it
        const hashedPassword = dto.password;

        // Create a new user from the DTO
        const newUser = new User({
            email: dto.email,
            password: hashedPassword,
            fullName: dto.fullName,
        });

        // Save the user to the database
        await newUser.save();

        return newUser;

    } catch (error) {
        throw error; // Propagate the error back to the controller
    }
}

module.exports = { signUpUser };
