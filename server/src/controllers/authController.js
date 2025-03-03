const { signUpUser } = require('../services/authService');
const SignUpDTO = require('../dtos/SignUpDTO');

async function signUp(req, res) {
    try {

        // Convert request body to DTO
        const dto = new SignUpDTO(
            req.body.email,
            req.body.password,
            req.body.name,
        );

        // Call service function
        const result  = await signUpUser(dto);

        res.cookie('refreshToken', result.token.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        });

        // Send response
        return res.status(201).json({
            user: result.user,
            token: result.token,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signUp };
