import { AppDataSource } from '@config/database';
import { log } from '@utils/logger/logger';

export class Setup {
  static async database() {
    try {
      await AppDataSource.initialize();
      log.db('Data Source has been initialized!');
    } catch (err) {
      log.error(
        `Error during Data Source initialization: ${(err as Error).message}`,
        'DATABASE',
      );
      throw err;
    }
  }
}
