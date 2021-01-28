import { Request, Response, NextFunction} from "express";
import { HttpError } from "http-errors";
import { errorResponse } from "../types/errorResponse"

export function checkValidJsonPayload(err:HttpError, _req:Request, res:Response, next:NextFunction) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle the error here
      errorResponse.message = "Invalid JSON payload passed.";
      res.status(400).send(errorResponse);
    }
    // Pass the error to the next middleware if it wasn't a JSON parse error
    next(err);
  };