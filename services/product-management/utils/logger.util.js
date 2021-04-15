import { createLogger, format, transports } from 'winston';

const log = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((obj) => `${obj.timestamp} ${obj.level}: ${obj.message || obj.errmsg}`),
  ),
  transports: [
    new transports.Console(),
  ],
});

export default log;
