export enum HttpStatus {
  Ok = 200,
  NotFound = 404,
  InternalServerError = 500,
  Forbidden = 409,
  Unauthrized = 401,
  BadRequest = 400,
}

export enum TargetMap {
  body = "validatedBody",
  params = "validatedParams",
  query = "validatedQuery",
}

export enum Origin {
  body = "body",
  params = "params",
  query = "query",
}
