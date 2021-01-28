import { Request, Response, NextFunction} from "express";
import { HttpError } from "http-errors";

export function checkValidJsonPayload(err:HttpError, _req:Request, res:Response, next:NextFunction) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle the error here
      res.status(500).send({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null
      });
    }
    // Pass the error to the next middleware if it wasn't a JSON parse error
    next(err);
  };