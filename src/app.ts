import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";

import logger from "morgan";
import Route from "./routes"; 
import { checkValidJsonPayload } from "./middleware/checkValidJsonPayload";


const app = express();

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkValidJsonPayload);
app.use("/", Route);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "couldn't access page, please retry again" });
});

export default app;
