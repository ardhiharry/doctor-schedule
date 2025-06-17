import { Request, Response, NextFunction } from 'express';
import { DoctorService } from '@services/doctor service';
import { response } from '@utils/response';

export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await this.doctorService.create(req.body);

      response(res, 201, 'Doctor created successfully', doctor);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await this.doctorService.getAll();

      response(res, 200, 'Success get all doctors', doctors);
    } catch (err) {
      next(err);
    }
  }

  async getFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await this.doctorService.getFilter(req.query);

      response(res, 200, 'Success get doctors by filter', doctors);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await this.doctorService.getById(Number(req.params.id));

      response(res, 200, 'Success get one doctor', doctor);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await this.doctorService.update(
        Number(req.params.id),
        req.body,
      );

      response(res, 200, 'Success updated doctor', doctor);
    } catch (err) {
      next(err);
    }
  }

  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await this.doctorService.softDelete(Number(req.params.id));

      response(res, 200, doctor.message, doctor.data);
    } catch (err) {
      next(err);
    }
  }

  async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await this.doctorService.restore(Number(req.params.id));

      response(res, 200, doctor.message, doctor.data);
    } catch (err) {
      next(err);
    }
  }
}
