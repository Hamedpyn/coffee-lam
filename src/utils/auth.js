import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { hash, compare } from "bcryptjs";
import { verify, sign } from 'jsonwebtoken';
import { cookies } from "next/headers";

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;
}
const comparePasswords = async (password, hashedPassword) => {
    const COMPARE_PASSWORDS = await compare(password, hashedPassword)
    return COMPARE_PASSWORDS;
}
const generateAccessToken = (data) => {

    const token = sign({ data }, process.env.ACCESS_TOKEN, {
        expiresIn: "15m"
    })
    return token;
}

const generateRefreshToken = async (data) => {
    const token = sign({ data }, process.env.REFRESH_TOKEN, {
        expiresIn: "15d"
    })
    return token;
}

const verifyToken = (token) => {
    const verifyPayload = verify(token, process.env.ACCESS_TOKEN)
    return verifyPayload;
}


const authUser = async () => {
    await connectToDB();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const tokenPayload = verifyToken(token);
        const user = await UserModel.findOne({ email: tokenPayload.data });
        return user;
    } catch (error) {
        // If token is expired or invalid, return null instead of crashing
        console.warn("Access token error:", error.message);
        return null;
    }
};


export { hashPassword, comparePasswords, generateAccessToken, generateRefreshToken, verifyToken, authUser }