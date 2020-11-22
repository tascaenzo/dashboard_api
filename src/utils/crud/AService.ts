import { IConverter } from './IConverter';
import { IService } from './IService';
import { Model } from 'mongoose';
import { Document } from 'mongoose';

export abstract class AService<Schema, Dto> implements IService<Dto> {
  constructor(
    protected readonly repository: Model<Schema & Document>,
    protected readonly converter: IConverter<Schema, Dto>,
  ) {}

  async create(dto: Dto): Promise<Dto> {
    return this.converter.toDto(
      await new this.repository(this.converter.toSchema(dto)).save(),
    );
  }

  async findAll(): Promise<Dto[]> {
    return this.converter.toDtoList(await this.repository.find());
  }

  async findOne(id: string): Promise<Dto> {
    return this.converter.toDto(await this.repository.findById(id));
  }

  async remove(id: string): Promise<void> {
    return await this.repository.findById(id).remove();
  }

  async update(id: string, dto: Dto) {
    return await this.repository.findByIdAndUpdate(
      id,
      this.converter.toSchema(dto),
    );
  }
}
