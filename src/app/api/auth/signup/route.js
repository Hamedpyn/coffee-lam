import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import { generateAccessToken, generateRefreshToken, hashPassword } from "@/utils/auth";
import userValidator from "@/validators/userValidator";

export async function POST(req) {
    await connectToDB()
    const body = await req.json();
    const userValidationResult = userValidator(body);

    if (userValidationResult === true) {
        try {

            const isUserBan = await BanModel.findOne({
                $or: [{ userName: body.userName }, { email: body.email }]
            })

            const doesUserExist = await UserModel.findOne({
                $or: [{ userName: body.userName }, { email: body.email }]
            })

            if (isUserBan) {
                return Response.json({ message: "User with this userName or email is banned from out website" }, { status: 403 });
            }
            if (doesUserExist) {
                return Response.json({ message: "User with this name or email already exist" }, { status: 409 });

            }
            const hashedPassword = await hashPassword(body.password);

            const newToken = generateAccessToken(body.email);
            const refreshToken = await generateRefreshToken(body.email);

            if (!newToken) {
                return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
            }

            //  Check if any users exist in the DB
            const userCount = await UserModel.countDocuments();

            const createUser = await UserModel.create({
                userName: body.userName,
                email: body.email,
                password: hashedPassword,
                role: userCount === 0 ? "ADMIN" : "USER",
                refreshToken,
            });

            if (!createUser) {
                return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
            }

            const headers = new Headers();
            headers.append("Set-Cookie", `token=${newToken};path=/;httpOnly=true;`);
            headers.append(
                "Set-Cookie",
                `refresh-token=${refreshToken};path=/;httpOnly=true;`
            );

            return Response.json(
                createUser,
                {
                    status: 201,
                    headers,
                }
            );

        } catch (err) {
            console.error("Error ->", err);
            return Response.json({ error: "Internal server error" }, { status: 500 });
        }
    } else {
        return Response.json({ errors: userValidationResult }, { status: 422 });
    }
}
