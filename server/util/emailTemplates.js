const emailTemplates = {
    // Email template for user registration
    accountCreated: (name, role, email, password) => {
        const msg = `Greetings ${
            name || email
        }!\n\n You have been registered as a ${
            role || "user"
        } on the portal. Your login credentials are as follows: \n\nEmail: ${email}\nPassword: ${password}\n\nPlease login to the portal and change your password immediately.\nYou can login to the portal at https://student-portal-chi.vercel.app/login\n\nRegards,\nStudent Portal Team`;

        return msg;
    },
};

export default emailTemplates;
