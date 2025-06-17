import { Logger, QueryRunner } from 'typeorm';
import { log } from '@utils/logger/logger';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: any[], _?: QueryRunner) {
    log.db(`${query} -- params: ${JSON.stringify(parameters)}`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    _?: QueryRunner,
  ) {
    log.error(
      `${error} - ${query} -- params: ${JSON.stringify(parameters)}`,
      'DATABASE',
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    _?: QueryRunner,
  ) {
    log.warn(
      `Slow Query (${time}ms): ${query} -- params: ${JSON.stringify(parameters)}`,
      'DATABASE',
    );
  }

  logMigration(message: string) {
    log.info(message, 'DATABASE');
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    log.info(`Schema build: ${message}`, 'DATABASE');
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
      case 'info':
        log.info(message, 'DATABASE');
        break;
      case 'warn':
        log.warn(message, 'DATABASE');
        break;
    }
  }
}
