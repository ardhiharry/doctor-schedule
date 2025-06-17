import * as process from 'node:process';
import chalk from 'chalk';
import winston from 'winston';

interface ILogInfo extends winston.Logform.TransformableInfo {
  context?: string;
}

const getContextColor = (context: string): string => {
  switch (context.toUpperCase()) {
    case 'HTTP':
      return chalk.greenBright(`[${context.toUpperCase()}]`);
    case 'DATABASE':
      return chalk.magenta(`[${context.toUpperCase()}]`);
    case 'AUTH':
      return chalk.green(`[${context.toUpperCase()}]`);
    case 'ERROR':
      return chalk.red(`[${context.toUpperCase()}]`);
    default:
      return chalk.whiteBright(`[${context.toUpperCase()}]`);
  }
};

const colorizer = winston.format.colorize().colorize;

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD/MM/YYYY HH:mm:ss',
    }),
    winston.format.printf((info: ILogInfo) => {
      const { level, message, timestamp, context = 'APP' } = info;

      const coloredLevel = colorizer(level, `[${level.toUpperCase()}]`);
      const coloredContext = getContextColor(context);

      return `${coloredLevel} ${process.pid} - ${timestamp}   ${coloredContext}   ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'silly',
      format: winston.format.combine(
        winston.format((info: ILogInfo) => {
          return info.context === 'DATABASE' ? false : info;
        })(),
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.printf((info: ILogInfo) => {
          const { level, message, timestamp, context = 'APP' } = info;
          return `[${level.toUpperCase()}] ${process.pid} - ${timestamp}   [${context.toUpperCase()}]   ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/database.log',
      level: 'silly',
      format: winston.format.combine(
        winston.format((info: ILogInfo) => {
          return info.context === 'DATABASE' ? info : false;
        })(),
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.printf((info: ILogInfo) => {
          const { level, message, timestamp, context = 'APP' } = info;

          if (context !== 'DATABASE') return '';
          return `[${level.toUpperCase()}] ${process.pid} - ${timestamp}   [${context.toUpperCase()}]   ${message}`;
        }),
      ),
    }),
  ],
});

export const log = {
  info: (message: string, context = 'APP') => {
    logger.info({ message, context });
  },
  error: (message: string, context = 'ERROR') => {
    logger.error({ message, context });
  },
  warn: (message: string, context = 'WARN') => {
    logger.warn({ message, context });
  },
  debug: (message: string, context = 'DEBUG') => {
    logger.debug({ message, context });
  },
  db: (message: string, context = 'DATABASE') => {
    logger.info({ message, context });
  },
};
