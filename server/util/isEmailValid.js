import emailValidator from "deep-email-validator";

async function isEmailValid(email) {
    const { valid } = await emailValidator.validate(email);
    return valid;
}

export default isEmailValid;
