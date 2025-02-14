import winston from "winston";

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level}]: ${message}`;
  },
);

export const log = (label: string) => {
  return winston.createLogger({
    level: "crit",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label: label }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat,
    ),
    transports: [new winston.transports.Console()],
  });
};
