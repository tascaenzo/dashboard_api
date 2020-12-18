import { Types } from 'mongoose';

export interface IController<Dto> {
  create(dto: Dto): Promise<Dto>;
  findAll(): Promise<Dto[]>;
  findOne(id: Types.ObjectId): Promise<Dto>;
  remove(id: Types.ObjectId): Promise<Dto>;
  update(id: Types.ObjectId, dto: Dto): Promise<Dto>;
}
