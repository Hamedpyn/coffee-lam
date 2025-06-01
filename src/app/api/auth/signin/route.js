import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import { comparePasswords, generateAccessToken, generateRefreshToken } from "@/utils/auth";

export async function POST(req) {
    await connectToDB();

    try {
        const body = await req.json();

        const isUserBan = await BanModel.findOne({
            $or: [{ userName: body.userName }, { email: body.email }]
        })
        if (isUserBan) {
            return Response.json({ message: "User with this userName or email is banned from out website" }, { status: 403 });
        }

        if (!body.identifier) {
            return Response.json({ message: "identifier is not valid" }, { status: 422 });
        }

        if (typeof body.rememberMe !== "boolean") {
            return Response.json({ message: "rememberMe must be true or false" }, { status: 422 });
        }

        if (!body.password || body.password.length < 8) {
            return Response.json({ message: "password must be over 8 characters" }, { status: 422 });
        }
        const DoesUserExist = await UserModel.findOne(
            { $or: [{ userName: body.identifier }, { email: body.identifier }], }, 'password email');

        if (!DoesUserExist) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await comparePasswords(body.password, DoesUserExist.password);

        if (!isMatch) {
            return Response.json({ message: "password is not correct" }, { status: 422 });
        }
        const newToken = await generateAccessToken(DoesUserExist.email);
        const refreshToken = await generateRefreshToken(DoesUserExist.email);

        if (!newToken) {
            return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
        }

        await UserModel.findOneAndUpdate(
            { email: DoesUserExist.email },
            {
                $set: {
                    refreshToken,
                },
            }
        );

        const headers = new Headers();
        headers.append("Set-Cookie", `token=${newToken};path=/;httpOnly=true;`);
        headers.append(
            "Set-Cookie",
            `refresh-token=${refreshToken};path=/;httpOnly=true;`
        );

        return Response.json(
            { message: "User logged in successfully :))" },
            {
                status: 200,
                headers,
            }
        );

    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
