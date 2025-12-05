import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
const secret = process.env.JWT_TOKEN;
const Verify = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(new AppError("Auth Header Not Found", 404));
    }
    let token = authHeader?.split(" ")[1];
    if (!token || token.split("").length === 0) {
        return next(new AppError("Token Not Found ", 404));
    }
    try {
        const decode = (await Verify(token));
        req.token = decode;
        // access jwt through req.token.id / role
        next();
    }
    catch (error) {
        console.log(error);
        return next(new AppError("Something Went Wrong", 500));
    }
};
