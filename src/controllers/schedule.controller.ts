import { Request, Response, NextFunction } from 'express';
import { ScheduleService } from '@services/schedule.service';
import { response } from '@utils/response';

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schedule = await this.scheduleService.create(req.body);

      response(res, 201, 'Schedule created successfully', schedule);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const schedule = await this.scheduleService.getAll();

      response(res, 200, 'Success get all schedule', schedule);
    } catch (err) {
      next(err);
    }
  }
}
