import { RequestHandler } from "express";
import User from "../model/User";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import { VerifyOldPassword } from "../helper/helper";

export const SignUp: RequestHandler = async (req, res, next) => {
    try {
        let { first_name, email, password, confirm_password }: IUserData = req.body;
        const user = await User.findOne({ email: email })
        if (user) return next(createHttpError(422, 'Email alreday registered with us'))

        const hashedPwd = await bcrypt.hash(password, 8)
        const createUser = await User.create({ first_name, email, password: hashedPwd });
        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: createUser
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }

}

export const Login: RequestHandler = async (req, res, next) => {
    let { email, password } = req.body;

    try {
        /**
         * check if user is not registered
         */
        const user = await User.findOne({ email: email })
        if (!user) return next(createHttpError(400, "Email is not registered with us !"))
        /**
         * uncomment when you want to verify user
         */
        // if(!user.isUserVerified) return next(createHttpError(400,"User not verified"))

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return next(createHttpError(400, "Enter a valid password"))

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            JWT_KEY,
            {
                expiresIn: "1d"
            }
        )
        // res.cookie("jwt",token);
        res.json({
            status: "success",
            message: "Logged in successfully",
            token: token,
            data: user
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }

}

export const UpdateUser: RequestHandler = async (req, res, next) => {
    try {
        let payload = req.body;
        // check if password and old password is not null
        if (payload.password && payload.old_password) {
            const hashedPwd = req.user?.password;

            // res.json(await bcrypt.hash(payload.old_password,8));
            let compare = await bcrypt.compare(payload.old_password, hashedPwd);
            if (!compare) {
                return next(createHttpError(422, 'Old password does not matched with current password'));
            }
            else {
                // update new password 
                await User.findByIdAndUpdate(req.user?._id, {
                    password: await bcrypt.hash(payload.password, 8)
                })
            }

        }

        // update profile 
        delete payload.password;
        delete payload.old_password;

        await User.findByIdAndUpdate(req.user?._id, payload);

        res.status(204).json({
            status: 'success',
            message: 'Profile Update successfully'
        })


    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}
