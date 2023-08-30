const convertToSafeUser = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_student: user.is_student,
        profile_completed: user.profile_completed,
    };
};

export default convertToSafeUser;
