const convertToSafeUser = (user) => {
    const body = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_student: user.is_student,
        profile_completed: user.profile_completed,
    };

    if (user.is_student) {
        body.roll_number = user.roll_number;
    }

    return body;
};

export default convertToSafeUser;
