import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "input.txt" }),
  ],
});
const loggerMiddleware = async (req, res, next) => {

  if (!req.url.includes("login") && !req.url.includes("register")) {
    let finalData = {
      message: new Date().toString(),
      inputData: req.body,
      inputUrl: req.url,
    };
    logger.log("info", finalData);
  }

  next();
};

export default loggerMiddleware;
