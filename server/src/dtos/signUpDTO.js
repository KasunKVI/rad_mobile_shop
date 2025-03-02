class SignUpDTO {
    constructor(email, password, confirmPassword, fullName) {

        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.fullName = fullName;

    }
}

module.exports = SignUpDTO;
