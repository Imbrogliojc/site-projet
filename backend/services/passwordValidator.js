export const validatePassword = (password) => {
    const checks = {
        minLength: password.length >= 10,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        hasNoChevron: !/[<>]/.test(password)
    }

    const isValid = Object.values(checks).every(Boolean)

    return {
        isValid,
        checks
    }
}