export var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
    HttpStatus[HttpStatus["Forbidden"] = 409] = "Forbidden";
    HttpStatus[HttpStatus["Unauthrized"] = 401] = "Unauthrized";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
})(HttpStatus || (HttpStatus = {}));
export var TargetMap;
(function (TargetMap) {
    TargetMap["body"] = "validatedBody";
    TargetMap["params"] = "validatedParams";
    TargetMap["query"] = "validatedQuery";
})(TargetMap || (TargetMap = {}));
export var Origin;
(function (Origin) {
    Origin["body"] = "body";
    Origin["params"] = "params";
    Origin["query"] = "query";
})(Origin || (Origin = {}));
