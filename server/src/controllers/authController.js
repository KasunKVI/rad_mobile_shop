const { signUpUser } = require('../services/authService');
const { SignUpDTO } = require('../dtos/SignUpDTO');

async function signUp(req, res) {
    try {
        // Convert request body to DTO
        const dto = new SignUpDTO(
            req.body.email,
            req.body.password,
            req.body.confirmPassword,
            req.body.fullName,
        );

        // Call service function
        const user = await signUpUser(dto);

        // Send response
        res.status(201).json({ message: 'User signed up successfully', user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signUp };
