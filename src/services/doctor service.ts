import { Repository } from 'typeorm';
import { Doctor } from '@entities/doctor.entity';
import { AppDataSource } from '@config/database';
import { CreateDoctorDto } from '@dtos/create-doctor.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { HttpException } from '@utils/http-exception';
import { UpdateDoctorDto } from '@dtos/update-doctor.dto';

export interface IDoctorFilter {
  name?: string;
}

export class DoctorService {
  private readonly doctorRepository: Repository<Doctor>;

  constructor() {
    this.doctorRepository = AppDataSource.getRepository(Doctor);
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    createDoctorDto = plainToInstance(CreateDoctorDto, createDoctorDto);

    await validateOrReject(createDoctorDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const { name } = createDoctorDto;

    const doctor = await this.doctorRepository.findOneBy({ name });

    if (doctor) {
      throw new HttpException(400, 'Doctor already exists');
    }

    const newDoctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(newDoctor);
  }

  async getAll() {
    return await this.doctorRepository.find();
  }

  async getFilter(filter: IDoctorFilter) {
    const { name } = filter;

    const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');

    if (name) {
      queryBuilder.where('doctor.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    const doctors = await queryBuilder.getMany();

    if (doctors.length === 0) {
      throw new HttpException(404, 'Doctors not found');
    }

    return doctors;
  }

  async getById(id: number) {
    const doctor = await this.doctorRepository.findOneBy({ id });

    if (!doctor) {
      throw new HttpException(404, 'Doctor not found');
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    updateDoctorDto = plainToInstance(UpdateDoctorDto, updateDoctorDto);

    await validateOrReject(updateDoctorDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const doctor = await this.doctorRepository.findOneBy({ id });

    if (!doctor) {
      throw new HttpException(404, 'Doctor not found');
    }

    const updatedDoctor = this.doctorRepository.merge(doctor, updateDoctorDto);

    return await this.doctorRepository.save(updatedDoctor);
  }

  async softDelete(id: number) {
    const doctor = await this.doctorRepository.findOneBy({ id });

    if (!doctor) {
      throw new HttpException(404, 'Doctor not found');
    }

    await this.doctorRepository.softDelete(id);

    return {
      message: 'Doctor deleted successfully',
      data: [],
    };
  }

  async restore(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!doctor) {
      throw new HttpException(404, 'Doctor not found');
    }

    if (!doctor.deleted_at) {
      throw new HttpException(400, 'Doctor is not deleted');
    }

    await this.doctorRepository.restore(id);

    return {
      message: 'Doctor restored successfully',
      data: [],
    };
  }
}
