import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>,
  ) {}

  findAll() {
    return this.hospitalRepository.find({ relations: ['reviews'] });
  }

  async findOne(id: string) {
    const hospital = await this.hospitalRepository.findOne(id, {
      relations: ['reviews'],
    });
    if (!hospital) {
      throw new NotFoundException(`Hospital #${id} not found.`);
    }
    return hospital;
  }

  create(createHospitalDto: CreateHospitalDto) {
    const hospital = this.hospitalRepository.create(createHospitalDto);
    return this.hospitalRepository.save(hospital);
  }

  async update(id: string, updateHospitalDto: UpdateHospitalDto) {
    const hospital = await this.hospitalRepository.preload({
      id: +id,
      ...updateHospitalDto,
    });
    if (!hospital) {
      throw new NotFoundException(`Hospital #${id} not found.`);
    }
    return this.hospitalRepository.save(hospital);
  }

  async remove(id: string) {
    const hospital = await this.findOne(id);
    return this.hospitalRepository.remove(hospital);
  }
}
