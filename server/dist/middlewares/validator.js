import { HttpStatus } from "../types/enums.js";
import AppError from "../utils/AppError.js";
import { TargetMap } from "../types/enums.js";
import { Origin } from "../types/enums.js";
export const Validate = (schema, source = "body") => {
    return (req, res, next) => {
        try {
            const data = req[source];
            console.log(`Source: ${source}`);
            const parsedData = schema.safeParse(data);
            if (parsedData.error) {
                console.log("incorrect input found");
                const errors = parsedData.error.issues.map((e) => e.message);
                return next(new AppError(String(errors), HttpStatus.BadRequest));
            }
            if (source === Origin.body)
                req[TargetMap.body] = parsedData.data;
            else if (source === Origin.params)
                req[TargetMap.params] = parsedData.data;
            else
                req[TargetMap.query] = parsedData.data;
            console.log("Validation competed");
            next();
        }
        catch (error) {
            console.error(error);
            return next(new AppError("Something went wrong while validating data", 500));
        }
    };
};
