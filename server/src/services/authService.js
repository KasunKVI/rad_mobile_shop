const User = require('../schemas/UserSchema');
const Role = require('../schemas/RoleSchema');

const JWTService = require("../services/JWTService");


async function signUpUser(dto) {
    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: dto.email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        // Hash the password
        const hashedPassword = dto.password;

        // Find the role, default to 'USER' if not specified
        let role = await Role.findOne({ name: 'USER' });
        if (!role) {
            throw new Error('Default USER role not found. Please seed roles first.');
        }

        // Create a new user with the assigned role
        const newUser = new User({
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
            role: role._id, // Assign role ID
        });

        // Save the user to the database
        await newUser.save();

        const tokens = await JWTService.generateToken({userEmail: newUser.email});

        console.log(tokens);

        if (tokens) {

            return {
                user: {
                    id: tokens.userId,
                    name: tokens.name,
                    role: tokens.role
                },
                token: tokens.accessToken,
            }
        }
    } catch (error) {
        throw error; // Propagate the error back to the controller
    }
}

module.exports = { signUpUser };
