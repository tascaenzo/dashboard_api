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
      await new this.repository(await this.converter.toSchema(dto)).save(),
    );
  }

  async findAll(): Promise<Dto[]> {
    return this.converter.toDtoList(await this.repository.find());
  }

  async findOne(id: string): Promise<Dto> {
    return this.converter.toDto(await this.repository.findById(id));
  }

  async remove(
    id: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return await this.repository.findById(id).remove();
  }

  async update(id: string, dto: Dto): Promise<Dto> {
    await this.repository.findByIdAndUpdate(
      id,
      await this.converter.toSchema(dto),
    );
    return this.findOne(id);
  }
}
