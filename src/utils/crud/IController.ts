export interface IController<Dto> {
  create(dto: Dto): Promise<Dto>;
  findAll(): Promise<Dto[]>;
  findOne(id: string): Promise<Dto>;
  remove(id: string): Promise<void>;
  update(id: string, dto: Dto);
}
