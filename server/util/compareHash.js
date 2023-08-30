import bcrypt from "bcrypt";

const compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export default compareHash;
