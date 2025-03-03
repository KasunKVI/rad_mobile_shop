const { signUpUser, signInUser } = require('../services/authService');
const SignUpDTO = require('../dtos/SignUpDTO');
const SignInDTO = require('../dtos/SignInDTO');

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

async function signIn(req, res) {

    try {

        console.log(req.body.email);
        // Convert request body to DTO
        const dto = new SignInDTO(
            req.body.email,
            req.body.password,
        );

        // Call service function
        const result  = await signInUser(dto);

        // Set the refresh token as a cookie
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        });

        // Send response
        return res.status(200).json({
            user: result.user,
            token: result.token,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = { signUp, signIn };
